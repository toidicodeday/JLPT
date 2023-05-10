import { useSendbirdContext } from '@/components/SendbirdChat'
import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
// import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
// import useSbDetailUserById from '@/components/SendbirdChat/hooks/userHooks/useSbDetailUserById'
import { useLazyGetOrderDetailsQuery } from '@/services/orderApi/order'
import { OrderDetailsType } from '@/services/orderApi/types'
import { useTypedDispatch } from '@/store'
import { openModalChat } from '@/store/chatSlice'
import { TYPE_SERVICE_ORDER } from '@/utils/constant/constant'
import { getSbUserId } from '@/utils/helpers/convert.helper'
import { ConnectionState } from '@sendbird/chat'
import { GroupChannel, MemberState } from '@sendbird/chat/groupChannel'
import { message } from 'antd'
import { compact, get, map } from 'lodash'

const useCreateChat = () => {
  const dispatch = useTypedDispatch()
  const [getDetailOrder] = useLazyGetOrderDetailsQuery()
  const ctx = useSendbirdContext()

  const getChannelByUrl = async (channelUrl: string) => {
    try {
      if (ctx?.connectionState === ConnectionState.OPEN) {
        return (await ctx?.sendbird.groupChannel.getChannel(channelUrl)) || null
      }
    } catch (err) {
      return null
    }
  }

  const getMustHaveMemberInOrder = (
    currentSbUserId: string,
    detailOrder?: OrderDetailsType,
  ) => {
    const members = []
    const isTaxiTruckOrder =
      detailOrder?.service?.type === TYPE_SERVICE_ORDER.TAXI_TRUCK
    const isMoveOfficeOrder =
      detailOrder?.service?.type === TYPE_SERVICE_ORDER.MOVING_OFFICE
    const guestId = getSbUserId(detailOrder?.guestId, 'guest')
    const adminCreatedOrderId = getSbUserId(detailOrder?.createdBy, 'admin')
    const captainId = getSbUserId(detailOrder?.vehicleCapId, 'admin')
    const driverId = getSbUserId(
      detailOrder?.orderVehicleChooses?.[0]?.vehicle?.driverId,
      'driver',
    )
    members.push(currentSbUserId)
    if (isTaxiTruckOrder) {
      members.push(driverId, guestId || adminCreatedOrderId)
    }
    if (isMoveOfficeOrder) {
      members.push(captainId, guestId || adminCreatedOrderId)
    }
    return compact(members)
  }
  const getMustHaveMemberInOrderDriver = (
    currentSbUserId: string,
    detailOrder?: OrderDetailsType,
  ) => {
    const members = []
    const isTaxiTruckOrder =
      detailOrder?.service?.type === TYPE_SERVICE_ORDER.TAXI_TRUCK
    const isMoveOfficeOrder =
      detailOrder?.service?.type === TYPE_SERVICE_ORDER.MOVING_OFFICE

    const adminCreatedOrderId = getSbUserId(detailOrder?.createdBy, 'admin')
    const captainId = getSbUserId(detailOrder?.vehicleCapId, 'admin')
    const driverId = getSbUserId(
      detailOrder?.orderVehicleChooses?.[0]?.vehicle?.driverId,
      'driver',
    )

    if (isTaxiTruckOrder) return []
    if (isMoveOfficeOrder) {
      members.push(currentSbUserId)
      members.push(captainId, driverId, adminCreatedOrderId)
    }
    return compact(members)
  }

  const getMissingMembers = (
    currentListMembers: string[],
    mustHaveMembers: string[],
  ) => {
    return mustHaveMembers.reduce((missingMembers, nextMem) => {
      if (!currentListMembers.includes(nextMem)) missingMembers.push(nextMem)
      return missingMembers
    }, [] as string[])
  }

  const gotoModalChat = (channelUrl: string, isReadOnly?: boolean) => {
    dispatch(openModalChat({ channelUrl, isReadOnly: isReadOnly }))
  }

  const addMemberToGroup = async (channel: GroupChannel, userIds: string[]) => {
    try {
      await channel.inviteWithUserIds(userIds)
    } catch (error) {
      //
    }
  }

  const openOrderChat = async (params: {
    adminSenbirdId: string
    orderCode: string
    isReadOnly?: boolean
  }) => {
    const messId = 'loadingChatConversation'
    message.loading({
      content: 'Đang mở cuộc hội thoại',
      key: messId,
    })
    const { data } = await getDetailOrder({ code: params.orderCode })
    const detailOrder = get(data, 'data')
    const channel = await getChannelByUrl(params.orderCode)

    // * lấy các thành viên cần có trong cuộc hội thoại
    // * [current admin, guest || admin đã tạo đơn, driverId || đội trưởng]
    const mustHaveMembers = getMustHaveMemberInOrder(
      params.adminSenbirdId,
      detailOrder,
    )

    // * nếu nhóm chat chưa có thì sẽ tạo nhóm chat với
    if (!channel) {
      ctx?.sendbird.groupChannel
        .createChannel({
          channelUrl: params.orderCode,
          name: `Đơn hàng ${params.orderCode}`,
          invitedUserIds: mustHaveMembers,
          operatorUserIds: mustHaveMembers,
          customType: SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
          isPublic: true,
          isDiscoverable: true,
          isDistinct: false,
        })
        .then(newChannel => gotoModalChat(newChannel.url, params.isReadOnly))
        .catch(() => {
          message.error('Có lỗi xảy ra, không mở được cuộc hội thoại!!!')
        })
    }

    // * nếu có nhóm chat rồi,
    // * check mem đã đủ so với các thành viên trong order chat
    // * check xem đã join chưa thì join

    if (channel) {
      const missingMembers = getMissingMembers(
        map(channel.members, 'userId'),
        mustHaveMembers,
      )
      if (missingMembers.length) {
        await addMemberToGroup(channel, missingMembers)
      }
      if (channel.myMemberState !== MemberState.JOINED) {
        await channel.join()
      }
      gotoModalChat(channel.url, params.isReadOnly)
      message.destroy(messId)
    }
  }

  const openOrderDriverChat = async (params: {
    adminSenbirdId: string
    orderCode: string
    isReadOnly?: boolean
  }) => {
    const messId = 'loadingChatConversation'
    message.loading({ content: 'Đang mở cuộc hội thoại', key: messId })

    const channelUrl = `${params.orderCode}_drivers`
    const { data } = await getDetailOrder({ code: params.orderCode })
    const detailOrder = get(data, 'data')
    const channel = await getChannelByUrl(channelUrl)

    // * channel is taxi tai thi ko ton tai hoi thoai
    if (detailOrder?.service?.type === TYPE_SERVICE_ORDER.TAXI_TRUCK) {
      message.error({
        key: messId,
        content: 'Đơn hàng taxi tải không tồn tại hội thoại này',
      })
    }

    // * lấy các thành viên cần có trong cuộc hội thoại
    // * [current admin, guest || admin đã tạo đơn, driverId || đội trưởng]
    const mustHaveMembers = getMustHaveMemberInOrderDriver(
      params.adminSenbirdId,
      detailOrder,
    )

    // * nếu nhóm chat chưa có thì sẽ tạo nhóm chat với
    if (!channel) {
      ctx?.sendbird.groupChannel
        .createChannel({
          channelUrl: channelUrl,
          name: `Tài xế đơn hàng ${params.orderCode}`,
          invitedUserIds: mustHaveMembers,
          operatorUserIds: mustHaveMembers,
          customType: SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
          isPublic: true,
          isDiscoverable: true,
          isDistinct: false,
        })
        .then(newChannel => gotoModalChat(newChannel.url, params.isReadOnly))
        .catch(() => {
          message.error('Có lỗi xảy ra, không mở được cuộc hội thoại!!!')
        })
    }

    // * nếu có nhóm chat rồi,
    // * check mem đã đủ so với các thành viên trong order chat
    // * check xem đã join chưa thì join

    if (channel) {
      const missingMembers = getMissingMembers(
        map(channel.members, 'userId'),
        mustHaveMembers,
      )
      if (missingMembers.length) {
        await addMemberToGroup(channel, missingMembers)
      }
      if (channel.myMemberState !== MemberState.JOINED) {
        await channel.join()
      }
      gotoModalChat(channel.url, params.isReadOnly)
      message.destroy(messId)
    }
  }

  return {
    openOrderChat,
    openOrderDriverChat,
  }
}

export default useCreateChat

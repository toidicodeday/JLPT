import { Avatar, Badge, Button, Input, message, Spin } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import {
  GroupChannel,
  MemberState,
  PublicGroupChannelListQueryParams,
} from '@sendbird/chat/groupChannel'
import { RiMessengerFill } from 'react-icons/ri'
import useSbChannelList from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelList'
import { format } from 'date-fns'
import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
import { useDebounceState } from '@/hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { openModalChat } from '@/store/chatSlice'
import { useLazyGetOrderDetailsQuery } from '@/services/orderApi/order'
import { STATUS_ORDER } from '@/utils/constant/constant'
import { get } from 'lodash'

type Props = {}

const ChatList = (props: Props) => {
  const dispatch = useDispatch()
  const [loadingOpenChat, setLoadingOpenChat] = useState(false)
  const { dbValue, handleChange } = useDebounceState({})
  const [getOrderDetail] = useLazyGetOrderDetailsQuery()
  const queryParams = useMemo(() => {
    const params: PublicGroupChannelListQueryParams = {
      customTypesFilter: [
        SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
        SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
      ],
    }
    if (dbValue) params.channelNameContainsFilter = dbValue
    return params
  }, [dbValue])
  const { channels, loadMoreChannels, loading, hasNextChannels } =
    useSbChannelList(queryParams)

  const getChannelInfo = useCallback((channel: GroupChannel) => {
    let title = ''
    if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER) {
      title =
        'Đội trưởng và tài xế đơn hàng ' + channel.url.replace('_drivers', '')
    }
    if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_GUEST) {
      title = 'Đơn hàng ' + channel.url
    }

    return { title }
  }, [])

  // const handleSroll = (e: any) => {
  //   const element = e.target
  //   const { scrollTop, clientHeight, scrollHeight } = element
  //   const isAboutSame = (a: number, b: number, px: number) =>
  //     Math.abs(a - b) <= px
  //   if (isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
  //     loadMoreChannels()
  //   }
  // }

  const checkIsReadOnlyChannel = async (channel: any) => {
    const DONE_ORDER = [
      STATUS_ORDER.COMPLETE,
      STATUS_ORDER.CANCEL,
      STATUS_ORDER.FAILURE,
    ]
    let orderCode = ''
    if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_GUEST) {
      orderCode = channel.url
    }
    if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER) {
      orderCode = channel.url.replaceAll('_drivers', '')
    }
    if (orderCode) {
      const orderDetail = await getOrderDetail({ code: orderCode })
      const orderStatus = get(orderDetail, 'data.data.status') as STATUS_ORDER
      if (DONE_ORDER.includes(orderStatus)) return true
    }
    return false
  }

  const openOrderChat = async (channel: any) => {
    setLoadingOpenChat(true)
    const channelUrl = channel.url
    const isMember = channel.myMemberState === MemberState.JOINED
    if (channelUrl) {
      if (!isMember) await channel.join()
      const isReadOnly = await checkIsReadOnlyChannel(channel)
      dispatch(openModalChat({ channelUrl, isReadOnly }))
    } else {
      message.error('Có lỗi xảy ra')
    }
    setLoadingOpenChat(false)
  }

  return (
    <div>
      <div className="mb-8 border border-solid border-grayBorder py-4 px-2 gap-4 flex flex-wrap">
        <div className="w-96">
          <Input
            placeholder="Tìm kiếm theo tên hội thoại"
            onChange={e => handleChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        {channels.map(channel => {
          const { title } = getChannelInfo(channel)

          return (
            <div
              key={channel.url}
              className="flex justify-between align-top h-16 gap-3"
            >
              <div className="w-24 flex-shrink-0 flex-grow-0 overflow-hidden">
                <Avatar.Group>
                  {channel?.members?.map((user: any) => {
                    if (user.userId?.startsWith('admin')) return null
                    return (
                      <Avatar key={user?.userId} src={user?.profileUrl}>
                        {user.nickname.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar>
                    )
                  })}
                </Avatar.Group>
              </div>
              <div className="flex-grow flex-shrink overflow-hidden">
                <p>{title}</p>
                <p>{channel.members.map(m => m.nickname).join('; ')}</p>
              </div>
              <div className="w-24 flex-shrink-0 flex-grow-0 overflow-hidden flex justify-end items-center gap-2">
                <p className="text-right text-xs">
                  {format(channel?.createdAt, 'Pp')}
                </p>
                {/* <Tooltip
                  title="Xem nội dung cuộc trò chuyện"
                  placement="topRight"
                > */}
                <Button
                  type="text"
                  className="w-48 mr-3"
                  icon={
                    <Badge count={channel?.unreadMessageCount}>
                      <RiMessengerFill className="text-base text-blue-500" />
                    </Badge>
                  }
                  onClick={() => {
                    if (!loadingOpenChat) openOrderChat(channel)
                  }}
                  disabled={loadingOpenChat}
                />
                {/* </Tooltip> */}
              </div>
            </div>
          )
        })}
        {hasNextChannels && (
          <div className="text-center">
            <Button onClick={loadMoreChannels}>Tải thêm tin nhắn</Button>
          </div>
        )}
        {loading && (
          <div className="w-full h-28 flex justify-center items-end">
            <Spin />
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatList

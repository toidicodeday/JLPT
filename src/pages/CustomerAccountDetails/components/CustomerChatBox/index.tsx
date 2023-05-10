import ChatBox from '@/components/ChatBox'
import { useSendbirdContext } from '@/components/SendbirdChat'
import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
import useSbChannel from '@/components/SendbirdChat/hooks/channelHooks/useSbChannel'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import useSbDetailUserById from '@/components/SendbirdChat/hooks/userHooks/useSbDetailUserById'
import { CustommerType } from '@/services/customerApi/types'
import { getSbUserId } from '@/utils/helpers/convert.helper'
import { MemberState } from '@sendbird/chat/groupChannel'
import { message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
type Props = {
  detailGuest: CustommerType | undefined
  isActiveTab: boolean
}

const CustomerChatbox = ({ detailGuest, isActiveTab }: Props) => {
  const { createChannelWith } = useSbChannel()
  const [channelUrl, setChannelUrl] = useState('')
  const { getUserSb } = useSbDetailUserById()
  const { currentUser } = useSbCurrentUser()
  const ctx = useSendbirdContext()

  const getChannelByUrl = useCallback(async (channelUrl: string) => {
    try {
      return await ctx?.sendbird.groupChannel.getChannel(channelUrl)
    } catch (err) {
      return
    }
  }, [])

  useEffect(() => {
    const getChannel = async () => {
      message.destroy()
      const sbUserId = getSbUserId(detailGuest?.id, 'guest')
      const userSb = await getUserSb(sbUserId)
      const channelUrl = `${userSb?.userId}_support_channel`
      if (!userSb?.userId) {
        setChannelUrl('')
        return
      }

      const channel = await getChannelByUrl(channelUrl)
      if (channel) {
        if (channel.myMemberState !== MemberState.JOINED) {
          channel.join()
        }
        setChannelUrl(channel?.url)
      } else if (currentUser?.userId && ctx) {
        const channel = await ctx.sendbird.groupChannel.createChannel({
          invitedUserIds: [currentUser?.userId, userSb.userId],
          operatorUserIds: [currentUser?.userId, userSb.userId],
          channelUrl,
          name: 'Hỗ trợ khách hàng',
          customType: SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST,
          isDistinct: false,
          isPublic: true,
        })
        setChannelUrl(channel?.url)
      }
    }
    if (isActiveTab) {
      getChannel()
    }
  }, [
    ctx,
    getUserSb,
    isActiveTab,
    detailGuest?.id,
    createChannelWith,
    currentUser?.userId,
    getChannelByUrl,
  ])

  return (
    <div className="h-28 min-h-[60vh] relative">
      <ChatBox channelUrl={channelUrl} showLeaveBtn={false} />
    </div>
  )
}

export default CustomerChatbox

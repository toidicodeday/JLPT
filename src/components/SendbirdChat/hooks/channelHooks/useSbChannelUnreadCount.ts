import {
  GroupChannelHandler,
  GroupChannelListQuery,
  GroupChannelListQueryParams,
  UnreadChannelFilter,
  GroupChannel,
} from '@sendbird/chat/groupChannel'
import { GroupChannelHandlerParams } from '@sendbird/chat/lib/__definition'
import { map } from 'lodash'

import { useEffect, useState } from 'react'
import { SB_GROUP_CUSTOM_TYPE } from '../../constant/sendbird.constant'
import { uuidv4 } from '../../helper/message.helper'
import { useSendbirdContext } from '../../Provider'

type Props = {
  customeTypes: SB_GROUP_CUSTOM_TYPE[]
}

const useSbChannelUnreadCount = ({ customeTypes }: Props) => {
  const [unreadChannelUrls, setUnreadChannelUrls] = useState<string[]>([])
  const ctx = useSendbirdContext()

  useEffect(() => {
    const getUnreadGroupNumber = async () => {
      if (ctx?.connectionState === 'OPEN') {
        const params: GroupChannelListQueryParams = {
          unreadChannelFilter: UnreadChannelFilter.UNREAD_MESSAGE,
          customTypesFilter: customeTypes,
          // customTypesFilter: [
          //   SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN,
          //   SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER,
          //   SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST,
          //   SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
          //   SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
          // ],
        }
        const query: GroupChannelListQuery =
          ctx.sendbird.groupChannel.createMyGroupChannelListQuery(params)

        const channels: GroupChannel[] = await query.next()
        console.log('channels unread', map(channels, 'url'))
        setUnreadChannelUrls(map(channels, 'url'))
      }
    }
    getUnreadGroupNumber()
  }, [ctx?.connectionState, ctx?.sendbird.groupChannel])

  // listen for new unread channel
  useEffect(() => {
    const channelHandlerId = uuidv4()
    const channelHandler: GroupChannelHandlerParams = {
      onMessageReceived(channel) {
        if (
          customeTypes.includes(channel.customType as SB_GROUP_CUSTOM_TYPE) &&
          unreadChannelUrls.findIndex(url => url === channel.url) < 0
        ) {
          setUnreadChannelUrls(s => [...s, channel.url])
        }
      },
    }

    if (ctx?.connectionState === 'OPEN') {
      ctx?.sendbird.groupChannel.addGroupChannelHandler(
        channelHandlerId,
        new GroupChannelHandler(channelHandler),
      )
    }
    return () => {
      ctx?.sendbird.groupChannel.removeGroupChannelHandler(channelHandlerId)
    }
  })

  // listen for read channel
  useEffect(() => {
    const lastestOpenChannel = ctx?.latestOpenChannelUrl
    setUnreadChannelUrls(s => s.filter(i => i !== lastestOpenChannel))
  }, [ctx?.latestOpenChannelUrl])

  return { unreadChannelCount: unreadChannelUrls.length }
}

export default useSbChannelUnreadCount

import { GroupChannelHandler } from '@sendbird/chat/groupChannel'
import {
  BaseChannel,
  BaseMessage,
  GroupChannelHandlerParams,
  MetaData,
} from '@sendbird/chat/lib/__definition'
import { useEffect, useState } from 'react'
import { uuidv4 } from '../../helper/message.helper'
import { useSendbirdContext } from '../../Provider'

const useSbLatestMessage = () => {
  const [latestMessage, setLatestMessage] = useState<{
    message?: BaseMessage
    channel?: BaseChannel
    metaData?: MetaData
  }>({
    message: undefined,
    channel: undefined,
    metaData: undefined,
  })

  const ctx = useSendbirdContext()
  useEffect(() => {
    const channelHandlerId = uuidv4()
    const channelHandler: GroupChannelHandlerParams = {
      onMessageReceived: async (
        mesChannel: BaseChannel,
        newMessage: BaseMessage,
      ) => {
        const metaData = await mesChannel.getAllMetaData()
        setLatestMessage({
          message: newMessage,
          channel: mesChannel,
          metaData: metaData,
        })
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
  }, [ctx?.connectionState, ctx?.sendbird.groupChannel])

  return { latestMessage }
}

export default useSbLatestMessage

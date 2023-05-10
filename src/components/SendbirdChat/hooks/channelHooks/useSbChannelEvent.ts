import { GroupChannelHandler } from '@sendbird/chat/groupChannel'
import {
  BaseChannel,
  GroupChannel,
  GroupChannelHandlerParams,
} from '@sendbird/chat/lib/__definition'
import { BaseMessage } from '@sendbird/chat/message'
import React, { useEffect } from 'react'
import { uuidv4 } from '../../helper/message.helper'
import { useSendbirdContext } from '../../Provider'
import useCheckScrollBottom from '../utilsHooks/useCheckScrollBottom'
import useScrollToBottom from '../utilsHooks/useScrollToBottom'

type Props = {
  updateAllMessage: React.Dispatch<React.SetStateAction<BaseMessage[]>>
  isInitMessageLoaded: boolean
  scrollRef: React.RefObject<HTMLDivElement>
  channel?: GroupChannel
}

const useSbChannelEvent = ({
  updateAllMessage,
  isInitMessageLoaded,
  scrollRef,
  channel,
}: Props) => {
  const ctx = useSendbirdContext()
  const checkScrollBottom = useCheckScrollBottom({ scrollRef })
  const scrollToBottom = useScrollToBottom({ scrollRef })

  useEffect(() => {
    const channelHandlerId = uuidv4()
    const channelHandler: GroupChannelHandlerParams = {
      onMessageReceived: (mesChannel: BaseChannel, newMessage: BaseMessage) => {
        // ...
        if (channel?.url === newMessage.channelUrl) {
          console.log('new message', {
            channel: mesChannel,
            message: newMessage,
          })
          updateAllMessage(s => [...s, newMessage])
          const isBottom = checkScrollBottom()
          if (isBottom) {
            scrollToBottom()
          }
        }
      },
    }

    if (ctx?.connectionState === 'OPEN' && isInitMessageLoaded) {
      ctx?.sendbird.groupChannel.addGroupChannelHandler(
        channelHandlerId,
        new GroupChannelHandler(channelHandler),
      )
    }
    return () => {
      ctx?.sendbird.groupChannel.removeGroupChannelHandler(channelHandlerId)
    }
  }, [
    channel?.url,
    checkScrollBottom,
    ctx?.connectionState,
    ctx?.sendbird.groupChannel,
    isInitMessageLoaded,
    scrollToBottom,
    updateAllMessage,
  ])
}

export default useSbChannelEvent

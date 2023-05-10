import { GroupChannel } from '@sendbird/chat/groupChannel'
import { BaseMessage } from '@sendbird/chat/message'
import { useMemo, useState } from 'react'
import useLoadPrevMess from './useLoadMess'
import useSendMessageCallback from './useSbSendMessageCallback'
import useSendFileCallback from './useSbSendFileCallback'
import useSbChannelEvent from '../channelHooks/useSbChannelEvent'

const useSbMessageList = (channel?: GroupChannel, scrollRef?: any) => {
  const [allMessages, setAllMessages] = useState<BaseMessage[]>([])

  const defaultParams = useMemo(
    () => ({
      currentChannel: channel,
      scrollRef,
      updateAllMess: setAllMessages,
    }),
    [channel, scrollRef],
  )

  const sendMessage = useSendMessageCallback(defaultParams)

  const sendFile = useSendFileCallback(defaultParams)

  const {
    loadPrev: loadMorePrev,
    isInitMessageLoaded,
    loading: loadingMess,
  } = useLoadPrevMess(defaultParams)

  useSbChannelEvent({
    channel,
    isInitMessageLoaded,
    scrollRef,
    updateAllMessage: setAllMessages,
  })

  return {
    allMessages,
    sendUserMessage: sendMessage,
    sendFileMessage: sendFile,
    loadMorePrev,
    loadingMess,
  }
}

export default useSbMessageList

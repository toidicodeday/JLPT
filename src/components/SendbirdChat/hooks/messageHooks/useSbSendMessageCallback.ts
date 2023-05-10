import { BaseMessage, GroupChannel } from '@sendbird/chat/lib/__definition'
import type { UserMessageCreateParams } from '@sendbird/chat/message'
import React, { useCallback } from 'react'
import useScrollToBottom from '../utilsHooks/useScrollToBottom'

type Props = {
  currentChannel?: GroupChannel
  scrollRef: React.RefObject<HTMLDivElement>
  updateAllMess: React.Dispatch<React.SetStateAction<BaseMessage[]>>
}

const useSbSendMessageCallback = ({
  currentChannel,
  scrollRef,
  updateAllMess,
}: Props): ((text: string) => void) => {
  const scrollToBottom = useScrollToBottom({ scrollRef })
  return useCallback(
    (text: string) => {
      const createParamsDefault = (
        txt: string | number,
      ): UserMessageCreateParams => {
        const message =
          typeof txt === 'string' ? txt.trim() : txt.toString(10).trim()
        const params: UserMessageCreateParams = { message }
        return params
      }
      const params = createParamsDefault(text)

      currentChannel
        ?.sendUserMessage(params)
        .onPending(pendingMessage => {
          // TODO [chat] handle pending message
        })
        .onSucceeded(message => {
          updateAllMess(s => [...s, message])
          setTimeout(() => scrollToBottom(), 200)
        })
        .onFailed(error => {
          // TODO [chat] handle fail when sending message
        })
    },
    [currentChannel, scrollToBottom, updateAllMess],
  )
}

export default useSbSendMessageCallback

import {
  BaseMessage,
  FileMessageCreateParams,
  GroupChannel,
  SendableMessage,
} from '@sendbird/chat/lib/__definition'
import React, { useCallback } from 'react'
import useScrollToBottom from '../utilsHooks/useScrollToBottom'

type Props = {
  currentChannel?: GroupChannel
  scrollRef: React.RefObject<HTMLDivElement>
  updateAllMess: React.Dispatch<React.SetStateAction<BaseMessage[]>>
}

const useSbSendFileCallback = ({
  currentChannel,
  scrollRef,
  updateAllMess,
}: Props): ((file: any) => void) => {
  const scrollToBottom = useScrollToBottom({ scrollRef })

  return useCallback(
    (file: any) => {
      const params: FileMessageCreateParams = {
        file: file,
        fileName: file.name,
        fileSize: file.size,
        thumbnailSizes: [
          { maxWidth: 100, maxHeight: 100 },
          { maxWidth: 200, maxHeight: 200 },
        ],
        mimeType: file.type,
      }
      currentChannel
        ?.sendFileMessage(params)
        .onSucceeded((message: SendableMessage) => {
          updateAllMess(s => [...s, message])
          setTimeout(() => scrollToBottom(), 1000)
        })
        .onFailed((err, mesage) => {
          // handleing error when sending mesage
        })
        .onPending(message => {
          // handle save pending sent message status
        })
    },
    [currentChannel, scrollToBottom, updateAllMess],
  )
}

export default useSbSendFileCallback

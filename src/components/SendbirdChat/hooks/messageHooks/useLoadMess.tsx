import {
  getLatestMessageTimeStamp,
  getOldestMessageTimeStamp,
} from '@/components/SendbirdChat/helper/message.helper'
import { GroupChannel } from '@sendbird/chat/groupChannel'
import {
  BaseMessage,
  MessageListParams,
  PreviousMessageListQuery,
  PreviousMessageListQueryParams,
} from '@sendbird/chat/message'
import React, { useEffect, useState } from 'react'
import compareIds from '../../helper/compareIds'
import { PREV_RESULT_SIZE } from '../../constant/sendbird.constant'
import useScrollToBottom from '../utilsHooks/useScrollToBottom'
type Props = {
  currentChannel?: GroupChannel
  scrollRef: React.RefObject<HTMLDivElement>
  updateAllMess: React.Dispatch<React.SetStateAction<BaseMessage[]>>
}
const useLoadMess = ({ updateAllMess, currentChannel, scrollRef }: Props) => {
  const scrollToBottom = useScrollToBottom({ scrollRef })
  const [oldestMessTimeStamp, setOldestMessTimeStamp] = useState<number | null>(
    null,
  )
  const [latestMessTimeStamp, setLatestMessTimeStamp] = useState<number | null>(
    null,
  )
  const [hasMorePrev, setHasMorePrev] = useState<boolean>(true)
  const [isInitMessageLoaded, setIsInitMessageLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getListMessages = async () => {
      if (currentChannel) {
        const params: PreviousMessageListQueryParams = {
          limit: PREV_RESULT_SIZE,
          reverse: false,
        }
        const query: PreviousMessageListQuery =
          currentChannel.createPreviousMessageListQuery(params)

        setLoading(true)
        const listMessages = await query.load()
        setIsInitMessageLoaded(true)
        updateAllMess(listMessages)
        setOldestMessTimeStamp(getOldestMessageTimeStamp(listMessages))
        setLatestMessTimeStamp(getLatestMessageTimeStamp(listMessages))
        setLoading(false)
        setTimeout(() => scrollToBottom(), 1000)
      }
    }
    getListMessages()
  }, [currentChannel, scrollToBottom, updateAllMess])

  const combinePrevMessToAllMess = (
    prevMess: BaseMessage[],
    allMess: BaseMessage[],
  ) => {
    // Remove duplicated messages
    const duplicatedMessageIds: number[] = []
    const updatedOldMessages = allMess.map(msg => {
      const duplicatedMessage = prevMess.find(({ messageId }) =>
        compareIds(messageId, msg.messageId),
      )
      if (!duplicatedMessage) return msg
      const nextMsg =
        Number(duplicatedMessage.updatedAt) > Number(msg.updatedAt)
          ? duplicatedMessage
          : msg
      duplicatedMessageIds.push(duplicatedMessage.messageId)
      return nextMsg
    })
    let filteredNewMessages = prevMess
    if (duplicatedMessageIds.length > 0) {
      filteredNewMessages = prevMess.filter(
        msg =>
          !duplicatedMessageIds.find(messageId =>
            compareIds(messageId, msg.messageId),
          ),
      )
    }

    return [...filteredNewMessages, ...updatedOldMessages]
  }

  const loadPrev = () => {
    if (hasMorePrev && isInitMessageLoaded) {
      const messageListParams: MessageListParams = {
        prevResultSize: PREV_RESULT_SIZE,
        nextResultSize: 0,
      }
      currentChannel
        ?.getMessagesByTimestamp(
          oldestMessTimeStamp || new Date().getTime(),
          messageListParams,
        )
        .then(messages => {
          setOldestMessTimeStamp(getOldestMessageTimeStamp(messages))
          const _hasMorePrev = messages && messages.length === PREV_RESULT_SIZE
          setHasMorePrev(_hasMorePrev)
          updateAllMess(s => combinePrevMessToAllMess(messages, s))
        })
    }
  }

  return { loadPrev, isInitMessageLoaded, loading }
}

export default useLoadMess

import {
  Avatar as ChatAvatar,
  Message,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react'
import { UserMessage } from '@sendbird/chat/message'
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { Avatar } from 'antd'

type Props = {
  mess: UserMessage
  currentUser: any
  chainTop: boolean
  chainBottom: boolean
  hasSeparator: boolean
}

const MessText = ({
  mess,
  currentUser,
  chainBottom,
  chainTop,
  hasSeparator,
}: Props) => {
  const isOutGoing = currentUser?.userId === mess?.sender?.userId
  const position = useMemo(() => {
    if (chainTop && chainBottom) return 'normal'
    if (chainTop) return 'last'
    if (chainBottom) return 'first'
    return 'single'
  }, [chainBottom, chainTop])
  return (
    <>
      {hasSeparator && (
        <MessageSeparator>
          {format(mess.createdAt, 'MMMM dd, yyyy')}
        </MessageSeparator>
      )}
      <Message
        key={mess.messageId}
        model={{
          message: mess.message,
          direction: isOutGoing ? 'outgoing' : 'incoming',
          position,
          sentTime: format(mess.createdAt, 'p'),
          sender: mess.sender.nickname,
        }}
      >
        <Message.Header
          sender={mess.sender.nickname}
          sentTime={format(mess.createdAt, 'p')}
        />
        {!isOutGoing && (
          <Avatar {...{ as: ChatAvatar }} src={mess.sender.profileUrl}>
            {mess.sender.nickname.charAt(0) || 'U'}
          </Avatar>
        )}
      </Message>
    </>
  )
}

export default MessText

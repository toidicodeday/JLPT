import {
  Avatar as ChatAvatar,
  Message,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react'
import { FileMessage } from '@sendbird/chat/message'
import { Avatar, Image } from 'antd'
import { format } from 'date-fns'
import React, { useMemo } from 'react'

type Props = {
  mess: FileMessage
  currentUser: any
  chainTop: boolean
  chainBottom: boolean
  hasSeparator: boolean
}

const MessImages = ({
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

  const isImage = mess.type.includes('image')
  console.log('is Image', mess.type.includes('image'))

  return (
    <>
      {hasSeparator && (
        <MessageSeparator>
          {format(mess.createdAt, 'MMMM dd, yyyy')}
        </MessageSeparator>
      )}
      {isImage ? (
        <Message
          key={mess.messageId}
          type="image"
          model={{
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
              {mess.sender.nickname.charAt(0)}
            </Avatar>
          )}
          <Image
            {...{ as: Message.ImageContent }}
            src={mess.url}
            alt={mess.name}
            width={200}
          />
        </Message>
      ) : (
        <Message
          key={mess.messageId}
          model={{
            // message: mess.name,
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
          <Message.CustomContent>
            <a href={mess.url} target="_blank" rel="noreferrer">
              {mess.name}
            </a>
          </Message.CustomContent>
        </Message>
      )}
    </>
  )
}

export default MessImages

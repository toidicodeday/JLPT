import {
  AdminMessage,
  FileMessage,
  UserMessage,
} from '@sendbird/chat/lib/__definition'
import { format } from 'date-fns'
import { BaseMessage } from '@sendbird/chat/message'

export const getOldestMessageTimeStamp = (messages: BaseMessage[] = []) => {
  const oldestMessage = messages[0]
  return (oldestMessage && oldestMessage.createdAt) || null
}

export const getLatestMessageTimeStamp = (messages: BaseMessage[] = []) => {
  const latestMessage = messages[messages.length - 1]
  return (latestMessage && latestMessage.createdAt) || null
}

export const uuidv4 = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

export const getMessageCreatedAt = (
  message: UserMessage | FileMessage,
): string => format(message.createdAt, 'p')

export const isSameGroup = (
  message: AdminMessage | UserMessage | FileMessage,
  comparingMessage: AdminMessage | UserMessage | FileMessage,
): boolean => {
  if (
    !(
      message &&
      comparingMessage &&
      message?.messageType &&
      message.messageType !== 'admin' &&
      comparingMessage?.messageType &&
      comparingMessage.messageType !== 'admin' &&
      (message as UserMessage | FileMessage)?.sender &&
      (comparingMessage as UserMessage | FileMessage)?.sender &&
      message?.createdAt &&
      comparingMessage?.createdAt &&
      (message as UserMessage | FileMessage)?.sender?.userId &&
      (comparingMessage as UserMessage | FileMessage)?.sender?.userId
    )
  ) {
    return false
  }
  // to fix typecasting
  const message_ = message as UserMessage
  const comparingMessage_ = comparingMessage as UserMessage
  return (
    message_?.sendingStatus === comparingMessage_?.sendingStatus &&
    message_?.sender?.userId === comparingMessage_?.sender?.userId &&
    getMessageCreatedAt(message as UserMessage | FileMessage) ===
      getMessageCreatedAt(comparingMessage as UserMessage | FileMessage)
  )
}

export const compareMessagesForGrouping = (
  prevMessage: AdminMessage | UserMessage | FileMessage,
  currMessage: AdminMessage | UserMessage | FileMessage,
  nextMessage: AdminMessage | UserMessage | FileMessage,
): [boolean, boolean] => [
  isSameGroup(prevMessage, currMessage),
  isSameGroup(currMessage, nextMessage),
]

import React, { useEffect, useMemo, useRef, useState } from 'react'
import useSbChannelByUrl from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelByUrl'
import useSbMessageList from '@/components/SendbirdChat/hooks/messageHooks/useSbMessageList'
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  MessageInput,
  Sidebar,
  Message,
} from '@chatscope/chat-ui-kit-react'
import MessText from './components/Message/MessText'
import {
  AdminMessage,
  FileMessage,
  MessageType,
  UserMessage,
} from '@sendbird/chat/message'
import { isSameDay } from 'date-fns'
import {
  uuidv4,
  compareMessagesForGrouping,
} from '../SendbirdChat/helper/message.helper'
import ChatBoxSidebar from './components/ChatBoxSidebar'
import useSbCurrentUser from '../SendbirdChat/hooks/userHooks/useSbCurrentUser'
import { Avatar, Button, Empty, Tag, Upload } from 'antd'
import { BiImage } from 'react-icons/bi'
import './styles.scss'
import MessFile from './components/Message/MessFile'
import { useSendbirdContext } from '../SendbirdChat'
import { SB_GROUP_CUSTOM_TYPE } from '../SendbirdChat/constant/sendbird.constant'
import { MemberState } from '@sendbird/chat/groupChannel'
import { useGetOrderDetailsQuery } from '@/services/orderApi/order'
import {
  CN_ORDER_STATUS,
  CN_ORDER_STATUS_OPS,
  ORDER_STATUS_OPS,
  STATUS_ORDER,
} from '@/utils/constant/constant'
import { isNumber, get } from 'lodash'

interface Props {
  channelUrl?: string
  showSidebar?: boolean
  showInput?: boolean
  showLeaveBtn?: boolean
  onLeaveCallback?: () => void
}

const ChatBox = ({
  showSidebar = false,
  showInput = true,
  showLeaveBtn = true,
  channelUrl: url,
  onLeaveCallback,
}: Props) => {
  const [channelUrl, setChannelUrl] = useState('')

  useEffect(() => {
    setChannelUrl(url || '')
  }, [url])
  const scrollRef = useRef(null)
  const ctx = useSendbirdContext()

  const { currentUser } = useSbCurrentUser()
  const { detailChannel } = useSbChannelByUrl(channelUrl)

  useEffect(() => {
    const markChannelAsRead = async () => {
      if (detailChannel?.url) {
        await detailChannel?.markAsRead()
        ctx?.setLatestOpenChannelUrl(detailChannel?.url)
      }
    }
    markChannelAsRead()
  }, [ctx, detailChannel])

  const {
    allMessages,
    sendUserMessage,
    sendFileMessage,
    loadMorePrev,
    loadingMess,
  } = useSbMessageList(detailChannel, scrollRef)

  const onLeaveChannel = () => {
    if (onLeaveCallback) onLeaveCallback()
    detailChannel?.leave().then(() => setChannelUrl(''))
  }

  const { data: orderDetails, isFetching: fetchingOrder } =
    useGetOrderDetailsQuery(
      {
        code: detailChannel?.url?.replaceAll('_drivers', ''),
      },
      {
        skip: !Boolean(
          detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.ORDER_GUEST ||
            detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER ||
            detailChannel?.url?.replaceAll('_drivers', ''),
        ),
      },
    )
  const orderStatus = useMemo(() => {
    if (!isNumber(orderDetails?.data.status)) return ''

    const status = orderDetails?.data.status as any

    const tagList = { ...ORDER_STATUS_OPS, ...CN_ORDER_STATUS_OPS }
    return (
      <Tag color={get(tagList, `${status}.color`)}>
        {get(tagList, `${status}.label`)}
      </Tag>
    )
  }, [orderDetails?.data.status])

  const channelRenderInfo = useMemo(() => {
    let title = ''
    let avatar = ''
    let altText = ''
    let canLeaveChannel = false
    const otherMems = detailChannel?.members.filter(
      u => u.userId !== currentUser?.userId,
    )
    const guestMem = detailChannel?.members.find(
      u => u.userId !== currentUser?.userId && u.userId.startsWith('guest'),
    )
    const driverMem = detailChannel?.members.find(
      u => u.userId !== currentUser?.userId && u.userId.startsWith('driver'),
    )

    if (detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.ORDER_GUEST) {
      title = 'Đơn hàng ' + detailChannel?.url
      canLeaveChannel = true
    }
    if (detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER) {
      title =
        'Chat đội trưởng và tài xế đơn hàng ' +
        detailChannel?.url?.replaceAll('_drivers', '')
      canLeaveChannel = true
    }
    if (detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST) {
      title = guestMem?.nickname || ''
      avatar = guestMem?.profileUrl || ''
      altText = guestMem?.nickname?.charAt(0).toUpperCase() || ''
      canLeaveChannel = true
    }
    if (detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER) {
      title = driverMem?.nickname || ''
      avatar = driverMem?.profileUrl || ''
      altText = driverMem?.nickname?.charAt(0).toUpperCase() || ''
      canLeaveChannel = true
    }

    if (detailChannel?.customType === SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN) {
      title = 'Chat với ' + otherMems?.map(u => u.nickname).join(', ')
      avatar = otherMems?.[0]?.profileUrl || ''
    }

    return {
      title,
      avatar,
      altText,
      canLeaveChannel:
        canLeaveChannel &&
        detailChannel?.myMemberState === MemberState.JOINED &&
        showLeaveBtn,
    }
  }, [
    currentUser?.userId,
    detailChannel?.customType,
    detailChannel?.members,
    detailChannel?.myMemberState,
    detailChannel?.url,
    showLeaveBtn,
  ])

  const memoizedAllMessages = useMemo(() => {
    return allMessages.map((m, idx) => {
      const previousMessage = allMessages[idx - 1]
      const nextMessage = allMessages[idx + 1]
      const [chainTop, chainBottom] = compareMessagesForGrouping(
        previousMessage as AdminMessage | UserMessage | FileMessage,
        m as AdminMessage | UserMessage | FileMessage,
        nextMessage as AdminMessage | UserMessage | FileMessage,
      )
      const previousMessageCreatedAt = previousMessage?.createdAt
      const currentCreatedAt = m.createdAt
      const hasSeparator = !(
        previousMessageCreatedAt &&
        isSameDay(currentCreatedAt, previousMessageCreatedAt)
      )

      if (m.messageType === MessageType.USER)
        return (
          <div key={m.messageId + uuidv4()} is="Message2">
            <MessText
              mess={m as UserMessage}
              hasSeparator={hasSeparator}
              chainTop={chainTop}
              chainBottom={chainBottom}
              currentUser={currentUser}
            />
          </div>
        )
      if (m.messageType === MessageType.FILE)
        return (
          <div key={m.messageId + uuidv4()} {...{ as: Message }}>
            <MessFile
              mess={m as FileMessage}
              hasSeparator={hasSeparator}
              chainTop={chainTop}
              chainBottom={chainBottom}
              currentUser={currentUser}
            />
          </div>
        )
      return null
    })
  }, [allMessages, currentUser])

  const isOrderChat = [
    SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
    SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
  ].includes(detailChannel?.customType as SB_GROUP_CUSTOM_TYPE)
  const isOrderFinished =
    [
      STATUS_ORDER.COMPLETE,
      STATUS_ORDER.CANCEL,
      STATUS_ORDER.FAILURE,
      CN_ORDER_STATUS.MOVED,
      CN_ORDER_STATUS.RATED,
    ].includes(orderDetails?.data?.status as any) && isOrderChat

  const shouldShowInput = useMemo(() => {
    if (fetchingOrder) return false
    if (!showInput) return false
    if (showInput && isOrderFinished) return false
    return true
  }, [fetchingOrder, isOrderFinished, showInput])

  return (
    <div className="relative font-sans p-1 flex-grow h-full">
      <MainContainer className="flex items-stretch">
        {showSidebar && (
          <Sidebar
            position={'left'}
            className="flex-shrink-0 basis-96 h-full bg-red-400 flex"
          >
            <ChatBoxSidebar
              channelUrl={channelUrl}
              setChannelUrl={setChannelUrl}
            />
          </Sidebar>
        )}
        <div className="basis-96 min-w-[300px] w-full h-full flex-grow">
          <ChatContainer className="h-full w-full">
            <ConversationHeader className="bg-primary bg-opacity-20">
              <ConversationHeader.Content>
                <div className="flex justify-between">
                  <div className="flex justify-start items-center gap-3">
                    {(channelRenderInfo.avatar ||
                      channelRenderInfo.altText) && (
                      <Avatar
                        src={channelRenderInfo.avatar}
                        className="flex-shrink-0"
                      >
                        {channelRenderInfo.altText}
                      </Avatar>
                    )}
                    <p>{channelRenderInfo.title}</p>
                    {orderStatus}
                  </div>

                  {channelRenderInfo.canLeaveChannel && (
                    <Button danger onClick={onLeaveChannel}>
                      Rời nhóm
                    </Button>
                  )}
                </div>
              </ConversationHeader.Content>
            </ConversationHeader>
            {detailChannel?.url ? (
              <MessageList
                ref={scrollRef}
                autoScrollToBottom
                autoScrollToBottomOnMount
                loading={loadingMess}
                onYReachStart={loadMorePrev}
              >
                {memoizedAllMessages}
              </MessageList>
            ) : null}

            {isOrderFinished && (
              <div
                {...{ as: MessageInput }}
                className="flex row  justify-center text-center text-gray-400"
              >
                ---- Đơn hàng đã kết thúc ----
              </div>
            )}

            {detailChannel?.url && shouldShowInput ? (
              <div
                {...{ as: MessageInput }}
                className="flex row border-t-dashed border-t border-t-sky-400 items-center"
              >
                <Upload
                  // type="text"
                  accept="image/*"
                  className="w-10 flex items-center px-2"
                  beforeUpload={() => false}
                  onChange={info => sendFileMessage(info.file)}
                  showUploadList={false}
                >
                  <BiImage size={32} className="text-primary" />
                </Upload>
                <MessageInput
                  placeholder="Type message here"
                  onSend={(value, textContent) => {
                    sendUserMessage(textContent)
                  }}
                  attachButton={false}
                  className="flex-grow border-none"
                />
              </div>
            ) : null}
            {detailChannel?.url && !memoizedAllMessages.length ? (
              <div
                className="flex justify-center items-center w-full h-full"
                {...{ as: MessageList }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Cuộc hội thoại trống"
                />
              </div>
            ) : null}
            {!detailChannel?.url ? (
              <div
                className="flex justify-center items-center w-full h-full"
                {...{ as: MessageList }}
              >
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Cuộc hội thoại chưa bắt đầu"
                />
              </div>
            ) : null}
          </ChatContainer>
        </div>
      </MainContainer>
    </div>
  )
}
export default ChatBox

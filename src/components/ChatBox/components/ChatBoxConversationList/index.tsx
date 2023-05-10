import { MockAvatar } from '@/assets/img'
import {
  Avatar,
  Conversation,
  ConversationList,
} from '@chatscope/chat-ui-kit-react'
import { Typography } from 'antd'
import React from 'react'

interface Props {
  dataSource: any
  setSelectedConversation: (values: any) => void
  setDataSource: (values: any) => void
  countUnread: any
  selectedConversation: any
}

const ChatBoxConversationList = (props: Props) => {
  return (
    <ConversationList className="mt-4">
      {props?.dataSource?.map((item: any) => (
        <div className="w-full">
          <Conversation
            onClick={() => {
              props.setSelectedConversation({
                ...item,
                messages: item?.messages?.map((child: any) => {
                  return {
                    ...child,
                    children: child?.children?.map((each: any) => {
                      return {
                        ...each,
                        isRead: true,
                      }
                    }),
                  }
                }),
              })
              props.setDataSource(
                props.dataSource?.map((oneItem: any) => {
                  if (oneItem.id === item.id) {
                    return {
                      ...oneItem,
                      messages: oneItem?.messages?.map((child: any) => {
                        return {
                          ...child,
                          children: child?.children?.map((each: any) => {
                            return {
                              ...each,
                              isRead: true,
                            }
                          }),
                        }
                      }),
                    }
                  } else {
                    return oneItem
                  }
                }),
              )
            }}
            key={item?.id}
            unreadCnt={
              props.countUnread?.filter((each: any) => each?.id === item?.id)[0]
                ?.totalUnread
            }
            active={props.selectedConversation?.id === item?.id}
          >
            <Avatar src={MockAvatar} name={item?.senderName} />
            <Conversation.Content>
              <Typography className="font-bold text-sm">
                {item?.senderName}
              </Typography>
              <Typography className="text-xs text-grayChip">
                {item?.relatedOrder?.code} - {item?.orderType}
              </Typography>

              {item?.messages[0]?.direction === 'incoming' && (
                <div className="flex justify-between">
                  <Typography className="text-sm mt-1 truncate flex-1 pr-2">
                    {item?.messages[0]?.content}
                  </Typography>
                  <Typography className="text-sm mt-1 ">10:00 AM</Typography>
                </div>
              )}
              {item?.messages[0]?.direction === 'outgoing' && (
                <div className="flex justify-between">
                  <Typography className="text-sm mt-1 pr-1">Bạn:</Typography>
                  <Typography className="text-sm mt-1 truncate flex-1 pr-2">
                    {item?.messages[0]?.content}
                  </Typography>
                  <Typography className="text-sm mt-1 ">10:00 AM</Typography>
                </div>
              )}
            </Conversation.Content>
          </Conversation>
        </div>
      ))}
    </ConversationList>
  )
}

export default ChatBoxConversationList

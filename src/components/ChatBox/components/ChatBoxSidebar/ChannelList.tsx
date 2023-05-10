import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
import useSbChannelList from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelList'
import useSbChannelListPrivate from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelListPrivate'
import useSbChannelUnreadCount from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelUnreadCount'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import { GroupChannel, MemberState } from '@sendbird/chat/groupChannel'
import { BaseMessage, MessageType, UserMessage } from '@sendbird/chat/message'
import { Avatar, Badge, Spin } from 'antd'
import { formatDistanceToNow } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'

type Props = {
  setChannelUrl: (url: string) => void
  channelUrl: string
}

const customTypesOrder = [
  SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
  SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
]
const customTypesGuest = [SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST]
const customTypesDriver = [SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER]
const customTypesAdmin = [SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN]

const ChannelList = ({ setChannelUrl, channelUrl }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('orderOrDriver')
  const [customTypes, setCustomTypes] = useState<string[]>([
    SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
    SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
  ])
  const { unreadChannelCount: unreadCountOrder } = useSbChannelUnreadCount({
    customeTypes: customTypesOrder,
  })
  const { unreadChannelCount: unreadCountCustomer } = useSbChannelUnreadCount({
    customeTypes: customTypesGuest,
  })
  const { unreadChannelCount: unreadCountDriver } = useSbChannelUnreadCount({
    customeTypes: customTypesDriver,
  })
  const { unreadChannelCount: unreadCountAdmin } = useSbChannelUnreadCount({
    customeTypes: customTypesAdmin,
  })

  const tabs = [
    {
      label: 'Đơn hàng',
      key: 'orderOrDriver',
      customType: [
        SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
        SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
      ],
      unreadCount: unreadCountOrder,
    },
    {
      label: 'Khách hàng',
      key: 'customer',
      customType: [SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST],
      unreadCount: unreadCountCustomer,
    },
    {
      label: 'Tài xế',
      key: 'driver',
      customType: [SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER],
      unreadCount: unreadCountDriver,
    },
    {
      label: 'Quản lý',
      key: 'admin',
      customType: [SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN],
      unreadCount: unreadCountAdmin,
    },
  ]

  const queryParams = useMemo(
    () => ({
      customTypesFilter: customTypes,
    }),
    [customTypes],
  )
  const { channels, loadMoreChannels, loading } =
    useSbChannelListPrivate(queryParams)
  const { currentUser } = useSbCurrentUser()

  const handleClickGroupChannel = async (channel: GroupChannel) => {
    if (channel.unreadMessageCount) channel.markAsRead()
    const isMember = channel.myMemberState === MemberState.JOINED
    if (!isMember) {
      await channel.join()
    }
    setChannelUrl(channel.url)
  }

  const handleSroll = (e: any) => {
    const element = e.target
    const { scrollTop, clientHeight, scrollHeight } = element
    const isAboutSame = (a: number, b: number, px: number) =>
      Math.abs(a - b) <= px
    if (isAboutSame(clientHeight + scrollTop, scrollHeight, 10)) {
      loadMoreChannels()
    }
  }

  const getMessContentFromLastMess = useCallback((lastMessage: BaseMessage) => {
    if (lastMessage?.messageType === MessageType.USER)
      return (lastMessage as UserMessage).message
    if (lastMessage?.messageType === MessageType.FILE) return 'đã gửi 1 ảnh'
  }, [])

  const getChannelInfo = useCallback(
    (channel: GroupChannel) => {
      let avatar = ''
      let altText = ''
      let title = ''

      const channelTime = formatDistanceToNow(
        channel.lastMessage?.createdAt || channel.createdAt,
      )
      if (channel.customType === SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER) {
        const driver = channel?.members.find(u =>
          u?.userId?.startsWith('driver'),
        )
        title = driver?.nickname || ''
        avatar = driver?.profileUrl || ''
        altText = driver?.nickname.charAt(0) || ''
      }
      if (channel.customType === SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST) {
        const guest = channel?.members.find(u => u?.userId?.startsWith('guest'))
        title = guest?.nickname || ''
        avatar = guest?.profileUrl || ''
        altText = guest?.nickname.charAt(0) || ''
      }
      if (channel.customType === SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN) {
        const otherUsers = channel.members.filter(
          u => u?.userId !== currentUser?.userId,
        )
        title = otherUsers?.map(u => u.nickname).join(', ')
        avatar = otherUsers?.[0]?.profileUrl
        altText = otherUsers?.[0]?.nickname.charAt(0) || ''
      }
      if (
        [
          SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
          SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
        ].includes(channel.customType as SB_GROUP_CUSTOM_TYPE)
      ) {
        if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER) {
          title =
            'Đội trưởng và tài xế đơn hàng ' +
            channel.url.replace('_drivers', '')
        }
        if (channel.customType === SB_GROUP_CUSTOM_TYPE.ORDER_GUEST) {
          title = 'Đơn hàng ' + channel.url
        }
        const otherUsers = channel.members.filter(
          u => u?.userId !== currentUser?.userId,
        )
        // title = otherUsers?.map(u => u.nickname).join(', ')
        avatar = otherUsers?.[0]?.profileUrl
        altText = otherUsers?.[0]?.nickname.charAt(0) || ''
      }
      return { title, avatar, altText, channelTime }
    },
    [currentUser?.userId],
  )

  return (
    <>
      <div className="flex gap-x-2">
        {tabs.map(i => (
          <Badge count={i.unreadCount || 0} style={{ color: '#FFF' }}>
            <div
              key={i.key}
              className={`flex-grow cursor-pointer rounded-md flex items-center justify-center h-10 px-1  ${
                activeTab === i.key ? 'bg-red-300' : 'bg-slate-200 '
              }`}
              onClick={() => {
                setActiveTab(i.key)
                setCustomTypes(i.customType)
              }}
            >
              <p className="text-sm">{i.label}</p>
            </div>
          </Badge>
        ))}
      </div>

      <div onScroll={handleSroll} className="flex flex-col gap-3">
        {loading && (
          <div className="w-full h-28 flex justify-center items-end">
            <Spin />
          </div>
        )}
        {channels.map(channel => {
          const channelInfo = getChannelInfo(channel)

          return (
            <div
              key={channel.url}
              className={[
                'flex items-center justify-between gap-3 rounded-lg  border border-solid border-grayBorder p-3 hover:bg-sky-300 cursor-pointer',
                channelUrl === channel.url ? 'bg-sky-300' : 'bg-white',
              ].join(' ')}
              onClick={() => handleClickGroupChannel(channel)}
            >
              <div className="flex justify-start gap-3">
                <Avatar src={channelInfo.avatar} className="flex-shrink-0">
                  {channelInfo.altText}
                </Avatar>
                <div>
                  <p>{channelInfo.title}</p>
                  <p className="text-xs text-gray-400">
                    {getMessContentFromLastMess(channel.lastMessage)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-end">
                <small className="text-slate-500 text-right">
                  {channelInfo.channelTime}
                </small>
                <Badge count={channel.unreadMessageCount} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ChannelList

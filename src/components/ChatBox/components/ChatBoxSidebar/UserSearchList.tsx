import { useSendbirdContext } from '@/components/SendbirdChat'
import {
  ACCOUNT_META,
  ACCOUNT_METADATA_KEY,
  SB_GROUP_CUSTOM_TYPE,
} from '@/components/SendbirdChat/constant/sendbird.constant'
import useSbApplicationUser from '@/components/SendbirdChat/hooks/userHooks/useSbApplicationUser'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import { ApplicationUserListQueryParams, User } from '@sendbird/chat'
import { MemberState } from '@sendbird/chat/groupChannel'
import { Avatar } from 'antd'
import { get } from 'lodash'
import React, { useMemo } from 'react'

type Props = {
  setChannelUrl: (url: string) => void
  searchUser: string
}

const UserSearchList = ({ setChannelUrl, searchUser }: Props) => {
  const queryUserParams = useMemo(() => {
    let query: ApplicationUserListQueryParams = {}
    if (searchUser) {
      query.nicknameStartsWithFilter = searchUser
    }
    return query
  }, [searchUser])
  const { users } = useSbApplicationUser(queryUserParams)

  const ctx = useSendbirdContext()
  const { currentUser } = useSbCurrentUser()

  const findChannelByType = async (user: User) => {
    try {
      if (!currentUser) return null
      if (!ctx?.sendbird) return null
      if (user.userId.startsWith('driver')) {
        const channel = await ctx.sendbird.groupChannel.getChannel(
          `${user.userId}_support_channel`,
        )
        return channel || null
      }
      if (user.userId.startsWith('guest')) {
        const channel = await ctx.sendbird.groupChannel.getChannel(
          `${user.userId}_support_channel`,
        )
        return channel || null
      }

      if (user.userId.startsWith('admin')) {
        const channelUrl = [user.userId, currentUser.userId].sort().join('_')
        const channel = await ctx.sendbird.groupChannel.getChannel(channelUrl)
        return channel || null
      }
      return null
    } catch (err) {
      return null
    }
  }
  const createChannelByType = (user: User) => {
    if (!currentUser) return null
    if (!ctx?.sendbird) return null
    if (user.userId.startsWith('driver')) {
      return ctx.sendbird.groupChannel.createChannel({
        invitedUserIds: [currentUser?.userId, user.userId],
        operatorUserIds: [currentUser?.userId, user.userId],
        channelUrl: `${user.userId}_support_channel`,
        name: 'Hỗ trợ tài xế',
        customType: SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER,
        isDistinct: false,
        isPublic: true,
      })
    }
    if (user.userId.startsWith('guest')) {
      return ctx.sendbird.groupChannel.createChannel({
        invitedUserIds: [currentUser?.userId, user.userId],
        operatorUserIds: [currentUser?.userId, user.userId],
        channelUrl: `${user.userId}_support_channel`,
        name: 'Hỗ trợ khách hàng',
        customType: SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST,
        isDistinct: false,
        isPublic: true,
      })
    }

    if (user.userId.startsWith('admin')) {
      return ctx.sendbird.groupChannel.createChannel({
        invitedUserIds: [currentUser?.userId, user.userId],
        operatorUserIds: [currentUser?.userId, user.userId],
        channelUrl: [user.userId, currentUser.userId].sort().join('_'),
        customType: SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN,
        isDistinct: false,
        isPublic: true,
      })
    }
    return null
  }

  const onClickUser = async (user: User) => {
    if (!currentUser) return
    if (!ctx?.sendbird) return
    let channel = null
    channel = await findChannelByType(user)

    console.log('onClickUser channel', channel)
    if (!channel) channel = await createChannelByType(user)
    if (!channel) return
    if (channel.myMemberState !== MemberState.JOINED) await channel.join()
    setChannelUrl(channel.url)
  }

  const getRoleUser = (user: User) => {
    const role: string = get(user.metaData, ACCOUNT_METADATA_KEY.ROLES) || ''
    switch (role) {
      case ACCOUNT_META.ADMIN:
        return 'Admin'
      case ACCOUNT_META.CUSTOMER:
        return 'Khách hàng'
      case ACCOUNT_META.DRIVER:
        return 'Tài xế'
      default:
        return ''
    }
  }

  return (
    <div>
      {users.map(user => {
        if (user.userId === currentUser?.userId) return null
        return (
          <div
            key={user.userId}
            className="flex items-center justify-between gap-3 rounded-lg bg-white border border-solid border-grayBorder p-3 hover:bg-sky-300 cursor-pointer mb-3"
            onClick={async () => {
              onClickUser(user)
            }}
          >
            <div className="flex justify-start items-center gap-3">
              <Avatar
                size="small"
                className="flex-shrink-0"
                src={user?.profileUrl}
              >
                {user?.nickname.charAt(0)}
              </Avatar>
              <div className="flex-shrink">
                <p className="mb-0">{user?.nickname}</p>
                <p className="mb-0 text-xs italic text-gray-500">
                  {user?.userId}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-end">
              <small className="text-slate-500">{getRoleUser(user)}</small>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserSearchList

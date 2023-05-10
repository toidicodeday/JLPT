import {
  GroupChannel,
  GroupChannelListQuery,
  GroupChannelListQueryParams,
  QueryType,
} from '@sendbird/chat/groupChannel'
import { useEffect, useState } from 'react'
import { useSendbirdContext } from '../../Provider'
import useSbChannel from './useSbChannel'

const useSbChannelByUserIds = (userIds?: string[]) => {
  const ctx = useSendbirdContext()
  const [detailChannel, setDetailChannel] = useState<GroupChannel>()

  const { createChannelWith } = useSbChannel()

  useEffect(() => {
    const getDetailChannel = async () => {
      if (ctx?.connectionState === 'OPEN' && userIds?.length) {
        console.log('userIds', userIds)
        const params: GroupChannelListQueryParams = {
          userIdsFilter: {
            userIds,
            includeMode: true,
            queryType: QueryType.AND,
          },
        }
        const query: GroupChannelListQuery =
          ctx.sendbird.groupChannel.createMyGroupChannelListQuery(params)

        const channels: GroupChannel[] = await query.next()
        if (channels?.[0]?.url) {
          setDetailChannel(channels[0])
        } else {
          const channel = await createChannelWith(userIds, userIds)
          if (channel) {
            setDetailChannel(channel)
          }
        }
      }
    }
    getDetailChannel()
  }, [
    createChannelWith,
    ctx?.connectionState,
    ctx?.sendbird.groupChannel,
    userIds,
  ])

  return { detailChannel }
}

export default useSbChannelByUserIds

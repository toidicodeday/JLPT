import {
  PublicGroupChannelListQueryParams,
  GroupChannel,
  PublicGroupChannelListOrder,
  PublicGroupChannelListQuery,
  // GroupChannelListOrder,
  // PublicGroupChannelListQueryParams,
} from '@sendbird/chat/groupChannel'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSendbirdContext } from '../..'
import { CHANNEL_SIZE } from '../../constant/sendbird.constant'
import useSbLatestMessage from '../messageHooks/useSbLatestMessage'

const useSbChannelList = (queryParams?: PublicGroupChannelListQueryParams) => {
  const [channels, setChannels] = useState<GroupChannel[]>([])
  const [channelQuery, setChannelQuery] =
    useState<PublicGroupChannelListQuery>()
  const { latestMessage } = useSbLatestMessage()
  const [loading, setLoading] = useState(false)
  const ctx = useSendbirdContext()

  useEffect(() => {
    const getListChannel = async () => {
      setChannels([])
      setLoading(true)
      if (ctx?.sendbird?.connectionState === 'OPEN') {
        const params: PublicGroupChannelListQueryParams = {
          limit: CHANNEL_SIZE, // The value of the pagination limit could be set up to 100.
          order: PublicGroupChannelListOrder.CHRONOLOGICAL,
          includeEmpty: true,
          ...queryParams,
        }
        const query: PublicGroupChannelListQuery =
          ctx?.sendbird?.groupChannel?.createPublicGroupChannelListQuery(params)
        if (query.hasNext) {
          const channelList: GroupChannel[] = await query.next()
          setChannelQuery(query)
          setChannels(channelList)
          setLoading(false)
        }
      }
      setLoading(false)
    }
    if (ctx?.connectionState === 'OPEN') getListChannel()
  }, [
    ctx?.connectionState,
    ctx?.sendbird?.connectionState,
    ctx?.sendbird?.groupChannel,
    queryParams,
  ])

  // remove unreadMess when channel is open
  useEffect(() => {
    setChannels(chs =>
      chs.map(ch => {
        if (ch.url === ctx?.latestOpenChannelUrl) {
          ch.unreadMessageCount = 0
        }
        return ch
      }),
    )
  }, [ctx?.latestOpenChannelUrl])

  // update channel unread when new message recieved
  useEffect(() => {
    setChannels(list => {
      // check whether changed channel is insearch Channellist
      if (queryParams?.customTypesFilter && latestMessage.channel?.customType) {
        const isSameSearch = queryParams?.customTypesFilter?.includes(
          latestMessage.channel?.customType,
        )
        if (!isSameSearch) return list
      }

      // move latest channel to top list
      if (latestMessage.channel && latestMessage.message?.messageId) {
        const channelIndex = list.findIndex(
          ch => ch.url === latestMessage?.message?.channelUrl,
        )
        if (channelIndex >= 0) list.splice(channelIndex, 1)
        return [latestMessage.channel as GroupChannel, ...list]
      }
      return list
    })
  }, [
    latestMessage.channel,
    latestMessage.message?.channelUrl,
    latestMessage.message?.messageId,
    queryParams?.customTypesFilter,
  ])

  const loadMoreChannels = useCallback(() => {
    if (channelQuery?.hasNext) {
      channelQuery.next().then(newChannels => {
        setChannels(s => [...s, ...newChannels])
      })
    }
  }, [channelQuery])
  const hasNextChannels = useMemo(() => {
    return channelQuery?.hasNext
  }, [channelQuery?.hasNext])

  return { channels, loadMoreChannels, loading, hasNextChannels }
}

export default useSbChannelList

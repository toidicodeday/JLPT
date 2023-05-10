import {
  GroupChannel,
  GroupChannelListOrder,
  GroupChannelListQuery,
  GroupChannelListQueryParams,
  // PublicGroupChannelListQueryParams,
} from '@sendbird/chat/groupChannel'
import { useCallback, useEffect, useState } from 'react'
import { useSendbirdContext } from '../..'
import { CHANNEL_SIZE } from '../../constant/sendbird.constant'
import useSbLatestMessage from '../messageHooks/useSbLatestMessage'

const useSbChannelList = (queryParams?: GroupChannelListQueryParams) => {
  const [channels, setChannels] = useState<GroupChannel[]>([])
  const [channelQuery, setChannelQuery] = useState<GroupChannelListQuery>()
  const { latestMessage } = useSbLatestMessage()
  const [loading, setLoading] = useState(false)
  const ctx = useSendbirdContext()

  useEffect(() => {
    const getListChannel = async () => {
      setChannels([])
      setLoading(true)
      if (ctx?.sendbird?.connectionState === 'OPEN') {
        const params: GroupChannelListQueryParams = {
          limit: CHANNEL_SIZE, // The value of the pagination limit could be set up to 100.
          order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
          ...queryParams,
        }
        const query: GroupChannelListQuery =
          ctx?.sendbird?.groupChannel?.createMyGroupChannelListQuery(params)
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

  return { channels, loadMoreChannels, loading }
}

export default useSbChannelList

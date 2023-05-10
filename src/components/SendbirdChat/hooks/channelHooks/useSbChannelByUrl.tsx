import { GroupChannel } from '@sendbird/chat/groupChannel'
import { useEffect, useState } from 'react'
import { useSendbirdContext } from '../../Provider'

const useSbChannelByUrl = (channelUrl?: string | null) => {
  const ctx = useSendbirdContext()
  const [detailChannel, setDetailChannel] = useState<GroupChannel>()

  useEffect(() => {
    const getDetailChannel = async () => {
      try {
        if (ctx?.connectionState === 'OPEN' && channelUrl) {
          const channel = await ctx.sendbird.groupChannel.getChannel(
            String(channelUrl),
          )
          if (channel) {
            setDetailChannel(channel)
          } else {
            setDetailChannel(undefined)
          }
        } else {
          setDetailChannel(undefined)
        }
      } catch (err) {
        setDetailChannel(undefined)
      }
    }
    getDetailChannel()
    return () => {
      setDetailChannel(undefined)
    }
  }, [channelUrl, ctx?.connectionState, ctx?.sendbird.groupChannel])

  return { detailChannel }
}

export default useSbChannelByUrl

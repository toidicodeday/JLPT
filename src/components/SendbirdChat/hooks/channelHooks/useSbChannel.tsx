import { useCallback } from 'react'
import { useSendbirdContext } from '../../Provider'

const useSbChannel = () => {
  const ctx = useSendbirdContext()

  const createChannelWith = useCallback(
    async (operatorUserIds: string[], invitedUserIds?: string[]) => {
      const newChannel = await ctx?.sendbird.groupChannel.createChannel({
        operatorUserIds,
        invitedUserIds,
        isDistinct: true,
      })
      return newChannel
    },
    [ctx?.sendbird.groupChannel],
  )

  return {
    createChannelWith,
  }
}

export default useSbChannel

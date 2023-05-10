import {
  ApplicationUserListQueryParams,
  ConnectionState,
  User,
} from '@sendbird/chat'
import { useEffect, useState, useCallback } from 'react'
import { useSendbirdContext } from '../../Provider'

const useSbDetailUserById = (userId?: string) => {
  const [userSb, setUserSb] = useState<User>()
  const ctx = useSendbirdContext()

  useEffect(() => {
    const getUserById = async () => {
      if (ctx?.sendbird && userId) {
        const queryParams: ApplicationUserListQueryParams = {
          userIdsFilter: [userId],
        }
        const query = ctx.sendbird.createApplicationUserListQuery(queryParams)

        const [user] = await query?.next()
        if (user) {
          setUserSb(user)
        }
      }
    }
    if (ctx?.connectionState === ConnectionState.OPEN && userId) {
      getUserById()
    }
  }, [ctx?.connectionState, ctx?.sendbird, userId])

  const getUserSb = useCallback(
    async (id: string) => {
      if (ctx?.sendbird) {
        const queryParams: ApplicationUserListQueryParams = {
          userIdsFilter: [id],
        }
        const query = ctx.sendbird.createApplicationUserListQuery(queryParams)
        const [user] = await query?.next()
        return user
      }
    },
    [ctx?.sendbird],
  )

  return { userSb, getUserSb }
}

export default useSbDetailUserById

import { ApplicationUserListQueryParams, User } from '@sendbird/chat'
import { useEffect, useState } from 'react'
import { useSendbirdContext } from '../..'

const useSbApplicationUser = (queryParams?: ApplicationUserListQueryParams) => {
  const [users, setUsers] = useState<User[]>([])

  const ctx = useSendbirdContext()
  useEffect(() => {
    const getListChannel = async () => {
      const params: ApplicationUserListQueryParams = {
        limit: 20,
        ...queryParams,
      }
      const query = ctx?.sendbird?.createApplicationUserListQuery(params)
      if (query?.hasNext) {
        const _users: User[] = await query.next()
        setUsers(_users)
      }
    }
    if (ctx?.connectionState === 'OPEN') {
      getListChannel()
    }
  }, [ctx?.connectionState, ctx?.sendbird, queryParams])

  return { users }
}

export default useSbApplicationUser

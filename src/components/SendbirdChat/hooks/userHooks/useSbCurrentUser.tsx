import { useSendbirdContext } from '../..'

const useSbCurrentUser = () => {
  const ctx = useSendbirdContext()
  const currentUser = ctx?.sendbird.currentUser

  return { currentUser }
}

export default useSbCurrentUser

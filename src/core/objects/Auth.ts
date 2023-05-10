import { KEYS } from '@/constants/keys'
import Cookies from 'js-cookie'
import User from '../../utils/models/user.model'

export const connectedUser = () => {
  const user = Cookies.get('user')
  return user ? (JSON.parse(user as string) as User) : undefined
}

export const isConnectedUser = () => {
  const user = Cookies.get(KEYS.ACCESS_TOKEN)
  return user ? true : false
}

export const setConnectedUser = (user: User) => {
  if (!user) return undefined
  Cookies.set('user', JSON.stringify(user), { expires: 7 })

  return true
}

export const logout = () => {
  Cookies.remove(KEYS.ACCESS_TOKEN)
  window.location.href = '/'
}

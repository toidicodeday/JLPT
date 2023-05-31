import { AdminAccount } from '@/services/authApi/types'

export interface AuthState {
  account: AdminAccount | null
  accessToken: string | null
  refreshToken: string | null
  userMe: any
  authorizeMe: null | AuthorizeMeType
}

export interface AuthorizeMeType {
  [key: string]: boolean
}

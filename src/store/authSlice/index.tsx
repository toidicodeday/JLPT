import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthorizeMeType, AuthState } from './types'
import Cookies from 'js-cookie'
import { KEYS } from '@/constants'
import { AdminAccount } from '@/services/authApi/types'

const initialState: AuthState = {
  account: null,
  accessToken: null,
  refreshToken: null,
  userMe: null,
  authorizeMe: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenReceived: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    saveAccInfo: (state, action: PayloadAction<{ account: AdminAccount }>) => {
      const { account } = action.payload
      state.account = account
    },
    saveAuthorizeMe: (state, action: PayloadAction<AuthorizeMeType>) => {
      state.authorizeMe = action.payload
    },
    loggedOut: state => {
      Cookies.remove(KEYS.ACCESS_TOKEN)
      Cookies.remove(KEYS.REFRESH_TOKEN)
      state.accessToken = null
      state.refreshToken = null
      state.account = null
      state.userMe = null
      // window.location.replace('/login')
    },
    saveUserInfo: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.userMe = action.payload
    },
  },
})

export const {
  tokenReceived,
  loggedOut,
  saveAccInfo,
  saveUserInfo,
  saveAuthorizeMe,
} = authSlice.actions

export default authSlice.reducer

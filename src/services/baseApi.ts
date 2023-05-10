import { isConnectedUser } from './../core/objects/Auth'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { KEYS } from '../constants'
import configData from '../assets/config/production.json'
import { tokenReceived, loggedOut } from '@/store/authSlice'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || configData.HOST_API,
  prepareHeaders: headers => {
    const token =
      Cookies.get(KEYS.ACCESS_TOKEN) || localStorage.getItem(KEYS.ACCESS_TOKEN)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401 && isConnectedUser()) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult: any = await baseQuery(
          '/refreshToken',
          api,
          extraOptions,
        )
        if (refreshResult.data) {
          api.dispatch(tokenReceived(refreshResult.data))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const baseAPI = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  endpoints: () => ({}),
})

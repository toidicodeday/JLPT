import { baseAPI } from '../baseApi'
import {
  GetAccountNotifyResponse,
  GetCountMessageNotSeenResponse,
} from './types'
const TAG = 'NOTI'

export const notiApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      updatePlayerId: builder.mutation({
        query: body => ({
          url: `/account/admin/player-id`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: [TAG],
      }),
      updatePlayerIdWhenSignOut: builder.mutation({
        query: body => ({
          url: `/account/admin/player-id/sign-out`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [TAG],
      }),
      getAccountNotify: builder.query<
        GetAccountNotifyResponse,
        { query: string }
      >({
        query: data => `/message/account/notifications/${data?.query}`,
        providesTags: [TAG],
      }),
      updateStatusSeenNotify: builder.mutation({
        query: data => ({
          url: `/message/account/notifications/seen/${data?.id}`,
          method: 'POST',
        }),
        invalidatesTags: [TAG],
      }),
      getCountAccountNotifyNotSeen: builder.query<
        GetCountMessageNotSeenResponse,
        { query: string }
      >({
        query: data => `/message/account/notifications/not-seen-count`,
        providesTags: [TAG],
      }),
      updateStatusSeenAllNotify: builder.mutation({
        query: data => ({
          url: `/message/account/notifications/seen/bulk-update`,
          method: 'PUT',
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })

export const {
  useUpdatePlayerIdMutation,
  useUpdatePlayerIdWhenSignOutMutation,
  useGetAccountNotifyQuery,
  useUpdateStatusSeenNotifyMutation,
  useGetCountAccountNotifyNotSeenQuery,
  useUpdateStatusSeenAllNotifyMutation,
} = notiApi

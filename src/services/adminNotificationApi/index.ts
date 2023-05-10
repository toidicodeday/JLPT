import { DetailsOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import { AdminNotiType, CreatedNotiType } from './types'

const TAG = 'ADMIN_NOTI'

export const adminNotificationApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getListAdminNotification: builder.query<
        ListWithPageOf<AdminNotiType>,
        { query: string } | null
      >({
        query: data => `/system/admin/notifications-setup/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getOneAdminNotification: builder.query<
        DetailsOf<AdminNotiType>,
        { id: number }
      >({
        query: data => `/system/admin/notifications-setup/${data?.id}`,
        providesTags: [{ type: TAG }],
      }),
      createAdminNoti: builder.mutation<
        DetailsOf<AdminNotiType>,
        CreatedNotiType
      >({
        query: data => ({
          url: `/system/admin/notifications-setup`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateAdminNoti: builder.mutation<
        DetailsOf<AdminNotiType>,
        { id: number; body: Partial<CreatedNotiType> }
      >({
        query: data => ({
          url: `/system/admin/notifications-setup/${data.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteAdminNoti: builder.mutation<
        DetailsOf<AdminNotiType>,
        { id: number }
      >({
        query: data => ({
          url: `/system/admin/notifications-setup/${data.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useCreateAdminNotiMutation,
  useGetListAdminNotificationQuery,
  useGetOneAdminNotificationQuery,
  useUpdateAdminNotiMutation,
  useDeleteAdminNotiMutation,
} = adminNotificationApi

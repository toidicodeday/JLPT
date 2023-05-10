import { DetailsOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'
import { GuestTypeType } from './types'

const TAG = 'CUSTOMERTYPE'

export const customerApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getGuestTypeOps: builder.query<
        SelectOptionType[],
        { query?: string } | void
      >({
        query: data => `/account/guest-type/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (res: ListWithPageOf<GuestTypeType>) => {
          return res.data.map((item: GuestTypeType) => ({
            id: item.id,
            value: item.id,
            label: item.name,
          }))
        },
      }),
      getGuestTypeList: builder.query<
        ListWithPageOf<GuestTypeType>,
        { query?: string } | void
      >({
        query: data => `/account/guest-type/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      createGuestType: builder.mutation<
        DetailsOf<GuestTypeType>,
        { name: string }
      >({
        query: data => ({
          url: '/account/guest-type',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateGuestType: builder.mutation<
        DetailsOf<GuestTypeType>,
        { id?: number; body: { name?: string } }
      >({
        query: data => ({
          url: `/account/guest-type/${data.id}`,
          method: 'PUT',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteGuestType: builder.mutation<
        DetailsOf<GuestTypeType>,
        { id?: number }
      >({
        query: data => ({
          url: `/account/guest-type/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetGuestTypeOpsQuery,
  useGetGuestTypeListQuery,
  useCreateGuestTypeMutation,
  useUpdateGuestTypeMutation,
  useDeleteGuestTypeMutation,
} = customerApi

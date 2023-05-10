import { baseAPI } from '../baseApi'
import { DetailsOf, ListWithPageOf } from '../commonResposntType'
import { AdvertisementType, CreateAdvertismentResponse } from './type'

const TAG = 'ADVERTISEMENT'

export const feeApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAdvertisement: builder.query<
        ListWithPageOf<AdvertisementType>,
        { query?: string } | void
      >({
        query: data => `/system/v1/admin/advertisements/${data?.query || ''}`,
        providesTags: (result, error) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: TAG as 'ADVERTISEMENT',
                  id,
                })),
                { type: TAG, id: 'LIST' },
              ]
            : [{ type: TAG, id: 'LIST' }],
      }),
      getOneAdvertisment: builder.query<
        DetailsOf<AdvertisementType>,
        { id: number }
      >({
        query: data => `/system/v1/admin/advertisements/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createNewAdvertisment: builder.mutation<
        CreateAdvertismentResponse,
        Partial<Omit<AdvertisementType, 'id'>>
      >({
        query: data => ({
          url: `/system/v1/admin/advertisements/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG, id: 'LIST' }],
      }),
      updateAdvertisment: builder.mutation({
        query: data => ({
          url: `/system/v1/admin/advertisements/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      deleteAdvertisment: builder.mutation({
        query: data => ({
          url: `/system/v1/admin/advertisements/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
    }),
  })
export const {
  useGetAdvertisementQuery,
  useGetOneAdvertismentQuery,
  useCreateNewAdvertismentMutation,
  useUpdateAdvertismentMutation,
  useDeleteAdvertismentMutation,
} = feeApi

import { baseAPI } from '../baseApi'
import { DetailsOf, ListWithPageOf } from '../commonResposntType'
import { DiscountType } from './type'

const TAG = 'ADVERTISEMENT'

export const feeApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getDiscount: builder.query<
        ListWithPageOf<DiscountType>,
        { query?: string } | void
      >({
        query: data => `/system/admin/discount/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getOneDiscount: builder.query({
        query: data => `/system/admin/discount/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createDiscount: builder.mutation<
        DetailsOf<DiscountType>,
        Partial<Omit<DiscountType, 'id'>>
      >({
        query: data => ({
          url: `/system/admin/discount/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateDiscount: builder.mutation({
        query: data => ({
          url: `/system/admin/discount/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateStatusDiscount: builder.mutation({
        query: data => ({
          url: `/system/admin/discount/${data?.id}/status`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      calculateDiscount: builder.mutation({
        query: data => ({
          url: `/system/admin/discount/calculate`,
          method: 'POST',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })
export const {
  useGetDiscountQuery,
  useGetOneDiscountQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useUpdateStatusDiscountMutation,
  useCalculateDiscountMutation,
} = feeApi

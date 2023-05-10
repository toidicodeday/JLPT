import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import {
  CustomerRegisterReqType,
  CustomerRegisterResType,
  CustommerType,
} from './types'

const TAG = 'CUSTOMER'

export const customerApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getCustomerList: builder.query<
        ListWithPageOf<CustommerType>,
        { query: string } | void
      >({
        query: data => `/account/guest/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getOneCustomer: builder.query<CustommerType, { id: number }>({
        query: data => `/account/admin/guest/${data.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      updateCustomer: builder.mutation({
        query: data => ({
          url: `/account/admin/guest/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getHistoryCustomer: builder.query({
        query: data => `/order/admin/orders/guest/${data?.id}${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getCustomerOps: builder.query<
        { value: number; label: string; phone: string }[],
        { query: string } | void
      >({
        query: data => `/account/guest/${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (res: ListWithPageOf<CustommerType>) =>
          res.data.map(i => ({
            value: i.id,
            label: i.name,
            phone: i.phone,
          })),
      }),
      createNewCustomer: builder.mutation<
        CustomerRegisterResType,
        CustomerRegisterReqType
      >({
        query: data => ({
          url: '/auth/guest/register',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateStatusBlock: builder.mutation({
        query: data => ({
          url: `/account/admin/guest/block/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetCustomerListQuery,
  useGetOneCustomerQuery,
  useUpdateCustomerMutation,
  useGetHistoryCustomerQuery,
  useGetCustomerOpsQuery,
  useCreateNewCustomerMutation,
  useLazyGetOneCustomerQuery,
  useUpdateStatusBlockMutation,
} = customerApi

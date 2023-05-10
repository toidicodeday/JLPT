import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'
import { DriverType } from './type'

const TAG = 'DRIVER'

export const driverApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getDriver: builder.query<ListWithPageOf<DriverType>, { query: string }>({
        query: data => `/account/driver/admin/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getDriverOps: builder.query<SelectOptionType[], { query?: string }>({
        query: data => `/account/driver/admin/${data?.query}`,
        transformResponse: (response: ListWithPageOf<DriverType>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
        providesTags: [{ type: TAG }],
      }),
      getDriverById: builder.query({
        query: data => `/account/driver/admin/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createTHDriver: builder.mutation({
        query: body => ({
          url: `/account/driver/admin/thanhhung-driver`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      createPartnerDriver: builder.mutation({
        query: body => ({
          url: '/account/driver/admin/partner-driver',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      editDriver: builder.mutation({
        query: ({ id, data }) => ({
          url: `/account/driver/admin/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: [TAG],
      }),
      deleteDriver: builder.mutation({
        query: body => {
          return {
            url: `/account/driver/admin/${body.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: [{ type: TAG }],
      }),
      getDriverEvaluate: builder.query({
        query: data => `/account/driver/admin/get-evaluate${data.query}`,
        providesTags: [{ type: TAG, id: 'evaluate' }],
      }),
      getDriverHistoryEvaluate: builder.query({
        query: data => `/order/admin/orders/history-revenue${data.query}`,
        providesTags: [{ type: TAG, id: 'evaluate' }],
      }),
    }),
  })

export const {
  useGetDriverQuery,
  useGetDriverOpsQuery,
  useGetDriverByIdQuery,
  useGetDriverHistoryEvaluateQuery,
  useCreateTHDriverMutation,
  useCreatePartnerDriverMutation,
  useGetDriverEvaluateQuery,
  useDeleteDriverMutation,
  useEditDriverMutation,
  useLazyGetDriverByIdQuery,
} = driverApi

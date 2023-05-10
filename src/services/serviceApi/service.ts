import { baseAPI } from '../baseApi'
import { DetailsOf, ListWithPageOf } from '../commonResposntType'
import {
  CreateProductAdminResponse,
  FitmentGroupDetailsType,
  FitmentGroupType,
  FitmentItemType,
  GetServiceListQueryRequest,
  GetServiceListQueryResponse,
  MainServiceType,
  ProductType,
  ServiceType,
} from './types'

const TAG = 'SERVICE'

export const serviceApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getServiceList: builder.query<
        ServiceType[],
        GetServiceListQueryRequest | void
      >({
        query: data => `/product/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetServiceListQueryResponse) => {
          return response?.data || []
        },
      }),
      getServiceOps: builder.query<
        { label: string; value: number | string }[],
        { query: string } | void
      >({
        query: data => `/product/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetServiceListQueryResponse) => {
          return (
            response?.data?.map(item => ({
              label: item.name ? item.name : '',
              value: item.id,
            })) || []
          )
        },
      }),
      getMainServiceList: builder.query<MainServiceType[], void>({
        query: () => `/product/main`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetServiceListQueryResponse) => {
          return (
            response?.data?.map((item: ServiceType) => ({
              id: item.id,
              type: item.type || '',
              name: item.name,
            })) || []
          )
        },
      }),
      getFitmentGroupOps: builder.query<
        { label: string; value: number | string }[],
        { query: string } | void
      >({
        query: data => `/product/admin/fitment-group/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: ListWithPageOf<FitmentGroupType>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
      }),
      getFitmentGroupDetails: builder.query<
        FitmentGroupDetailsType,
        { id?: number }
      >({
        query: data => `/product/admin/fitment-group/${data?.id}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: DetailsOf<FitmentGroupDetailsType>) => {
          return response?.data || {}
        },
      }),
      createFitmentItem: builder.mutation<
        DetailsOf<FitmentItemType>,
        {
          name?: string
          calculation_unit?: string
          size?: string
          cost?: number
          fitmentGroupId?: number
        }
      >({
        query: data => ({
          url: `/product/admin/fitment-item`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getProductOps: builder.query<
        { label: string; value: number | string }[],
        { query: string } | void
      >({
        query: data => `/product/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: ListWithPageOf<ProductType>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
      }),
      getFitmentItemDetails: builder.query<FitmentItemType, { id?: number }>({
        query: data => `/product/admin/fitment-item/${data?.id}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: DetailsOf<FitmentItemType>) => {
          return response?.data || {}
        },
      }),
      getFitmentItemList: builder.query<
        ListWithPageOf<FitmentItemType>,
        { query: string } | void
      >({
        query: data => `/product/admin/fitment-item/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getFitmentGroupList: builder.query<
        ListWithPageOf<FitmentGroupType>,
        { query: string } | void
      >({
        query: data => `/product/admin/fitment-group/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getProductAdmin: builder.query<
        ListWithPageOf<ProductType>,
        { query?: string }
      >({
        query: data => `/product/admin/product/${data?.query || ''} `,
        providesTags: [TAG],
      }),
      getOneProductAdmin: builder.query({
        query: data => `/product/admin/product/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createProductAdmin: builder.mutation<
        CreateProductAdminResponse,
        Partial<Omit<ProductType, 'id'>>
      >({
        query: data => ({
          url: `/product/admin/product/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateProductAdmin: builder.mutation({
        query: data => ({
          url: `/product/admin/product/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetServiceListQuery,
  useGetMainServiceListQuery,
  useGetFitmentGroupOpsQuery,
  useGetFitmentGroupDetailsQuery,
  useCreateFitmentItemMutation,
  useGetProductOpsQuery,
  useGetFitmentItemDetailsQuery,
  useLazyGetServiceListQuery,
  useGetServiceOpsQuery,
  useGetFitmentItemListQuery,
  useGetFitmentGroupListQuery,
  useLazyGetFitmentGroupDetailsQuery,
  useGetProductAdminQuery,
  useGetOneProductAdminQuery,
  useUpdateProductAdminMutation,
  useCreateProductAdminMutation,
} = serviceApi

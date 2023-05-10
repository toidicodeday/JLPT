import { DetailsOf } from './../commonResposntType.d'
import {
  GetTransportFeeResponse,
  GetTransportFeeRequest,
  GetExpectFeeRequest,
  GetPromoListResponse,
  CreatePromotionResponse,
  PromoType,
  ExpectFeeResponseType,
  TaxAndFeeResponse,
} from './types'
import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'

const TAG = 'FEE'

export const feeApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getTransportFee: builder.mutation<
        GetTransportFeeResponse,
        GetTransportFeeRequest
      >({
        query: body => ({
          url: '/fee/transport-fee',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getExpectFee: builder.mutation<
        DetailsOf<ExpectFeeResponseType[]>,
        GetExpectFeeRequest
      >({
        query: body => ({
          url: '/fee/expect-fee',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getPromoList: builder.query<
        GetPromoListResponse,
        { query?: string } | void
      >({
        query: data => `/fee/admin-promotion/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getOnePromotion: builder.query({
        query: data => `/fee/admin-promotion/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      getPromotionOps: builder.query<SelectOptionType[], { query?: string }>({
        query: data => `/fee/promotion/${data?.query}`,
        transformResponse: (response: ListWithPageOf<PromoType>) => {
          return (
            response?.data?.map((item: PromoType) => ({
              label: `${item?.name} - ${item?.code}`,
              value: item.id,
            })) || []
          )
        },
      }),
      getPromotionHomeList: builder.query<
        GetPromoListResponse,
        { query?: string } | void
      >({
        query: data => `/fee/promotion/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getTaxAndFeeSetting: builder.query<TaxAndFeeResponse, { query?: string }>(
        {
          query: data =>
            `/system/admin/settings/list-by-key/${data?.query || ''}`,
          providesTags: [{ type: TAG }],
        },
      ),
      updateTaxAndFee: builder.mutation({
        query: data => ({
          url: `/system/admin/settings/update-key`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      createNewPromotion: builder.mutation<
        CreatePromotionResponse,
        Omit<PromoType, 'id'>
      >({
        query: data => ({
          url: `/fee/admin-promotion/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updatePromotion: builder.mutation({
        query: data => ({
          url: `/fee/admin-promotion/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deletePromotion: builder.mutation({
        query: data => ({
          url: `/fee/admin-promotion/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })

export const {
  useGetTransportFeeMutation,
  useGetExpectFeeMutation,
  useGetPromoListQuery,
  useCreateNewPromotionMutation,
  useDeletePromotionMutation,
  useUpdatePromotionMutation,
  useGetOnePromotionQuery,
  useGetPromotionOpsQuery,
  useGetPromotionHomeListQuery,
  useGetTaxAndFeeSettingQuery,
  useUpdateTaxAndFeeMutation,
} = feeApi

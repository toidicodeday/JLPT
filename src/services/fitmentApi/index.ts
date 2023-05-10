import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import {
  FitmentGroupType,
  CreateFitmentItemResponse,
  FitmentItemType,
} from './type'

const TAG = 'FITMENT'

export const fitmentApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getFitmentGroup: builder.query<
        ListWithPageOf<FitmentGroupType>,
        { query?: string } | void
      >({
        query: data => `/product/fitment-group/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getFitmentGroupAdminOps: builder.query<
        { label: string; key: string }[],
        { query: string }
      >({
        query: data => `/product/fitment-group/${data?.query}`,
        transformResponse: (response: ListWithPageOf<FitmentGroupType>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item?.name,
              key: item?.id.toString(),
              value: item?.id,
            })) || []
          )
        },
      }),
      getOneFitmentGroup: builder.query({
        query: data => `/product/fitment-group/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      getFitmentItem: builder.query<
        ListWithPageOf<FitmentItemType>,
        { query?: string } | void
      >({
        query: data => `/product/admin/fitment-item/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getOneFitmentItem: builder.query({
        query: data => `/product/admin/fitment-item/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createFitmentItem: builder.mutation<
        CreateFitmentItemResponse,
        Partial<Omit<FitmentItemType, 'id'>>
      >({
        query: data => ({
          url: `/product/admin/fitment-item/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      uploadFitmentItemExcel: builder.mutation({
        query: payload => {
          const body = new FormData()
          body.append('file', payload.file)

          return {
            url: `/product/admin/fitment-item/import-excel/${payload?.id}`,
            method: 'POST',
            body,
          }
        },
        invalidatesTags: [{ type: TAG }],
      }),
      updateFitementItem: builder.mutation({
        query: data => ({
          url: `/product/admin/fitment-item/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteFitmentItem: builder.mutation({
        query: data => ({
          url: `/product/admin/fitment-item/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })
export const {
  useGetFitmentGroupQuery,
  useGetFitmentGroupAdminOpsQuery,
  useGetFitmentItemQuery,
  useGetOneFitmentGroupQuery,
  useGetOneFitmentItemQuery,
  useUpdateFitementItemMutation,
  useCreateFitmentItemMutation,
  useUploadFitmentItemExcelMutation,
  useDeleteFitmentItemMutation,
} = fitmentApi

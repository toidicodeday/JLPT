import {
  GetPaymentMethodResponse,
  GetPaymentMethodRequest,
  PaymentMethodType,
  PaymentMethodExpectType,
  CreateVideoConfigResponse,
  VideoConfigType,
  CreateVideoConfigRequest,
  SystemFunctionT,
  SystemRoleT,
} from './types'
import { baseAPI } from '../baseApi'
import { DetailsOf, ListWithPageOf } from '../commonResposntType'
import { ROLE_PERMISSION_STATUS } from '@/utils/constant/constant'

const TAG = 'SYSTEM'

export const systemApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      //TODO Get
      getPaymentMethod: builder.query<
        PaymentMethodExpectType[],
        GetPaymentMethodRequest | void
      >({
        query: data => `/system/v1/admin/payments-method/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (apiRes: GetPaymentMethodResponse) => {
          return apiRes?.data?.map(
            (item: PaymentMethodType) =>
              ({
                id: item.id,
                value: item.id,
                label: item.name,
              } || []),
          )
        },
      }),
      getVideoConfig: builder.query<
        ListWithPageOf<VideoConfigType>,
        { query?: string }
      >({
        query: data => `/system/v1/video-config/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      createVideoConfig: builder.mutation<
        CreateVideoConfigResponse,
        CreateVideoConfigRequest
      >({
        query: data => ({
          url: `/system/v1/video-config/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteVideoConfig: builder.mutation({
        query: data => ({
          url: `/system/v1/video-config/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
      getSystemFunction: builder.query<ListWithPageOf<SystemFunctionT>, void>({
        query: () => '/account/system-function/?page=1&limit=10000',
      }),
      getPermissionByRole: builder.query<
        DetailsOf<SystemRoleT[]>,
        { roleId: number }
      >({
        query: payload => `/account/system-roles/${payload.roleId}`,
      }),
      updateRolePermission: builder.mutation<
        any,
        {
          roleId: number
          body: { data: { id: number; status: ROLE_PERMISSION_STATUS }[] }
        }
      >({
        query: payload => ({
          url: `/account/system-roles/${payload.roleId}`,
          body: payload.body,
        }),
      }),
    }),
  })

export const {
  useGetPaymentMethodQuery,
  useGetVideoConfigQuery,
  useCreateVideoConfigMutation,
  useDeleteVideoConfigMutation,
  useGetSystemFunctionQuery,
  useGetPermissionByRoleQuery,
} = systemApi

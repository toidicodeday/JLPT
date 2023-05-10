import {
  CreateVehicleCategoryResponse,
  GetVehicleCategoryRequest,
  GetVehicleCategoryResponse,
  UpdateVehicleCategoryRequest,
  VehicleCategoryType,
} from './types'
import { baseAPI } from '../baseApi'
import { DetailsOf, SelectOptionType } from '../commonResposntType'

const TAG = 'vehicleCategories'
export const vehicleCategoryAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getVehicleCategoryList: builder.query<
        VehicleCategoryType[],
        GetVehicleCategoryRequest | void
      >({
        query: data => `/vehicle/v1/user/vehicle-category/${data?.query || ''}`,
        providesTags: ['vehicleCategories'],
        transformResponse: (response: GetVehicleCategoryResponse) => {
          return response?.data || []
        },
      }),
      getVehicleCategory: builder.query<
        GetVehicleCategoryResponse,
        GetVehicleCategoryRequest | void
      >({
        query: data =>
          `/vehicle/v1/admin/vehicle-category/${data?.query || ''}`,
        providesTags: ['vehicleCategories'],
      }),
      getVehicleCategoryOptions: builder.query<
        SelectOptionType[],
        GetVehicleCategoryRequest | void
      >({
        query: data => {
          return `/vehicle/v1/user/vehicle-category/${data?.query || ''}`
        },

        providesTags: ['vehicleCategories'],
        transformResponse: (response: GetVehicleCategoryResponse) => {
          return (
            response?.data?.map((item: VehicleCategoryType) => ({
              id: item.id,
              value: item.id,
              label: item.name ? item.name : '',
            })) || []
          )
        },
      }),
      getVehicleCategoryOps: builder.query<
        { label: string; value: string | number; raw: any }[],
        GetVehicleCategoryRequest | void
      >({
        query: data => `/vehicle/v1/user/vehicle-category/${data?.query || ''}`,
        providesTags: ['vehicleCategories'],
        transformResponse: (response: GetVehicleCategoryResponse) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
              raw: item,
            })) || []
          )
        },
      }),
      createNewVehicleCategory: builder.mutation<
        CreateVehicleCategoryResponse,
        Partial<Omit<VehicleCategoryType, 'id'>>
      >({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-category/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [TAG],
      }),
      deleteVehicleCategoryById: builder.mutation({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-category/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
      getVehicleCategoryById: builder.query<
        DetailsOf<VehicleCategoryType>,
        { id: number | null }
      >({
        query: data => `/vehicle/v1/admin/vehicle-category/${data?.id}`,
        providesTags: ['vehicleCategories'],
      }),
      updateVehicleCategory: builder.mutation<
        CreateVehicleCategoryResponse,
        UpdateVehicleCategoryRequest
      >({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-category/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [TAG],
      }),
      getVehicleCategoryDetails: builder.query<
        VehicleCategoryType,
        { id?: number }
      >({
        query: data => `/vehicle/v1/admin/vehicle-category/${data?.id}`,
        providesTags: ['vehicleCategories'],
        transformResponse: (response: DetailsOf<VehicleCategoryType>) => {
          return response?.data || {}
        },
      }),
    }),
  })

export const {
  useGetVehicleCategoryListQuery,
  useLazyGetVehicleCategoryListQuery,
  useGetVehicleCategoryQuery,
  useGetVehicleCategoryOpsQuery,
  useDeleteVehicleCategoryByIdMutation,
  useCreateNewVehicleCategoryMutation,
  useGetVehicleCategoryByIdQuery,
  useLazyGetVehicleCategoryByIdQuery,
  useUpdateVehicleCategoryMutation,
  useGetVehicleCategoryOptionsQuery,
  useGetVehicleCategoryDetailsQuery,
} = vehicleCategoryAPI

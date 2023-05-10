import { DetailsOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import {
  VehicleGroupReposone,
  CreateVehicleGroupRequest,
  GetVehicleGroupResponse,
  UpdateVehicleGroupRequest,
  VehicleGroup,
  VehicleGroupDetails,
} from './type'

const TAG = 'VEHICLEGROUP'

export const vehicleGroup = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getVehicleGroupList: builder.query<
        GetVehicleGroupResponse,
        { query: string }
      >({
        query: data => `/vehicle/v1/admin/vehicle-group/${data?.query}`,
        providesTags: [TAG],
      }),
      getVihicleGroupOps: builder.query<
        { label: string; value: string }[],
        { query: string }
      >({
        query: data => `/vehicle/v1/admin/vehicle-group/${data?.query}`,
        transformResponse: (response: ListWithPageOf<VehicleGroup>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
      }),
      createNewVehicleGroup: builder.mutation<
        VehicleGroupReposone,
        CreateVehicleGroupRequest
      >({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-group/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteVehicleGroup: builder.mutation({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-group/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
      getOneVehicleGroup: builder.query<
        DetailsOf<VehicleGroupDetails>,
        { id?: number }
      >({
        query: data => `/vehicle/v1/admin/vehicle-group/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      updateVehicleGroup: builder.mutation<
        VehicleGroupReposone,
        UpdateVehicleGroupRequest
      >({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle-group/${data?.id}`,
          method: 'PATCH',
          body: data?.body,
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })

export const {
  useGetVehicleGroupListQuery,
  useGetVihicleGroupOpsQuery,
  useCreateNewVehicleGroupMutation,
  useDeleteVehicleGroupMutation,
  useGetOneVehicleGroupQuery,
  useUpdateVehicleGroupMutation,
  useLazyGetOneVehicleGroupQuery,
} = vehicleGroup

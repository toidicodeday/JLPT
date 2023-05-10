import { DetailsOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'
import {
  CreateVehicleRequest,
  CreateVehicleResponse,
  GetOrderVehicleListRequest,
  GetVehicleRequest,
  OrderVehicleType,
  VehicleDetailsType,
  VehicleType,
} from './type'

const TAG = 'VEHICLE'

export const vehicleTypeApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getVehicleList: builder.query<
        ListWithPageOf<VehicleType>,
        GetVehicleRequest
      >({
        query: data => `/vehicle/v1/admin/vehicle/${data?.query}`,
        providesTags: [TAG],
      }),
      getVehilcleOps: builder.query<
        SelectOptionType[],
        GetVehicleRequest | void
      >({
        query: data => `/vehicle/v1/admin/vehicle/${data?.query}`,
        providesTags: [{ type: TAG, id: 'options' }],
        transformResponse: (apiRes: ListWithPageOf<VehicleType>) => {
          return apiRes.data.map((item: VehicleType) => ({
            label: item.licensePlatese || '',
            value: item.id,
          }))
        },
      }),
      getOneVehicle: builder.query<
        DetailsOf<VehicleDetailsType>,
        { id?: number }
      >({
        query: data => `/vehicle/v1/admin/vehicle/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      getHistory: builder.query<ListWithPageOf<VehicleType>, GetVehicleRequest>(
        {
          query: data => `/account/vehicle-history/${data?.query}`,
          providesTags: [TAG],
        },
      ),
      createNewVehicle: builder.mutation<
        CreateVehicleResponse,
        CreateVehicleRequest
      >({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateVehicle: builder.mutation({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteVehicleById: builder.mutation({
        query: data => ({
          url: `/vehicle/v1/admin/vehicle/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
      getVehiclesListForOrder: builder.query<
        ListWithPageOf<OrderVehicleType>,
        GetOrderVehicleListRequest
      >({
        query: data =>
          `/vehicle/v1/admin/vehicle/find-by-location/${data?.orderCode}${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetVehicleListQuery,
  useGetVehilcleOpsQuery,
  useGetOneVehicleQuery,
  useCreateNewVehicleMutation,
  useUpdateVehicleMutation,
  useGetHistoryQuery,
  useDeleteVehicleByIdMutation,
  useGetVehiclesListForOrderQuery,
} = vehicleTypeApi

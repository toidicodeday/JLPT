import {
  OrderDetailsType,
  UpdateOrderSignedContractRequestType,
  UpdateOrderSignedLiquidationContractRequestType,
} from '@/services/orderApi/types'
import {
  CreateLocationDetailsRequest,
  CreateLocationDetailsResponse,
  CreateOrderBillRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  createTempOrderRequest,
  GetOrderBillResponse,
  GetOrderDetailsRequest,
  GetOrderDetailsResponse,
  GetOrderListRequest,
  GetOrderListResponse,
  ModifyOrderLocationRequest,
  OrderBillType,
  OrderHistoryType,
  OrderType,
  OrderVehiclesType,
  UpdateBillDetailsRequest,
  UpdateBillDetailsResponse,
  UpdateOrderDetailsRequestType,
} from './types'
import { baseAPI } from '../baseApi'

const TAG = 'ORDER'

export const orderApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      createNewOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>(
        {
          query: data => ({
            url: `/order/admin/orders`,
            method: 'POST',
            body: data,
          }),
          invalidatesTags: [{ type: TAG }],
        },
      ),
      createTempOrder: builder.mutation<
        DetailsOf<OrderType>,
        createTempOrderRequest
      >({
        query: data => ({
          url: `/order/admin/orders/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateOrderBill: builder.mutation<
        UpdateBillDetailsResponse,
        UpdateBillDetailsRequest
      >({
        query: data => ({
          url: `/order/bills/${data.id}`,
          method: 'PUT',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      createOrderLocation: builder.mutation<
        CreateLocationDetailsResponse,
        CreateLocationDetailsRequest
      >({
        query: data => ({
          url: `/order/orders-location`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      modifiedOrderLocation: builder.mutation<
        CreateLocationDetailsResponse,
        ModifyOrderLocationRequest
      >({
        query: data => ({
          url: `/order/orders-location/${data.id}`,
          method: 'PUT',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteOrderLocation: builder.mutation<
        DetailsOf<OrderType>,
        { id?: number }
      >({
        query: data => ({
          url: `/order/orders-location/${data.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getOrderList: builder.query<GetOrderListResponse, GetOrderListRequest>({
        query: data => `/order/admin/orders/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getOrderDetails: builder.query<
        GetOrderDetailsResponse,
        GetOrderDetailsRequest
      >({
        query: data => `/order/admin/orders/${data?.code}`,
        providesTags: (_, code) => [{ type: TAG, code }],
      }),
      updateOrderDetails: builder.mutation<
        DetailsOf<OrderType>,
        UpdateOrderDetailsRequestType
      >({
        query: data => ({
          url: `/order/admin/orders/${data.id}`,
          method: 'PUT',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      createOrderBills: builder.mutation<any, CreateOrderBillRequest>({
        query: data => ({
          url: `/order/bills`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getOrderBills: builder.query<OrderBillType, { id: number }>({
        query: data => `/order/bills/${data?.id}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetOrderBillResponse) => {
          return response?.data
        },
      }),
      assignListDrivers: builder.mutation<
        { status: number },
        {
          orderCode?: string
          body:
            | { orderVehicleChooses: { vehicleId: number }[] }
            | {
                orderVehicleCategoryChooses: {
                  vehicleCategoryId: number
                  quantity: number
                }[]
              }
        }
      >({
        query: data => ({
          url: `/order/admin/orders/assign-list-driver/${data.orderCode}`,
          method: 'POST',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      removeDriver: builder.mutation<
        { status: number },
        {
          vehicleChooseId: number
        }
      >({
        query: data => ({
          url: `/order/admin/orders/remove-driver/${data.vehicleChooseId}`,
          method: 'POST',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getOrderHistory: builder.query<OrderHistoryType[], { query: string }>({
        query: data => `/order/admin/order-history/${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: ListWithPageOf<OrderHistoryType>) => {
          return response?.data
        },
      }),
      getOrderVehicleLocation: builder.query<
        OrderVehiclesType[],
        GetOrderDetailsRequest
      >({
        query: data => `/order/admin/orders/${data?.code}`,
        providesTags: [{ type: TAG }],
        transformResponse: (res: GetOrderDetailsResponse) =>
          res?.data?.vehicles,
      }),
      copyOrderDetails: builder.mutation<
        { status: number; data: OrderDetailsType },
        {
          oldOrderCode?: string
          newOrderCode?: string
        }
      >({
        query: body => ({
          url: '/order/admin/orders/duplicate',
          method: 'post',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateSignedContract: builder.mutation<
        DetailsOf<OrderType>,
        UpdateOrderSignedContractRequestType
      >({
        query: body => ({
          url: '/order/admin/orders/update-signed-contracts-image',
          method: 'post',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateLiquidationContract: builder.mutation<
        DetailsOf<OrderType>,
        UpdateOrderSignedLiquidationContractRequestType
      >({
        query: body => ({
          url: '/order/admin/orders/update-contracts-image',
          method: 'post',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useCreateNewOrderMutation,
  useUpdateOrderBillMutation,
  useCreateOrderLocationMutation,
  useGetOrderListQuery,
  useCreateTempOrderMutation,
  useGetOrderDetailsQuery,
  useModifiedOrderLocationMutation,
  useUpdateOrderDetailsMutation,
  useDeleteOrderLocationMutation,
  useCreateOrderBillsMutation,
  useAssignListDriversMutation,
  useRemoveDriverMutation,
  useGetOrderHistoryQuery,
  useLazyGetOrderDetailsQuery,
  useGetOrderVehicleLocationQuery,
  useCopyOrderDetailsMutation,
  useUpdateSignedContractMutation,
  useUpdateLiquidationContractMutation,
} = orderApi

import { baseAPI } from '../baseApi'
import {
  GeneralStatisticType,
  OrderStatisticType,
  RevenueStatisticType,
  StatisticOf,
} from './types'

const TAG = 'STATISTIC'

export const dashboardApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getOrderStatistic: builder.query<
        OrderStatisticType[],
        { query: string } | void
      >({
        query: data => `/order/admin/statistic/count-order${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: StatisticOf<OrderStatisticType[]>) =>
          response.data,
      }),
      getRevenueStatistic: builder.query<
        RevenueStatisticType[],
        { query: string } | void
      >({
        query: data =>
          `/order/admin/statistic/revenue-order${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: StatisticOf<RevenueStatisticType[]>) =>
          response.data,
      }),
      getGeneralStatistic: builder.query<GeneralStatisticType, void>({
        query: data => '/order/admin/statistic/',
        providesTags: [{ type: TAG }],
      }),
    }),
  })
export const {
  useGetGeneralStatisticQuery,
  useGetOrderStatisticQuery,
  useGetRevenueStatisticQuery,
} = dashboardApi

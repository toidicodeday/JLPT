import { ListWithPageOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import {
  IncomeReportTransType,
  IncomeReportType,
  IncomeStatisticTransType,
  IncomeStatisticType,
  PartnerIncomeReportTransType,
  PartnerInconeReportType,
} from './types'

const TAG = 'REPORT'

export const reportApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getIncomeReport: builder.query<
        ListWithPageOf<IncomeReportTransType>,
        { query: string } | void
      >({
        query: data => `/order/admin/reports/revenue/${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: ListWithPageOf<IncomeReportType>) => ({
          data: response.data.map(item => ({
            ...item,
            count_cn: Number(item.count_cn),
            count_tx: Number(item.count_tx),
            sum_cn: item.sum_cn ? Number(item.sum_cn) : 0,
            sum_tx: item.sum_tx ? Number(item.sum_tx) : 0,
            totalIncome: Number(item.sum_cn) + Number(item.sum_tx),
          })),
          pages: response.pages,
          total: response.total,
        }),
      }),
      getIncomeStatistic: builder.query<
        IncomeStatisticTransType,
        { query: string } | void
      >({
        query: data => `/order/admin/reports/revenue/total${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: IncomeStatisticType) => ({
          count_tx: Number(response.count_tx),
          count_cn: Number(response.count_cn),
          sum_revenue: response.sum_revenue ? Number(response.sum_revenue) : 0,
        }),
      }),
      getPartnerIncomeReport: builder.query<
        ListWithPageOf<PartnerIncomeReportTransType>,
        { query: string } | void
      >({
        query: data => `/order/admin/reports/revenue-driver/${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (
          response: ListWithPageOf<PartnerInconeReportType>,
        ) => ({
          data: response.data.map(item => ({
            ...item,
            count_cn: Number(item.count_cn),
            count_tx: Number(item.count_tx),
            sum_cn: item.sum_cn ? Math.round(Number(item.sum_cn)) : 0,
            sum_tx: item.sum_tx ? Math.round(Number(item.sum_tx)) : 0,
            sum_driver_income: item.sum_driver_income
              ? Math.round(Number(item.sum_driver_income))
              : 0,
            sum_discount: item.sum_discount
              ? Math.round(Number(item.sum_discount))
              : 0,
          })),
          pages: response.pages,
          total: response.total,
        }),
      }),
    }),
  })

export const {
  useGetIncomeReportQuery,
  useGetIncomeStatisticQuery,
  useLazyGetIncomeStatisticQuery,
  useGetPartnerIncomeReportQuery,
} = reportApi

export type IncomeReportType = {
  date: string
  count_cn: string
  count_tx: string
  sum_cn: string | null
  sum_tx: string | null
}

export type IncomeReportTransType = {
  date: string
  count_cn: number
  count_tx: number
  sum_cn: number
  sum_tx: number
  totalIncome: number
}

export type IncomeStatisticType = {
  count_tx: string
  count_cn: string
  sum_revenue: string | null
}

export type IncomeStatisticTransType = {
  count_tx: number
  count_cn: number
  sum_revenue: number
}

export type PartnerInconeReportType = {
  id: number
  name: string
  working_area_id: number | null
  working_area_name: string | null
  count_cn: string
  count_tx: string
  sum_cn: string | null
  sum_tx: string | null
  sum_driver_income: string | null
  sum_discount: string | null
}

export type PartnerIncomeReportTransType = {
  id: number
  name: string
  working_area_id: number | null
  working_area_name: string | null
  count_cn: number
  count_tx: number
  sum_cn: number
  sum_tx: number
  sum_driver_income: number
  sum_discount: number
}

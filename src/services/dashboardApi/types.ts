export type OrderStatisticType = {
  date: string
  count: number
}

export type RevenueStatisticType = {
  date: string
  total: number
}

export type GeneralStatisticType = {
  guest: number
  guest_by_area: {
    name: string
    count: number
  }[]
  order: number
  order_by_service_id: {
    count_cn: string
    count_tx: string
  }
  driver: number
  driver_by_unit_key: {
    count_partner: number
    count_staff: number
  }
}

export type StatisticOf<T> = {
  data: T
  total: number | null
}

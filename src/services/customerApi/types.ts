import { GuestTypeType } from '../guestTypeApi/types'

export type CustommerType = {
  id: number
  name: string
  phone: string
  email: string
  address: string
  dob: string
  gender: string
  cccd: string
  status: number
  player_id: string
  guestTypeId: number
  addressId: number | null
  created_at: string | null
  deleted_at: string | null
  guestType: GuestTypeType | null
  notify: boolean
  updated_at: string
  countOrder: number
  workingArea: any
  isBlocked: boolean
}

export type HistoryCustomerType = {
  data: any
  pages: number
  total: number
  totalMoney: number
}

export type CustomerRegisterResType = {
  account: {
    addressId: number | null
    email: string | null
    guestTypeId: number
    id: number
    name: string
    phone: string
    status: number
  }
  credentail: {
    id: number
    key: string
    provider: string
    ref: string
    refId: number
    status: number
  }
}

export type CustomerRegisterReqType = {
  email?: string
  name: string
  phone: string
  password: string
  address?: string
  addressId?: number
}

export type PaymentMethodType = {
  id: number
  status: string
  createdAt: string
  deletedAt: string | null
  name: string
  sort: string | null
  updatedAt: string | null
}

export type GetPaymentMethodRequest = {
  query?: string
}

export type GetPaymentMethodResponse = {
  data: PaymentMethodType[]
  total: number
  pages: number
}

export type PaymentMethodExpectType = {
  id: number
  value: number
  label: string
}

export type GetPaymentMethodExpectType = {
  data: PaymentMethodExpectType[]
  total: number
  pages: number
}

export type VideoConfigType = {
  url: string
  type?: string
  sort?: string
  deletedAt?: string
  id: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateVideoConfigResponse = {
  data: Array<VideoConfigType>
  status: number
}

export type CreateVideoConfigRequest = {
  url: string
  type?: string
}

export type SystemFunctionT = {
  createdAt: string
  deletedAt: string
  id: number
  key: string
  name: string
  sort: number | null
  status: string
  systemActions: {
    actionKey: string
    createdAt: string
    deletedAt: null
    id: number
    name: string
    sort: number | null
    status: string
    systemFunctionId: number
    updatedAt: string
  }[]
}

export type SystemRoleT = {
  id: number
  key: string
  name: string
  systemActions: {
    actionKey: string
    canExecute: boolean
    id: number
    name: string
    systemFunctionId: number
  }[]
}

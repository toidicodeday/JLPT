export type AdminNoti = {
  id?: string
  status?: number
  createdAt?: string
  sendedAt?: string
  title?: string
  content?: string
  via?: string
  location?: string
  receiver?: NotiReceiver[]
}

export type NotiReceiver = {
  id?: string
  name?: string
  phone?: string
  address?: string
  avatar?: string
}

export type UpdatePlayerRequestType = {
  player_id: string
  currentPlayerId?: string
}

export type GetAccountNotifyResponse = {
  data: AccountNotifyResponse[]
  pages: number
  total: number
  status: number
}

export type GetCountMessageNotSeenResponse = {
  data: {
    count: number
  }
  status: number
}

export type AccountNotifyResponse = {
  id: number
  status: string
  sort?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  ref?: string
  refId?: number
  title?: string
  content: {
    code: string
  }
}

export type ContentNotiType = {
  code?: string
  orderStatus?: number
  serviceType?: any
  content?: string
  type?: string
  id?: number
  promoCode?: string
  driverId?: number
  vehicleId?: number
}

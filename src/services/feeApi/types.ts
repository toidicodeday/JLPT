export type GetTransportFeeRequest = {
  vehicleCategoryId?: number
  distance?: number
}

export type GetTransportFeeResponse = {
  data?: number
}

export type ServiceFeeType = {
  key?: number | string
  name?: string | null
  quantity?: number | null
  price?: number
  type?: string
}

export type GetExpectFeeRequest = {
  promoCode?: string
  orderCode?: string
  expectFee?: ServiceFeeType[]
}

export type ExpectFeeResponseType = {
  key: number | string
  type?: string | null
  name: string | null
  price: number
  quantity: number
}

export type GetPromoListResponse = {
  status: number
  data: PromoType[]
  pages: number
  total: number
}

export type PromoType = {
  id: number
  status?: string
  sort?: number | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  code: string
  name: string
  discount: string
  discountType: string
  maxDiscount: string
  applyFrom?: string
  applyTo?: string
  quantity?: number
  workingAreaId: number
  notify?: boolean
  minPrice?: string
  products?: []
  guestTypes?: []
  bannerUrl?: string
}

export type CreatePromotionResponse = {
  data: PromoType
  status: number
}

export type TaxAndFeeResponse = {
  settings: {
    VAT: number
    WAY_BACK_FEES: number
    HARD_ROAD_FEES: number
  }
  updatedAccount: {
    id: number
    name: string | null
    phone: string | null
    email: string | null
    status: number | null
    addressId: string | null
    managingAreaId: string | null
  }
  updatedAt: string
}

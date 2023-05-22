export type CreateOrderRequest = {
  serviceId?: number
  status?: number
  driverArrivedDate?: string
  startDate?: string
  completeDate?: string
  payType?: number
  payDetailType?: number
  failReason?: string
  orderVehicleCategories?: { id: number }[]
  produce?: { id: number }[]
  orderFitmentItems?: { fitmentItemId: number; quantity: number }[]
  orderCancelReasons?: { reason: string }[]
  pickupType: number
  pickupDate: string | null
  distance?: number
  price?: number
  surveyLocation?: string
  contactHuman?: string
  telephoneContact?: string
  surveyAppointmentTime?: string
  type?: string
}

export type OrderResponseDataType = {
  actualFee?: number | null
  applicationEvaluateSettingId?: any
  applicationGuestReviews?: any
  applicationRateStar?: any
  code: string
  completeDate?: any
  contactHuman?: string
  createdAt: string
  createdBy?: any
  deletedAt?: any
  deletedBy?: any
  distance: number
  driverArrivedDate?: any
  driverHandlingId?: any
  expectedFee?: any
  failReason?: any
  guestId?: any
  payDetailType: number
  payType: number
  pickupDate?: any
  pickupType: number
  price: number
  serviceEvaluateSettingId?: any
  serviceGuestReviews?: any
  serviceId?: any
  serviceRateStar?: any
  startDate?: any
  status: number
  surveyAppointmentTime?: any
  surveyLocation?: any
  telephoneContact?: any
  type: string
  updatedAt: string
  updatedBy?: any
}

export type CreateOrderResponse = {
  data: OrderResponseDataType
  status: number
}

export type BillDetailsType = {
  key?: number | null | string
  price?: number | null
  quantity?: number | null
  name?: string | null
  type?: string | null
}

export type UpdateBillDetailsRequest = {
  id?: number | null
  body: {
    orderCode?: string
    note?: string
    promotionCode?: string
    billDetails?: BillDetailsType[]
  }
}

export type UpdateOrderDetailsRequestType = {
  id?: string | null
  body: Partial<UpdateOrderBodyType>
}

export type UpdateOrderBodyType = {
  actualFee: number | null
  contactHuman: string | null
  distance: number | null
  expectedFee: number | null
  orderFitmentItems: { fitmentItemId: number }[]
  orderVehicleCategories: { id: number }[]
  payDetailType: number
  payType: number
  pickupDate: string
  pickupType: number
  price: number
  products: { id: number }[]
  serviceId: number
  startDate: string
  status: number
  surveyAppointmentTime: string
  surveyLocation: any
  telephoneContact: string | null
  type: string
  driverFinding: boolean
  promoCode: string | null
  vehicleCapId: number | null
  pickupDriverDate: string | null
  isPayment: boolean
  isQuotation: boolean
  signatureUrl: string | null
  signedContract: boolean
  contractUrl: string | null
  bill: {
    id?: number | null
    note: string
    type: string
    billDetails: {
      key: string | number
      name: string | null
      type?: string | null
      price: number
      quantity: number
    }[]
  }
  assignListDriver: {
    orderVehicleChooses?: { vehicleId: number }[]
    orderVehicleCategoryChooses?: {
      vehicleCategoryId: number
      quantity: number
    }[]
  }
  orderCancelReasons: { reason: string }[]
  fitmentGroupId: number
  guestId: number | null
  salerId: number | null
  labor?: string
  contractLiquidationUrl: string
  salerPhone: string | null
  contractLiquidationStaffId?: number
  contractLiquidationPrice?: number
  paymentDelayReason?: string
  supporterPhoneNumber: string | null
}

export type UpdateBillDetailsResponse = any

export type CreateLocationDetailsResponse = any

export type CreateLocationDetailsRequest = {
  orderCode?: string
  type?: number
  placeId?: string
  location?: string
  locationDetail?: string
  contact?: string
  phone?: string | null
  note?: string
  status?: number
  latitude?: number
  longitude?: number
  sort?: number | null
}

export type OrderType = {
  code: string
  serviceId: number
  expectedFee: any
  actualFee: any
  status: number
  driverArrivedDate: string | null
  startDate: string | null
  completeDate: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  createdBy: number
  updatedBy: number | null
  deletedBy: number | null
  payType: number | null
  payDetailType: number | null
  guestId: number
  driverHandlingId: number | null
  failReason: string | null
  type: string
  surveyLocation: string | null
  contactHuman: string | null
  telephoneContact: string | null
  surveyAppointmentTime: string | null
  pickupType: number | null
  pickupDate: string | null
  distance: number | null
  price: number | null
  applicationEvaluateSettingId: number | null
  applicationRateStar: any
  applicationGuestReviews: any
  serviceEvaluateSettingId: any
  serviceRateStar: any
  serviceGuestReviews: any
  promoCode: string | null
  products: any
  guest: {
    id: number
    name: string
    email: string
    address: string
    dob: string
    gender: string
    cccd: string
    status: number
    player_id: string
    phone?: string
  }
  orderVehicleCategories: any
  orderDriverReceipt: any
  orderLocationStart: OTLocationType
  orderLocationEnd: OTLocationType
  orderCancelReasons: CancelReasonType[]
  orderCancelByRef: string
  orderCancelBy: {
    id: number
    name: string
    phone: string
    email: string
    status: number
    addressId: number | null
    managingAreaId: number | null
    gender: string
    player_id: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }
  enoughDriver: boolean
  driverFinding: boolean
  orderVehicleChooses: OrderVehicleChoosesType[]
  labor?: string
  createdByRef?: string
  createdByAdmin?: {
    id: number
    name: string
  }
  createdByGuest?: {
    id: number
    name: string
    phone?: string
  }
}

export type OrderVehicleChoosesType = {
  id: number
  orderCode: string
  vehicleId?: number
  vehicle?: {
    id: number
    driver: {
      id: number
      name: string
    }
    vehicleCode?: string
  }
}

export type CancelReasonType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  orderCode: string
  reason: string
}

export type OTLocationType = {
  id: number
  orderCode: string
  type: number
  placeId: string
  location: string
  locationDetail: string | null
  contact: string | null
  phone: string | null
  status: number
  latitude: string
  longitude: string
  note: string | null
  created_at: string
  sort: number | null
}

export type GetOrderListResponse = {
  total: number
  pages: number
  status: number
  data: OrderType[]
}

export type GetOrderListRequest = {
  query: string
}

export type createTempOrderRequest = {
  serviceId?: number
}

export type GetOrderDetailsResponse = {
  status: number
  data: OrderDetailsType
}

export type GetOrderDetailsRequest = {
  code?: string
}

export type OrderDetailsType = {
  id: string | null
  actualFee: number | null
  applicationEvaluateSettingId: number | null
  applicationGuestReviews: any
  applicationRateStar: any
  bills: OrderBillType[]
  code: string
  completeDate: string | null
  contactHuman: string | null
  createdAt: string
  createdBy: number | null
  deletedAt: string | null
  deletedBy: string | null
  distance: number | null
  driverArrivedDate: string | null
  driverHandlingId: number | null
  expectedFee: number | null
  failReason: string | null
  guestId: number | null
  orderCancelReasons: {
    createdAt: string
    deletedAt: string | null
    id: number
    orderCode: string
    reason: string
    sort: number | null
    status: string
    updatedAt: string
  }[]
  orderFitmentItems: ParentOrderFitmentType[]
  orderLocations: OrderLocationType[]
  payDetailType: number | null
  payType: number | null
  pickupDate: string | null
  pickupType: number | null
  price: number | null
  products: OrderProductType[]
  salerId: number | null
  salerPhone: string | null
  serviceEvaluateSettingId: number | null
  serviceGuestReviews: string | null
  serviceId: number
  serviceRateStar: any
  startDate: string | null
  status: number
  service: any | null
  surveyAppointmentTime: any
  surveyLocation: any
  telephoneContact: string | null
  type: string
  updatedAt: string
  updatedBy: string | null
  vehicles: OrderVehiclesType[]
  driverFinding: boolean
  orderVehicleChooses: VehicleChooseType[]
  orderVehicleCategoryChooses: OrderVehicleCategoryChooseType[]
  deliveryHistory: deliveryHistoryType
  promoCode: string | null
  vehicleCapId: number | null
  pickupDriverDate: string | null
  orderCancelBy: {
    address: string
    cccd: string
    createdAt: string
    deletedAt: string | null
    dob: string
    email: string
    gender: string
    id: number
    name: string
    phone: string
    player_id: string
    status: number
    updatedAt: string
  }
  orderCancelByRef: 'admin' | 'guest' | 'driver'
  isPayment: boolean
  isQuotation: boolean
  signatureUrl: string | null
  signedContract: boolean
  contractUrl: string | null
  fitmentGroupId: number | null
  enoughDriver: boolean
  audioRecords: string[] | null
  orderDriverVehicles: OrderDriverVehicleType[]
  labor?: string
  contractLiquidationUrl: string | null
  signatureLiquidationUrl: string | null
  signedContractLiquidation: boolean
  contractLiquidationPrice?: number
  paymentDelayReason?: string
  contractLiquidationStaffId?: number
  taximetAtDestinationPoint: number | null
  taximetAtLastPoint: number | null
  taximetAtOriginPoint: number | null
  taximetPrice: number | null
  contractType: number
  supporterPhoneNumber: string | null
  imageSignedContracts: string[]
  imageContracts: string[]
}

export type OrderProductType = {
  id: number
  icon: string
  desc: string
  name: string
  parentId: number
  price: number
  status: number
  type: string
}

export type OrderVehicleCategoryChooseType = {
  createdAt: string
  deletedAt: string | null
  id: number
  orderCode: string
  quantity: number
  sort: number | null
  status: string
  updatedAt: string
  vehicleCategoryId: number
}

export type deliveryHistoryType = {
  driverArrivePickupLocation: Date | null
  driverReceiptTime: Date | null
  driverStartOrder: Date | null
  driverStartToArrivePickupLocation: Date | null
  sendRequestTime: Date | null
}

export type VehicleChooseType = {
  createdAt: string
  deletedAt: string | null
  id: number
  orderCode: string
  sort: number | null
  status: string
  updatedAt: string
  vehicleId: number
  driverStatus?: number
  vehicle: {
    categoryId: number
    createdAt: string
    deletedAt: string | null
    driver: {
      address: string
      cccd: string
      changedPasswordFirstTime: boolean
      dob: string
      gender: string
      id: number
      name: string
      phone: string
      player_id: number | string | null
      status: number
    }
    driverId: number
    id: number
    lastLat: number | null
    lastLng: number | null
    licensePlatese: string
    ownerTypeId: number | null
    sort: number | null
    status: string
    systemVehicleType: string
    updatedAt: string
    workingAreaId: number
  }
}

export type OrderVehiclesType = {
  categoryId: number
  createdAt: string
  deletedAt: string | null
  driverId: number
  id: number
  lastLat: number | null
  lastLng: number | null
  licensePlatese: string
  ownerTypeId: number
  sort: number | null
  status: string
  systemVehicleType: string
  updatedAt: string
  workingAreaId: number
}

export type OrderLocationType = {
  id: number
  orderCode: string
  type: number
  placeId: string
  location: string
  locationDetail: string
  contact: string
  phone: string
  status: number
  latitude: number
  longitude: number
  note: string | null
  created_at: string
  sort: number
}

export type OrderDriverVehicleType = {
  createdAt: string
  deletedAt: string | null
  driverId: number
  id: number
  orderCode: string
  sort: number | null
  status: string
  updatedAt: string
  vehicleId: number
}

export type ModifyOrderLocationRequest = {
  id: number
  body: CreateLocationDetailsRequest
}

export type CreateOrderBillRequest = {
  orderCode?: string
  note?: string
  type?: string
  promotionCode?: string
  billDetails: BillDetailsType[]
}

export type GetOrderBillResponse = {
  status: number
  data: OrderBillType
}

export type OrderBillType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  orderCode: string
  type: 'EXPT' | 'ACTL' | 'QTTN'
  promoCode: string | null
  note: string | null
  billDetails: OrderBillDetailsType[]
  driverId?: number
  discount?: number //ck thanh hung
  driverIncome?: number //thuc thu tai xe
  incomeTaxFee?: number //thu nhap ca nhan
  totalPrice?: number //tong ck + thuc thu
  usageFee?: number
  vat?: number
  imageProof?: string[]
}

export type OrderBillDetailsType = {
  id: number
  status: number
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  billId: number
  key: string
  name: string | null
  quantity: number | null
  price: number
  type: string
}

export type ChildOrderFitmentItemType = {
  calculation_unit: string
  cost: string
  createdAt: string
  deletedAt: string | null
  fitmentGroupId: number
  id: number
  name: string
  size: string
  sort: number | null
  status: string
  updatedAt: string
}

export type ParentOrderFitmentType = {
  createdAt: string
  deletedAt: string | null
  fitmentItem: ChildOrderFitmentItemType
  fitmentItemId: number
  id: number
  orderCode: string
  quantity: number
  sort: number | null
  status: string
  updatedAt: string
}

export type OrderHistoryType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  orderStatus: number
  listDriverIds: number[]
  orderCode: string
  content: { location: { new: string; old: string } }
}

export type UpdateOrderSignedContractRequestType = {
  orderCode?: string
  imageSignedContracts: string[]
}

export type UpdateOrderSignedLiquidationContractRequestType = {
  orderCode?: string
  imageContracts: string[]
}

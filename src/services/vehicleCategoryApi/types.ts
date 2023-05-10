import { VehicleType } from '../vehicleApi/type'

export type VehicleCategoryType = {
  id: number
  status?: string
  sort?: number | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  name: string
  height?: number
  width?: number
  length?: number
  capacity?: number
  volumn?: number
  workingAreaId?: number
  description?: string
  vehicles?: VehicleType[]
  vehicleFee: VehicleFeeType
}

export type VehicleFeeType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  waitingFee: number | null
  nightFee: number | null
  extendHourFee: number | null
  extendKmFee: number | null
  returnFee: number | null
  vehicleCategoryId: number
  feeDetails: VCFeeDetailsType[]
}

export type VCFeeDetailsType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  feeId: number
  from: string
  to: string
  type: string
  price: string
  areaSetup: string
}

export type GetVehicleCategoryResponse = {
  data: Array<VehicleCategoryType>
  pages: number
  total: number
}

export type CreateVehicleCategoryResponse = {
  data: VehicleCategoryType
  status: number
}

export type GetVehicleCategoryRequest = {
  query?: string
}
export type UpdateVehicleCategoryRequest = {
  id: number
  body: Partial<Omit<VehicleCategoryType, 'id'>>
}

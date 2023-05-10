import { VehicleType } from '../vehicleApi/type'

export type DriverType = {
  address: string
  cccd: string
  changedPasswordFirstTime: boolean
  dob: string | null
  gender: string
  id: number
  name: string
  phone: string
  player_id: number | null
  status: 1
  vehicles?: VehicleType[]
  contractId?: number | null
  cccdfrontImg?: string
  cccdbackImg?: string
  licensePlateImg?: string
  driverLicenseImg?: string
  vehicleRegistrationImg?: string
  unitKey?: string
  workingAreaId?: number | null
  driverWalletMoney?: number | null
  vehicleCategoryId?: number | null
  applyFrom?: string | null
  applyTo?: string | null
  vehicleWorkingAreaId: number | null
  createdAt: string
  notify: boolean
}

export type GetDriverListResponse = {
  data: Array<DriverType>
  pages: number
  total: number
}

export type GetDriverListRequest = {
  query: string
}

export type GetOneDriverResponse = DriverType

export type GetOneDriverRequest = {
  id: number
}

export type ActiveDriverRequest = {
  driverId: number
}

export type RejectDriverRequest = {
  driverId: number
}

export type ActiveDriverResponse = {
  status: number
}

export type RejectDriverResponse = {
  status: number
}

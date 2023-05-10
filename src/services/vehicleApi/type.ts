import { DriverType } from '../driverApi/type'
import { VehicleTypeType } from '../vehicleTypeApi/type'

export type VehicleType = {
  categoryId?: number
  createdAt?: string
  deletedAt?: string | null
  driverId?: number
  id: number
  lastLat?: string | null
  lastLng?: string | null
  licensePlatese: string
  ownerTypeId?: number
  sort?: string | number | null
  status?: string | null
  updatedAt?: string | null
  vehicleCategory?: VehicleTypeType
  workingAreaId?: number
  driver: DriverType
  systemVehicleType?: string | null
  groupIds?: number[] | null
  vehicleCode: string
}

export type CreateVehicleResponse = {
  data: VehicleType
  status: number
}

export type CreateVehicleRequest = {
  categoryId: number
  licensePlatese: string
  systemVehicleType: string
  workingAreaId: string
  groupIds?: number[]
  driverId?: number
  status: string
  vehicleCode: string
}

export type GetVehicleRequest = {
  query?: string
}

export type GetOrderVehicleListRequest = {
  orderCode?: string
  query?: string
}

export type VehicleDriverType = {
  id: number
  name: string
  phone: string
  dob: string
  cccd: string
  address: string
  gender: string
  changedPasswordFirstTime: boolean
  status: number
  player_id: string | number
  isOnline?: boolean
  notify: boolean
}

export type OrderVehicleType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  licensePlatese: string
  categoryId: number
  ownerTypeId: number | null
  driverId: number
  lastLat: string | null
  lastLng: string | null
  workingAreaId: number
  systemVehicleType: string
  location: string | null
  driver: VehicleDriverType
  isWorking: boolean
}

export type VehicleDetailsType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  licensePlatese: string
  categoryId: number
  ownerTypeId: number | null
  driverId: number
  lastLat: string
  lastLng: string
  workingAreaId: number
  systemVehicleType: string
  location: string
  groups: VehicleGroupType[]
  driver: VehicleDriverType
  vehicleCategory: VehicleTypeType
}

export type VehicleGroupType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  workingAreaId: number
  captainId: number
}

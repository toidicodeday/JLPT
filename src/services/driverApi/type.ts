import { AreaType } from '../areaApi/types'
import { VehicleType } from '../vehicleApi/type'

export type DriverType = {
  id?: number | null
  name?: string | null
  phone: string
  dob?: string | null
  cccd?: string | null
  address?: string | null
  gender?: string | null
  changedPasswordFirstTime?: boolean
  status?: number | null
  player_id?: string | null
  unitKey?: string | null
  workingAreaId?: number
  vehicleCategoryId?: number | null
  contractId?: number | null
  applyFrom?: string | null
  applyTo?: string | null
  driverWalletMoney?: string | null
  vehicles?: VehicleType[]
  workingArea: AreaType
  notify: boolean
  isOnline: boolean
}

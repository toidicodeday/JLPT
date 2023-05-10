import { OrderVehicleType } from '../vehicleApi/type'
import { AreaType } from './../areaApi/types'
export type VehicleGroup = {
  id: 1
  status?: string
  sort?: string | number | null
  createdAt?: string
  updatedAt?: string | null
  deletedAt?: string | null
  name: string | null
  workingAreaId?: number
  captainId?: string | null
  workingArea?: any
  captain?: any
  count?: number
}

export type VehicleGroupDetails = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  workingAreaId: number
  captainId: number
  workingArea: WorkingAreaType
  captain: any
  vehicles: VehicleGroupVehicleType[]
}

export interface WorkingAreaType extends AreaType {
  acronym: string
}

export interface VehicleGroupVehicleType extends OrderVehicleType {
  vehicleCategory: {
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
    description?: string
  }
}

export type GetVehicleGroupResponse = {
  data: Array<VehicleGroup>
  pages: number
  total: number
}

export type VehicleGroupReposone = {
  data: VehicleGroup
  status: number
}

export type CreateVehicleGroupRequest = {
  name: string
  workingAreaId: number
  captainId?: number
  vehicleIds?: any[]
}

export type UpdateVehicleGroupRequest = {
  id: number
  body: CreateVehicleGroupRequest
}

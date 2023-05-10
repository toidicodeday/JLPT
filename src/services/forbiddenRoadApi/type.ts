import { WorkingAreaType } from '../vehicleGroup/type'

export type ForbiddenRoadType = {
  id: number
  status?: string
  sort: string | null
  createdAt?: string
  updatedAt?: string
  deletedAt: null | string
  name: string
  workingAreaId: number
  workingArea: WorkingAreaType
  districtId: string | null
  forbiddenRoadTime: ForbiddenRoadTimeType[]
}

export type ForbiddenRoadTimeType = {
  id?: number
  status?: string
  sort?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  from: string
  to: string
  forbiddenRoadId?: number
}

export type CreateForbiddenRoadType = {
  workingAreaId: number
  districtId: number
  name: string
  forbiddenRoadTime: ForbiddenRoadTimeType[]
}

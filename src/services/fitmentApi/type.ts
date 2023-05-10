export type FitmentGroupType = {
  id: number
  status: string
  sort?: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  name: string
  type: string
}

export type FitmentItemType = {
  id: number
  status?: string
  sort?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  name: string
  calculation_unit?: string
  size?: string
  cost: string | number
  fitmentGroupId: number
}

export type CreateFitmentItemResponse = {
  data: FitmentItemType
  status: number
}

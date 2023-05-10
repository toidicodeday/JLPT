export interface ServiceType extends ChildServiceType {
  child: ChildServiceType[]
}

export type ChildServiceType = {
  id: number
  name: string
  type: string | null
  desc: string
  price: number
  icon: null | string
  status: number
  parentId: number
}

export type GetServiceListQueryResponse = {
  data?: ServiceType[]
  status?: number
  total?: number
  page?: number
}

export type GetServiceListQueryRequest = {
  query?: string
}

export type MainServiceType = {
  id?: number
  type?: string
  name?: string
}

export type FitmentGroupType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
}

export type FitmentGroupDetailsType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  fitmentItem: FitmentItemType[]
}

export type FitmentItemType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  name: string
  calculation_unit: string
  size: string
  cost: string
  fitmentGroupId: number
}

export type ProductType = {
  id: number
  name: string
  type: string
  desc: string | null
  price: number
  icon: string
  status: number
  parentId: number
}

export type CreateProductAdminResponse = {
  name: string
  price: number
  icon: string
  id: number
  status: number
}

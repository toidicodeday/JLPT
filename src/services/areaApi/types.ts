export type AreaType = {
  id?: number
  status?: string
  sort?: null
  createdAt?: string
  deletedAt?: string | null
  name?: string
  parentId: number
  updatedAt: string
  acronym?: string
}

export type GetAreaListResponse = {
  data: AreaType[]
  pages: number
  total: number
}

export type GetAreaListRequest = {
  query?: string
}

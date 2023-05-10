export type NewsType = {
  id?: number
  status?: string
  sort?: string | null
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  title?: string
  link?: string
  url?: string
  createdBy?: string
  updatedBy?: string
}

export type GetNewsResponse = {
  data: Array<NewsType>
  pages: number
  total: number
}

export type NewsReposone = {
  data: NewsType
  status: number
}

export type NewsRequest = {
  id: number
  body: NewsType
}

export type CreteNewsRequest = {
  title?: string
  link?: string
  url?: string
}

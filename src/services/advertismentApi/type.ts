export type AdvertisementType = {
  content: string
  createdAt: string
  deletedAt: string | null
  displayInApp: boolean
  displayWhenOpenApp: boolean
  endTime: string
  id: number
  imageDisplay: string
  name: string
  sort: number | null
  startTime: string
  status: string
  updatedAt: string
  workingAreaId: number
}

export type CreateAdvertismentResponse = {
  data: AdvertisementType
  status: number
}

export type RecordType = {
  guestId: number
  driverId: number
  url: string
  order: {
    code: string
  }
  guest: {
    id: number
    name: string
  }
  driver: {
    id: number
    name: string
  }
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  orderCode: string
}

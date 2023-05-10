export type DiscountType = {
  name: string
  applyFrom: string
  applyTo: string
  contractId: number
  workingAreaId: number
  usageFee: number
  incomeTaxFee: number
  createdBy: number
  sort: string | null
  deletedAt: string | null
  updatedBy: string | null
  id: number
  status: string
  createdAt: string
  updatedAt?: string
  discountStatus: string
  createdAccount?: {
    id: number
    name: string
  }
  workingArea?: {
    id: number
    name: string
  }
  contract: {
    id: number
    name: string
  }
  vat?: number | string
}

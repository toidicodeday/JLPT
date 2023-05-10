export type ContractT = {
  id: number
  status?: string
  sort?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  name: string
  termValue: string
  fileUrl?: string
}

export type CreateContractResponse = {
  status: string
}

export type CreateContractRequest = {
  id: number
}

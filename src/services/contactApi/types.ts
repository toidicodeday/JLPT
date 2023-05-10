import { HOT_LINE_TYPE } from '@/utils/constant/constant'

export type ContactT = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  area: string
  telephone: string
  hotlineType: HOT_LINE_TYPE.NORMAL | HOT_LINE_TYPE.PTCD
}

export type CreateContactResponse = {
  status: string
}

export type CreateContactRequest = {
  id: number
}

import { AdminRole } from '../accountApi/types'

export interface SystemRole extends AdminRole {
  sort: number | null
  deletedAt: number | null
  status: string
  createdAt: string
  updatedAt: string
}

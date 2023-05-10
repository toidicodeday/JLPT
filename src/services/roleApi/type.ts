import { ADMIN_ACC_FUNC } from './../../utils/constant/constant'
export type RoleT = {
  id: number
  name: string
  sort: number | null
  status: string
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  functionName:
    | ADMIN_ACC_FUNC.SURVEY_STAFF
    | ADMIN_ACC_FUNC.OPERATING_STAFF
    | ADMIN_ACC_FUNC.LEADER
    | null
}

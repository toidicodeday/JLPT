import { ADMIN_ACC_FUNC } from './../../utils/constant/constant'
import { GENDER } from '@/utils/constant/constant'
import { SystemRole } from '../systemRoleApi/types'

export type AdminAccount = {
  id: number
  name: string
  phone: string
  dob?: string
  email: string
  status: number
  systemRoles?: AdminRole[]
  addressId: number
  managingAreaId: number | null
  gender: string
  isCaptain: boolean
  player_id?: number
  isSupporter: boolean
  created_at?: string
  updated_at?: string
  avatar: string
  workingAreas: { id: number }[] | null
}

export type AdminRole = {
  id: number
  name: string
}

export type CaptainAccount = {
  addressId: number
  created_at: string
  dob: string | null
  email: string
  gender: string
  id: number
  managingAreaId: number | null
  name: string
  phone: string
  player_id: string | null
  status: number
  systemRoles: number[]
  updated_at: string
}

export type AdminAcctDetailsType = {
  id: number | null
  avatar: string | null
  name: string
  phone: string
  dob: string | null
  addressId: number
  gender: string
  systemRoles: SystemRole[] | null
  status: number | null
  managingAreaId: number | null
  updated_at: string
  created_at: string
  isCaptain: boolean
  isSupporter: boolean
  email: string
  player_id?: number
  workingAreas: {
    acronym: string | null
    createdAt: string
    deletedAt: string | null
    id: number
    name: string
    parentId: number
    sort: number | null
    status: string
    updatedAt: string
  }[]
}

export type GetStaffListResponse = {
  data: Array<AdminAccount>
  pages: number
  total: number
}

export type GetStaffListRequest = {
  query: string
}

export type GetOneStaffResponse = {
  data: AdminAcctDetailsType
  status: number
}

export type GetOneStaffModifiedResponse = {
  data: AdminAcctDetailsType
  status: number
}

export type GetOneStaffRequest = {
  id: number
}

export type CreateStaffResponse = {
  data: AdminAcctDetailsType
  status: number
}

export type CreateStaffRequest = {
  avatar?: any
  email?: string
  name?: string
  dob?: string | null
  addressId?: number
  workingAreas?: { id: number }[] | null
  phone: string
  status: number
  gender?: string
  systemRoles?: { id: number }[]
  isCaptain?: boolean
  isSupporter: boolean
}

export type UpdateStaffRequest = {
  id: number
  body: {
    name: string
    dob: string
    addressId: number
    workingAreas?: { id: number }[] | null
    phone: string
    status: number
    gender: GENDER
    systemRoles: { id: number }[]
    // isCaptain: boolean
    isSupporter: boolean
  }
}

export type UpdateMeRequest = {
  body: {
    avatar?: any
    email?: string
    name?: string
    dob?: string
    addressId?: number
    phone?: string
    status?: number
    gender?: string
  }
}

export type ChangeMyPassRequest = {
  body: { oldPassword: string; newPassword: string; confirmPassword: string }
}

export type GetAdminMeResponse = {
  data: AdminMeType
  status: number
}

export type AdminMeType = {
  addressId: number
  created_at: string
  dob: string
  email: string
  gender: string
  id: number
  isCaptain: boolean
  isSupporter: boolean
  isAdmin: boolean
  managingAreaId: number
  name: string
  phone: string
  player_id: string | null
  provider: string
  status: number
  updated_at: string
  systemRoles: AdminMeSystemRole[]
  superAdminFunctionAction?: MeSystemFuncType[]
}

export type AdminMeSystemRole = {
  createdAt: string
  deletedAt: string | null
  id: number
  name: string
  sort: number | null
  status: string
  updatedAt: string
  systemFunctions?: MeSystemFuncType[]
  functionName:
    | ADMIN_ACC_FUNC.SURVEY_STAFF
    | ADMIN_ACC_FUNC.OPERATING_STAFF
    | ADMIN_ACC_FUNC.LEADER
    | null
}

export type MeSystemFuncType = {
  id: number
  key: string
  name: string
  systemActions: MeSystemActionType[]
}

export type MeSystemActionType = {
  actionKey: 'full' | 'read' | 'edit' | 'delete' | 'create'
  canExecute: boolean
  id: number
  name: string
  systemFunctionId: number
}

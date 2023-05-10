export type CreatedNotiType = {
  timeSendNoti?: string | null
  sendForm?: 'NOTIFICATION' | 'SMS'
  title: string
  content: string
  selectAll: boolean
  workingAreaSetup?: {
    selectAll: boolean
    workingAreaSelected?: number[]
  }
  groupMemberSetup?: {
    selectAll: boolean
    groupMemberSelected?: GroupMemberType[]
  }
}

export type GroupMemberType =
  | 'GUEST'
  | 'MANAGER'
  | 'thanhhung_driver'
  | 'thanhhung_partner'

export type AdminNotiType = {
  id: number
  status: string
  sort: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  timeSendNoti: string | null
  sendForm: 'SMS' | 'NOTIFICATION' | null
  title: string
  content: string
  selectAll: boolean
  sent: boolean
  workingAreaSetup: {
    selectAll: boolean
    workingAreaSelected?: number[]
  } | null
  groupMemberSetup: {
    selectAll: boolean
    groupMemberSelected: GroupMemberType[]
  } | null
}

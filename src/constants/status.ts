export const listStatus = [
  {
    value: 1,
    name: 'Chưa áp dụng',
    bg: 'bg-grayColor',
  },
  {
    value: 2,
    name: 'Đang chạy',
    bg: 'bg-greenButton',
  },
  {
    value: 3,
    name: 'Tạm dừng',
    bg: 'bg-orangeButton',
  },
  {
    value: -1,
    name: 'Hết hạn',
    bg: 'bg-grayBackground',
  },
  {
    value: 0,
    name: 'Hủy',
    bg: 'bg-primary',
  },
]

export const PARTNER_STATUS = {
  NEW: 0,
  VERIFIED_OTP: 1,
  ACTIVE: 2,
  REJECTED: 3,
}

export const LOCATION = {
  HN: 1,
  HCM: 0,
}

export const WORKING_AREA = {
  HN: 1,
  HCM: 2,
}

export const PARTNER_STATUS_FULL = [
  {
    id: 0,
    value: 0,
    label: 'Chưa verify OTP',
  },
  {
    id: 1,
    value: 1,
    label: 'Chưa phê duyệt',
  },
  {
    id: 2,
    value: 2,
    label: 'Đã phê duyệt',
  },
  {
    id: 3,
    value: 3,
    label: 'Huỷ',
  },
]

export const STAFF_STATUS = {
  ACTIVE: 1,
  LOCKED: 0,
}

export const STAFF_STATUS_FULL = [
  {
    id: 0,
    value: 0,
    label: 'Khoá',
  },
  {
    id: 1,
    value: 1,
    label: 'Hoạt động',
  },
]

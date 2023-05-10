export const SENDBIRD_APP_ID = import.meta.env.VITE_SENDBIRD_APP_ID
export const SENDBIRD_API_TOKEN = import.meta.env.VITE_SITE_API_TOKEN

export const UNIT_OPTIONS = [
  {
    name: 'Chiếc',
    key: '1',
  },
  {
    name: 'Bộ',
    key: '2',
  },
]

export const PARTNER_STATUS = {
  NEW: 0,
  VERIFIED_OTP: 1,
  ACTIVE: 2,
  REJECTED: 3,
}

export const KEYS = {
  TIMEOUT: 30000,

  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}

export const TEMP_ORDER_CODE = {
  TEMP_TX_CODE: 'tempTxOrderCode',
  TEMP_CN_CODE: 'tempCnOrderCode',
}
export const ORDER_TABLE_COL_SIZE = {
  TX_TABLE_SIZE: 'txTableSize',
  CN_TABLE_SIZE: 'cnTableSize',
}
export const VEHICLE_STATUS_OPS = [
  {
    label: 'Đang hoạt động',
    value: 'PUBLISH',
  },
  {
    label: 'Dừng hoạt động',
    value: 'UNPUBLISH',
  },
  {
    label: 'Bảo dưỡng',
    value: 'MAINTAIN',
  },
]

export const OWNER_COMPANY_OPS = [
  {
    label: 'Thành hưng',
    value: 'THANHHUNG',
  },
  {
    label: 'Đối tác',
    value: 'PARTNER',
  },
]

export enum DOCUMENT_TYPE {
  AVATAR = '0',
  CCCD_FRONT = '1',
  CCCD_BACK = '2',
  DRIVER_LICENSE = '3',
  CAR_IMAGE = '4',
  LICENSE_PLATE = '5',
  VEHICLE_REGISTRATION = '6',
  SIGNATURE = '7',
}

export enum STATUS_ORDER {
  DRAFT = 0,
  NEW = 1,
  WAITING_CONSULT = 2,
  CONSULTED = 3,
  ARRIVING = 4,
  ARRIVED = 5,
  DELIVERY = 6,
  COMPLETE = 7,
  CANCEL = 8,
  FAILURE = 9,
  RECEIVED = 10,
  NOT_SOLVED = 22,
}

export const ORDER_STATUS_OPS = {
  [STATUS_ORDER.DRAFT]: {
    label: 'Bản nháp',
    color: undefined,
  },
  [STATUS_ORDER.NEW]: {
    label: 'Chuyến hàng mới',
    color: '#59AFFF',
  },
  [STATUS_ORDER.WAITING_CONSULT]: {
    label: 'Chờ tư vấn',
    color: '#F99233',
  },
  [STATUS_ORDER.CONSULTED]: {
    label: 'Đã tư vấn',
    color: '#35703B',
  },
  [STATUS_ORDER.ARRIVING]: {
    label: 'Tài xế đang đến',
    color: '#F99233',
  },
  [STATUS_ORDER.ARRIVED]: {
    label: 'Tài xế đã đến',
    color: '#59AFFF',
  },
  [STATUS_ORDER.DELIVERY]: {
    label: 'Đang giao hàng',
    color: '#63DB6F',
  },
  [STATUS_ORDER.COMPLETE]: {
    label: 'Hoàn thành',
    color: 'success',
  },
  [STATUS_ORDER.CANCEL]: {
    label: 'Hủy',
    color: 'error',
  },
  [STATUS_ORDER.FAILURE]: {
    label: 'Thất bại',
    color: '#D32F2F',
  },
  [STATUS_ORDER.RECEIVED]: {
    label: 'Tài xế đã nhận đơn hàng',
    color: '#ddbc02',
  },
}

export enum CN_ORDER_STATUS {
  DRAFT = 0,
  WAITING_ACCEPT = 12,
  WAITING_QUOTATION = 13,
  WAITING_SURVEY = 14,
  DONE_SURVEY = 15,
  DONE_QUOTATION = 16,
  SIGNED_CONTRACT = 17,
  CHOSEN_TEAM_LEAD = 18,
  MOVING = 19,
  MOVED = 20,
  RATED = 21,
  CANCEL = 8,
  SIGNED_LIQUIDATION = 23,
}

export const CN_ORDER_STATUS_OPS = {
  [CN_ORDER_STATUS.DRAFT]: {
    label: 'Bản nháp',
    color: undefined,
  },
  [CN_ORDER_STATUS.WAITING_ACCEPT]: {
    label: 'Chờ tiếp nhận',
    color: '#59AFFF',
  },
  [CN_ORDER_STATUS.WAITING_QUOTATION]: {
    label: 'Chờ báo giá',
    color: '#FF6659',
  },
  [CN_ORDER_STATUS.WAITING_SURVEY]: {
    label: 'Chờ khảo sát',
    color: '#F99233',
  },
  [CN_ORDER_STATUS.DONE_SURVEY]: {
    label: 'Đã khảo sát',
    color: '#59AFFF',
  },
  [CN_ORDER_STATUS.DONE_QUOTATION]: {
    label: 'Đã báo giá',
    color: '#35703B',
  },
  [CN_ORDER_STATUS.SIGNED_CONTRACT]: {
    label: 'Đã ký hợp đồng',
    color: '#116476',
  },
  [CN_ORDER_STATUS.CHOSEN_TEAM_LEAD]: {
    label: 'Đã chọn tổ trưởng',
    color: '#28B737',
  },
  [CN_ORDER_STATUS.MOVING]: {
    label: 'Đang chuyển dọn',
    color: '#7828B7',
  },
  [CN_ORDER_STATUS.MOVED]: {
    label: 'Hoàn thành chuyển dọn',
    color: '#59AFFF',
  },
  [CN_ORDER_STATUS.RATED]: {
    label: 'Khách hàng đã đánh giá',
    color: 'success',
  },
  [CN_ORDER_STATUS.CANCEL]: {
    label: 'Hủy',
    color: 'error',
  },
  [CN_ORDER_STATUS.SIGNED_LIQUIDATION]: {
    label: 'Khách hàng đã ký thanh lý hợp đồng',
    color: 'success',
  },
}

export const CN_ORDER_STATUS_ARR = [
  {
    value: CN_ORDER_STATUS.DRAFT,
    label: 'Bản nháp',
    color: undefined,
  },
  {
    value: CN_ORDER_STATUS.WAITING_ACCEPT,
    label: 'Chờ tiếp nhận',
    color: '#59AFFF',
  },
  {
    value: CN_ORDER_STATUS.WAITING_SURVEY,
    label: 'Chờ khảo sát',
    color: '#F99233',
  },
  {
    value: CN_ORDER_STATUS.DONE_SURVEY,
    label: 'Đã khảo sát',
    color: '#59AFFF',
  },
  {
    value: CN_ORDER_STATUS.WAITING_QUOTATION,
    label: 'Chờ báo giá',
    color: '#FF6659',
  },
  {
    value: CN_ORDER_STATUS.DONE_QUOTATION,
    label: 'Đã báo giá',
    color: '#35703B',
  },
  {
    value: CN_ORDER_STATUS.SIGNED_CONTRACT,
    label: 'Đã ký hợp đồng',
    color: '#116476',
  },
  {
    value: CN_ORDER_STATUS.CHOSEN_TEAM_LEAD,
    label: 'Đã phân tổ trưởng',
    color: '#28B737',
  },
  {
    value: CN_ORDER_STATUS.MOVING,
    label: 'Đang chuyển dọn',
    color: '#7828B7',
  },
  {
    value: CN_ORDER_STATUS.MOVED,
    label: 'Hoàn thành chuyển dọn',
    color: '#59AFFF',
  },
  {
    value: CN_ORDER_STATUS.RATED,
    label: 'Khách hàng đã đánh giá',
    color: 'success',
  },
  {
    value: CN_ORDER_STATUS.CANCEL,
    label: 'Huỷ',
    color: 'error',
  },
]

export const ORDER_STATUS = [
  {
    value: STATUS_ORDER.DRAFT,
    label: 'Bản nháp',
    color: undefined,
  },
  {
    value: STATUS_ORDER.NEW,
    label: 'Chuyến hàng mới',
    color: '#59AFFF',
  },
  // {
  //   value: STATUS_ORDER.WAITING_CONSULT,
  //   label: 'Chờ tư vấn',
  //   color: '#F99233',
  // },
  // {
  //   value: STATUS_ORDER.CONSULTED,
  //   label: 'Đã tư vấn',
  //   color: '#35703B',
  // },
  {
    value: STATUS_ORDER.ARRIVING,
    label: 'Tài xế đang đến',
    color: '#F99233',
  },
  {
    value: STATUS_ORDER.ARRIVED,
    label: 'Tài xế đã đến',
    color: '#59AFFF',
  },
  {
    value: STATUS_ORDER.DELIVERY,
    label: 'Đang giao hàng',
    color: '#63DB6F',
  },
  {
    value: STATUS_ORDER.COMPLETE,
    label: 'Hoàn thành',
    color: 'success',
  },
  {
    value: STATUS_ORDER.CANCEL,
    label: 'Hủy',
    color: 'error',
  },
  {
    value: STATUS_ORDER.FAILURE,
    label: 'Thất bại',
    color: '#D32F2F',
  },
  {
    value: STATUS_ORDER.RECEIVED,
    label: 'Tài xế đã nhận đơn hàng',
    color: '#ddbc02',
  },
]

export enum PICK_UP_TYPE {
  NOW = 0,
  SCHEDULE = 1,
}

export const PAY_DETAILS_TYPE = [
  {
    value: 0,
    label: 'Trả phí theo app',
  },
  {
    value: 1,
    label: 'Trả phí theo đồng hồ taximét',
  },
]

export enum DRIVER_TYPE {
  THANHHUNG_DRIVER = 'thanhhung_driver',
  THANHHUNG_PARTNER = 'thanhhung_partner',
}

export const ORDER_CANCEL_REASON = {
  0: 'Tài xế đến muộn',
  1: 'Không có nhu cầu nữa',
  2: 'Có việc bận đột xuất',
  3: 'Thời tiết không phù hợp',
  4: 'Lý do khác',
}

export const ORDER_CANCEL_REF = {
  admin: 'Admin',
  driver: 'Tài xế',
  guest: 'Khách hàng',
}

export const DRIVER_TYPE_OPTIONS = [
  { value: DRIVER_TYPE.THANHHUNG_DRIVER, label: 'Tài xế Thành Hưng' },
  { value: DRIVER_TYPE.THANHHUNG_PARTNER, label: 'Tài xế đối tác' },
]

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const GENDER_OPTIONS = [
  { label: 'Nam', value: GENDER.MALE },
  { label: 'Nữ', value: GENDER.FEMALE },
]

export enum CUSTOMER_STATUS {
  LOCK = 0,
  ACTIVE = 1,
}

export const ORDER_FEE = {
  VC: 'Phí vận chuyển',
  TAX: 'Thuế VAT',
  PRM: 'Khuyến mại',
  PAK: 'Phí neo xe',
  OVN: 'Phí qua đêm',
  EXT: 'Phí phụ trội',
  RTN: 'Phí chiều về',
  RTF: 'Phí giao thông đường bộ',
  MSB: 'Phí xe đi ngoại tỉnh miền núi',
  FTM: 'Phí đồ đạc',
  OTN: 'Chi phí khác',
  DV: 'Phí dịch vụ',
  VT: 'Phí vật tư',
}

export enum STATUS_DISCOUNT {
  NEW = 'N',
  ACTIVE = 'A',
  EXPIRED = 'E',
  CANCEL = 'C',
  PENDING = 'P',
}

export const STATUS_DISCOUNT_OPS = [
  {
    value: STATUS_DISCOUNT.NEW,
    name: 'Chưa áp dụng',
    bg: 'bg-[#80B2CE]',
  },
  {
    value: STATUS_DISCOUNT.ACTIVE,
    name: 'Đang chạy',
    bg: 'bg-[#63DB6F]',
  },
  {
    value: STATUS_DISCOUNT.PENDING,
    name: 'Tạm dừng',
    bg: 'bg-[#F99233]',
  },
  {
    value: STATUS_DISCOUNT.EXPIRED,
    name: 'Hết hạn',
    bg: 'bg-[#D9D9D9]',
  },
  {
    value: STATUS_DISCOUNT.CANCEL,
    name: 'Hủy',
    bg: 'bg-[#F8EFEF]',
  },
]
export enum STAFF_ACCOUNT_STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum HOT_LINE_AREA {
  HANOI = 'HANOI',
  HCM = 'HCM',
  FREE = 'FREE',
}

export enum HOT_LINE_TYPE {
  NORMAL = 'NORMAL',
  PTCD = 'PT_CD',
}

export enum ROLE_PERMISSION_STATUS {
  PUBLISH = 'PUBLISH',
  UNPUBLISH = 'UNPUBLISH',
}

export enum PERMISSION_ACTION_KEY {
  FULL = 'full',
  READ = 'read',
  CREATE = 'create',
}

export const MENU_ACCESS_KEY = {
  dashboard: 'canAccessDashboard',
  orderManage: 'canAccessOrder',
  txOrder: 'canAccessTxOrder',
  createTxOrder: 'canCreateTxOrder',
  cnOrder: 'canAccessCnOrder',
  createCnOrder: 'canCreateCnOrder',
  customer: 'canAccessCustomer',
  partner: 'canAccessPartner',
  vehicleManage: 'canAccessVehicleManage',
  vehicleCategory: 'canAccessVehicleCategory',
  createVehicleCategory: 'canCreateVehicleCategory',
  vehicle: 'canAccessVehicle',
  createVehicle: 'canCreateVehicle',
  driver: 'canAccessDriver',
  createDriver: 'canCreateDriver',
  driverTeam: 'canAccessDriverTeam',
  createDriverTeam: 'canCreateDriverTeam',
  accountManage: 'canAccessAccountManage',
  account: 'canAccessAccount',
  createAccount: 'canCreateAccount',
  authorize: 'canAccessAuthorize',
  role: 'canAccessRole',
  reportManage: 'canAccessReport',
  incomeReport: 'canAccessIncomeReport',
  partnerReport: 'canAccessPartnerReport',
  serviceManage: 'canAccessServiceManage',
  service: 'canAccessService',
  advertisement: 'canAccessAdvertisement',
  createAdvertisement: 'canCreateAdvertisement',
  promotion: 'canAccessPromotion',
  createPromotion: 'canCreatePromotion',
  systemManage: 'canAccessSystemManage',
  guestType: 'canAccessGuestType',
  homeSettings: 'canAccessHomeSettings',
  partnerDiscount: 'canAccessPartnerDiscount',
  createPartnerDiscount: 'canCreatePartnerDiscount',
  taxSettings: 'canAccessTaxSettings',
  contract: 'canAccessContract',
  createContract: 'canCreateContract',
  fitment: 'canAccessFitment',
  forbiddenRoad: 'canAccessForbiddenRoad',
  chatCall: 'canAccessChatCall',
  contact: 'canAccessContact',
  notification: 'canAccessNotification',
  createNotification: 'canCreateNotification',
}

export const SYSTEM_ROLE_KEY = {
  dashboard: 'manage-dashboard',
  txOrder: 'manage-order-taxi',
  cnOrder: 'manage-order-taxi-cn-vptg',
  customer: 'manage-customer',
  partner: 'manage-partner',
  vehicleManage:
    'manage-vehicle-type,manage-vehicle,manage-vehicle-driver,manage-vehicle-group',
  vehicleCategory: 'manage-vehicle-type',
  vehicle: 'manage-vehicle',
  driver: 'manage-vehicle-driver',
  driverTeam: 'manage-vehicle-group',
  account: 'manage-account',
  authorize: 'manage-account-role-action',
  role: 'manage-account-role',
  incomeReport: 'manage-report-revenue',
  partnerReport: 'manage-report-revenue-partner',
  service: 'manage-service',
  advertisement: 'manage-service-advertisement',
  promotion: 'manage-service-promotion',
  guestType: 'manage-system-customer-type',
  homeSettings: 'manage-system-homepage-config',
  partnerDiscount: 'manage-system-partner-discounts',
  taxSettings: 'manage-system-settings-tax-fee',
  contract: 'manage-service-contract',
  fitment: 'manage-service-supplies',
  forbiddenRoad: 'manage-service-closed-road',
  chatCall: 'manage-service-chat',
  contact: 'manage-service-contact',
  notification: 'manage-service-notification',
}

export enum TYPE_SERVICE_ORDER {
  TAXI_TRUCK = 'tx',
  MOVING_OFFICE = 'cn',
}

export enum AreaSetupEnum {
  IN_CITY = 'IN', //Nội thành
  OUT_CITY = 'OUT', //Ngoài thành
}

export enum STATUS_DRIVER {
  NOT_VERIFY = 0,
  VERIFIED = 1,
  ACTIVE = 2,
  REJECT = 3,
}

export enum STATUS_READ_MESSAGE {
  READ = 'PUBLISH',
  NOTREAD = 'UNPUBLISH',
}

export const ADMIN_NOTI_RECEIVER = {
  guest: 'GUEST',
  admin: 'MANAGER',
  driverth: 'thanhhung_driver',
  drivernth: 'thanhhung_partner',
}

export const ADMIN_NOTI_SEND_FORM = {
  app: 'NOTIFICATION',
  sms: 'SMS',
}

export const ADMIN_NOTI_RECEIVER_NAME = [
  {
    value: ADMIN_NOTI_RECEIVER.guest,
    label: 'Khách hàng',
  },
  {
    value: ADMIN_NOTI_RECEIVER.admin,
    label: 'Admin',
  },
  {
    value: ADMIN_NOTI_RECEIVER.driverth,
    label: 'Tài xế TH',
  },
  {
    value: ADMIN_NOTI_RECEIVER.drivernth,
    label: 'Tài xế ĐT',
  },
]

export enum TAXI_ORDER_CONTRACT_TYPE {
  INDIVIDUAL = 0,
  CONTRACT = 1,
}

export enum DRIVER_LOCATION_STATUS {
  ARRIVED_LOCATION = 1,
  NOT_ARRIVED_LOCATION_YET = 0,
}

export enum ADMIN_ACC_FUNC {
  SURVEY_STAFF = 'SURVEY_STAFF',
  OPERATING_STAFF = 'OPERATING_STAFF',
  LEADER = 'LEADER',
}

export const ADMIN_ACC_FUNC_OPS = [
  {
    id: 1,
    value: ADMIN_ACC_FUNC.SURVEY_STAFF,
    label: 'Nhân viên khảo sát',
  },
  {
    id: 2,
    value: ADMIN_ACC_FUNC.OPERATING_STAFF,
    label: 'Nhân viên điều hành',
  },
  {
    id: 3,
    value: ADMIN_ACC_FUNC.LEADER,
    label: 'Tổ trưởng',
  },
]

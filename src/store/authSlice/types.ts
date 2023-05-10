import { AdminAccount } from '@/services/authApi/types'

export interface AuthState {
  account: AdminAccount | null
  accessToken: string | null
  refreshToken: string | null
  userMe: any
  authorizeMe: null | AuthorizeMeType
}

export interface AuthorizeMeType {
  [key: string]: boolean
}

// export interface AuthorizeMeType {
//   canAccessDashboard: boolean
//   canAccessOrder: boolean
//   canAccessCustomer: boolean
//   canAccessPartner: boolean
//   canAccessVehicleCategory: boolean
//   canAccessVehicle: boolean
//   canAccessDriver: boolean
//   canAccessDriverTeam: boolean
//   canAccessAccount: boolean
//   canAccessAuthorize: boolean
//   canAccessRole: boolean
//   canAccessReport: boolean
//   canAccessService: boolean
//   canAccessAdvertisement: boolean
//   canAccessPromotion: boolean
//   canAccessGuestType: boolean
//   canAccessHomeSettings: boolean
//   canAccessPartnerDiscount: boolean
//   canAccessTaxSettings: boolean
//   canAccessContract: boolean
//   canAccessFitment: boolean
//   canAccessForbiddenRoad: boolean
//   canAccessChatCall: boolean
//   canAccessContact: boolean
//   canAccessNotification: boolean
// }

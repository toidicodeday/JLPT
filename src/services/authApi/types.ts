export type AdminAccount = {
  phone: string
  email: string
}

export type LoginResponseType = {
  accessToken: string
  account: AdminAccount
  refreshToken: string
}

export type LoginRequestType = {
  email: string
  password: string
}

export type ForgotPassRequestType = {
  email: string
  returnUrl: string
}

export type ForgotPassResponseType = {
  status: number
  message: string
}

export type ResetPassRequestType = {
  password: string
  confirmPassword: string
  token: string
}

export type ResetPassResponseType = {
  id: number
  name: string
  phone: string
  email: string
  status: number
  address: string
  gender: string
}

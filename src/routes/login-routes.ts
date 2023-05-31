import { lazyRetry } from '@/utils/helpers/routes.helper'
import { lazy } from 'react'
import IRoute from '../core/objects/IRoute'

const LoginScreen = lazy(() => lazyRetry(() => import('../pages/Auth/Login')))
const AuthPhoneNumber = lazy(() =>
  lazyRetry(() => import('../pages/Auth/AuthOption/AuthPhone/AuthPhoneNumber')),
)
const AuthPhoneOTP = lazy(() =>
  lazyRetry(() => import('../pages/Auth/AuthOption/AuthPhone/AuthPhoneOTP')),
)

const routes: IRoute[] = [
  {
    path: '/login',
    key: '/login',
    name: 'Login',
    component: LoginScreen,
  },
  {
    path: '/auth-phone-number',
    key: '/auth-phone-number',
    name: 'Auth Phone',
    component: AuthPhoneNumber,
  },
  {
    path: '/auth-otp-number',
    key: '/auth-otp-number',
    name: 'Auth Phone',
    component: AuthPhoneOTP,
  },
]

export default routes

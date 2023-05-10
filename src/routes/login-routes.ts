import { lazyRetry } from '@/utils/helpers/routes.helper'
import { lazy } from 'react'
import IRoute from '../core/objects/IRoute'

const LoginScreen = lazy(() => lazyRetry(() => import('../pages/Auth/Login')))
const ForgotPasswordScreen = lazy(() =>
  lazyRetry(() => import('../pages/Auth/ForgotPass')),
)
const ResetPasswordScreen = lazy(() =>
  lazyRetry(() => import('../pages/Auth/ResetPass')),
)

const routes: IRoute[] = [
  {
    path: '/login',
    key: '/login',
    name: 'Login',
    component: LoginScreen,
  },
  {
    path: '/forgot-password',
    key: '/forgot-password',
    name: 'Forgot password',
    component: ForgotPasswordScreen,
  },
  {
    path: '/reset-password',
    key: '/reset-password',
    name: 'Reset password',
    component: ResetPasswordScreen,
  },
]

export default routes

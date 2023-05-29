import { lazyRetry } from '@/utils/helpers/routes.helper'
import { lazy } from 'react'
import IRoute from '../core/objects/IRoute'

const LoginScreen = lazy(() => lazyRetry(() => import('../pages/Auth/Login')))

const routes: IRoute[] = [
  {
    path: '/login',
    key: '/login',
    name: 'Login',
    component: LoginScreen,
  },
]

export default routes

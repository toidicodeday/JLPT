import IRoute from '../core/objects/IRoute'
import { lazy } from 'react'
import { lazyRetry } from '@/utils/helpers/routes.helper'

const Forbidden = lazy(() =>
  lazyRetry(() => import('../pages/Error/Forbidden')),
)
const NotFound = lazy(() => lazyRetry(() => import('../pages/Error/NotFound')))
const Unauthorize = lazy(() =>
  lazyRetry(() => import('../pages/Error/Unauthorize')),
)
const routes: IRoute[] = [
  {
    path: '/403',
    key: '/403',
    name: 'Forbidden',
    component: Forbidden,
  },
  {
    path: '/404',
    key: '/404',
    name: 'Not Found',
    component: NotFound,
  },
  {
    path: '/401',
    key: '/401',
    name: 'Not Authorize',
    component: Unauthorize,
  },
]

export default routes

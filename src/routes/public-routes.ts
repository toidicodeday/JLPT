import IRoute from '../core/objects/IRoute'
import { lazy } from 'react'
import { lazyRetry } from '@/utils/helpers/routes.helper'
import { AiFillPieChart } from 'react-icons/ai'

const Forbidden = lazy(() =>
  lazyRetry(() => import('../pages/Error/Forbidden')),
)
const NotFound = lazy(() => lazyRetry(() => import('../pages/Error/NotFound')))
const Unauthorize = lazy(() =>
  lazyRetry(() => import('../pages/Error/Unauthorize')),
)
const HomePage = lazy(() => lazyRetry(() => import('@/pages/HomePage')))
const TestExam = lazy(() => lazyRetry(() => import('@/pages/TestExam')))
const LevelOverView = lazy(() =>
  lazyRetry(() => import('@/pages/LevelOverView')),
)

const routes: IRoute[] = [
  {
    path: '/',
    key: 'home',
    name: 'Home',
    hidden: true,
    redirect: '/home',
  },
  {
    path: '/home',
    key: '/home',
    name: 'Home',
    icon: AiFillPieChart,
    component: HomePage,
  },
  {
    path: '/trial-exam',
    key: 'test-exam',
    name: 'Test Exam',
    hidden: true,
    component: TestExam,
  },
  {
    path: '/over-view',
    key: 'over-view',
    name: 'Overview',
    hidden: true,
    component: LevelOverView,
  },
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

import { lazy } from 'react'
import IRoute from '../core/objects/IRoute'
import { lazyRetry } from '@/utils/helpers/routes.helper'

//! Pages
const ExercisePage = lazy(() => lazyRetry(() => import('@/pages/ExercisePage')))
const BookStudy = lazy(() => lazyRetry(() => import('@/pages/BookStudy')))
const TestPage = lazy(() => lazyRetry(() => import('@/pages/TestPage')))

const ExerciseScore = lazy(() =>
  lazyRetry(() => import('@/pages/ExercisePage/ExerciseScore')),
)
const ExerciseDetails = lazy(() =>
  lazyRetry(() => import('@/pages/ExercisePage/components/ExerciseDetails')),
)
const LessonDetails = lazy(() =>
  lazyRetry(() => import('@/pages/ExercisePage/components/LessonDetails')),
)
const BookStudyDetails = lazy(() =>
  lazyRetry(() => import('@/pages/BookStudy/components/BookStudyDetails')),
)
const TestDetails = lazy(() =>
  lazyRetry(() => import('@/pages/TestPage/components/TestDetails')),
)
const Exam = lazy(() =>
  lazyRetry(() => import('@/pages/TestPage/components/Exam')),
)

const routes: IRoute[] = [
  {
    path: '/exercise',
    key: 'exercise',
    name: 'Exercise',
    hidden: true,
    component: ExercisePage,
    children: [
      {
        path: '/exercise-details',
        key: 'exercise-details',
        name: 'Exercise Details',
        hidden: true,
        component: ExerciseDetails,
      },
      {
        path: '/lesson-details',
        key: 'lesson-details',
        name: 'Lesson Details',
        hidden: true,
        component: LessonDetails,
      },
      {
        path: '/score',
        key: 'score',
        name: 'Score',
        hidden: true,
        component: ExerciseScore,
      },
    ],
  },
  {
    path: '/study',
    key: 'study',
    name: 'Study',
    hidden: true,
    component: BookStudy,
    children: [
      {
        path: '/study-details',
        key: 'study',
        name: 'Study',
        hidden: true,
        component: BookStudyDetails,
      },
    ],
  },
  {
    path: '/test',
    key: 'test',
    name: 'Test',
    hidden: true,
    component: TestPage,
    children: [
      {
        path: '/test-details',
        key: 'test-details',
        name: 'Test Details',
        hidden: true,
        component: TestDetails,
      },
      {
        path: '/exam',
        key: 'exam',
        name: 'Exam',
        hidden: true,
        component: Exam,
      },
    ],
  },
]

export default routes

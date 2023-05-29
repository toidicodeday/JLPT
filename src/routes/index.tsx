import React, { useEffect, useMemo } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import {
  createProtectedRoute,
  createRoute,
  createUnauthenRoute,
} from '../core/helpers/route.helper'
import publicRoutes from './public-routes'
import pageRoutes from './pages-routes'
import { isConnectedUser } from '@/core/objects/Auth'
import { KEYS } from '@/constants'
import { saveUserInfo, tokenReceived } from '@/store/authSlice'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken } from '@/store/authSlice/selector'
import loginRoutes from './login-routes'
import AuthLayout from '@/layouts/components/AuthLayout'

type Props = {}

const fakeUserMeResponse = {
  data: {
    data: {
      id: 1,
    },
  },
}

const AppRoutes = (props: Props) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const isLogin = useMemo(
    () => Boolean(accessToken) || isConnectedUser(),
    [accessToken],
  )

  const [adminInfo, setAdminInfo] = React.useState<any>(null)

  useEffect(() => {
    const token = Cookies.get(KEYS.ACCESS_TOKEN) || ''
    if (token) {
      dispatch(
        tokenReceived({
          accessToken: token,
        }),
      )
    }
  }, [dispatch])
  useEffect(() => {
    const updateUserMe = async () => {
      // const response = await getUserMe()
      const response = fakeUserMeResponse
      if (response.data?.data.id) {
        setAdminInfo(response.data.data)
        dispatch(saveUserInfo(response.data.data))
      }
    }
    if (isLogin) updateUserMe()
  }, [dispatch, isLogin])

  return (
    <>
      <Routes>
        {publicRoutes.map(route => createRoute(route, ''))}
        {loginRoutes.map(route => createUnauthenRoute(route, '', isLogin))}
        {!isLogin && (
          <Route
            key="loginPath"
            path="*"
            element={<Navigate to="/Login" replace />}
          />
        )}
        {isLogin && (
          <Route element={<AuthLayout />}>
            {pageRoutes.map(route => createProtectedRoute(route, '/'))}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        )}
      </Routes>
    </>
  )
}

export default AppRoutes

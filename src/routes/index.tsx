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
import { saveAuthorizeMe, saveUserInfo, tokenReceived } from '@/store/authSlice'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken } from '@/store/authSlice/selector'
import loginRoutes from './login-routes'
import { SendbirdProvider } from '@/components/SendbirdChat'
import { useLazyGetMeQuery } from '@/services/accountApi/account'
import { checkAuthorize, shortenRoutes } from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { AuthorizeMeType } from '@/store/authSlice/types'
import { AdminMeType } from '@/services/accountApi/types'
import MainLayout from '@/layouts'
import HomePageLayout from '@/layouts/components/HomePageLayout'
import routes from './public-routes'

type Props = {}

const AppRoutes = (props: Props) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const isLogin = useMemo(
    () => Boolean(accessToken) || isConnectedUser(),
    [accessToken],
  )
  const [authorizeStatus, setAuthorizeStatus] =
    React.useState<AuthorizeMeType | null>(null)
  const [adminInfo, setAdminInfo] = React.useState<AdminMeType | null>(null)
  const [getUserMe] = useLazyGetMeQuery()

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
      const response = await getUserMe()
      if (response.data?.data.id) {
        const adminSystemRole = response.data?.data?.isAdmin
          ? [
              {
                systemFunctions: response.data?.data?.superAdminFunctionAction,
              },
            ]
          : response.data?.data?.systemRoles?.map(item => ({
              systemFunctions: item?.systemFunctions,
            }))
        const authorizeInfo = {
          canAccessDashboard: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.dashboard,
            'read',
          ),
          canAccessOrder:
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.txOrder, 'read') ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.cnOrder, 'read'),
          canAccessTxOrder: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.txOrder,
            'read',
          ),
          canAccessCnOrder: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.cnOrder,
            'read',
          ),
          canCreateTxOrder: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.txOrder,
            'create',
          ),
          canCreateCnOrder: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.cnOrder,
            'create',
          ),
          canAccessCustomer: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.customer,
            'read',
          ),
          canAccessPartner: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.partner,
            'read',
          ),
          canAccessVehicleManage:
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.vehicleCategory,
              'read',
            ) ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.vehicle, 'read') ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.driver, 'read') ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.driverTeam, 'read'),
          canAccessVehicleCategory: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.vehicleCategory,
            'read',
          ),
          canCreateVehicleCategory: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.vehicleCategory,
            'create',
          ),
          canAccessVehicle: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.vehicle,
            'read',
          ),
          canCreateVehicle: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.vehicle,
            'create',
          ),
          canAccessDriver: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.driver,
            'read',
          ),
          canCreateDriver: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.driver,
            'create',
          ),
          canAccessDriverTeam: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.driverTeam,
            'read',
          ),
          canCreateDriverTeam: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.driverTeam,
            'create',
          ),
          canAccessAccountManage:
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.account, 'read') ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.authorize,
              'read',
            ) ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.role, 'read'),
          canAccessAccount: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.account,
            'read',
          ),
          canCreateAccount: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.account,
            'create',
          ),
          canAccessAuthorize: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.authorize,
            'read',
          ),
          canAccessRole: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.role,
            'read',
          ),
          canAccessReport:
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.incomeReport,
              'read',
            ) ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.partnerReport,
              'read',
            ),
          canAccessIncomeReport: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.incomeReport,
            'read',
          ),
          canAccessPartnerReport: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.partnerReport,
            'read',
          ),
          canAccessServiceManage:
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.advertisement,
              'read',
            ) ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.promotion,
              'read',
            ) ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.service, 'read'),
          canAccessService: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.service,
            'read',
          ),
          canAccessAdvertisement: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.advertisement,
            'read',
          ),
          canCreateAdvertisement: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.advertisement,
            'create',
          ),
          canAccessPromotion: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.promotion,
            'read',
          ),
          canCreatePromotion: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.promotion,
            'create',
          ),
          canAccessSystemManage:
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.guestType,
              'read',
            ) ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.homeSettings,
              'read',
            ) ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.partnerDiscount,
              'read',
            ) ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.taxSettings,
              'read',
            ) ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.contract, 'read') ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.fitment, 'read') ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.forbiddenRoad,
              'read',
            ) ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.chatCall, 'read') ||
            checkAuthorize(adminSystemRole, SYSTEM_ROLE_KEY.contact, 'read') ||
            checkAuthorize(
              adminSystemRole,
              SYSTEM_ROLE_KEY.notification,
              'read',
            ),
          canAccessGuestType: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.guestType,
            'read',
          ),
          canAccessHomeSettings: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.homeSettings,
            'read',
          ),
          canAccessPartnerDiscount: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.partnerDiscount,
            'read',
          ),
          canCreatePartnerDiscount: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.partnerDiscount,
            'create',
          ),
          canAccessTaxSettings: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.taxSettings,
            'read',
          ),
          canAccessContract: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.contract,
            'read',
          ),
          canCreateContract: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.contract,
            'create',
          ),
          canAccessFitment: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.fitment,
            'read',
          ),
          canAccessForbiddenRoad: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.forbiddenRoad,
            'read',
          ),
          canAccessChatCall: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.chatCall,
            'read',
          ),
          canAccessContact: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.contact,
            'read',
          ),
          canAccessNotification: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.notification,
            'read',
          ),
          canCreateNotification: checkAuthorize(
            adminSystemRole,
            SYSTEM_ROLE_KEY.notification,
            'create',
          ),
        }
        setAdminInfo(response.data.data)
        setAuthorizeStatus(authorizeInfo)
        dispatch(saveUserInfo(response.data.data))
        dispatch(saveAuthorizeMe(authorizeInfo))
      }
    }
    if (isLogin) updateUserMe()
  }, [dispatch, getUserMe, isLogin])

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
            // element={
            //   <SendbirdProvider>
            //     {/* <MainLayout
            //       authorizeStatus={authorizeStatus}
            //       adminInfo={adminInfo}
            //     /> */}
            //     <HomePageLayout
            //       authorizeStatus={authorizeStatus}
            //       adminInfo={adminInfo}
            //     />
            //   </SendbirdProvider>
            // }
          >
            {/* {shortenRoutes(pageRoutes, authorizeStatus).map(route =>
              createProtectedRoute(route, '/'),
            )} */}
            {/* {pageRoutes.map(route =>
              createProtectedRoute(route, '/', isLogin),
            )} */}
            {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
          </Route>
        )}
        {isLogin && authorizeStatus && (
          <Route
            element={
              <SendbirdProvider>
                {/* <MainLayout
                  authorizeStatus={authorizeStatus}
                  adminInfo={adminInfo}
                /> */}
                <HomePageLayout
                  authorizeStatus={authorizeStatus}
                  adminInfo={adminInfo}
                />
              </SendbirdProvider>
            }
          >
            {shortenRoutes(pageRoutes, authorizeStatus).map(route =>
              createProtectedRoute(route, '/'),
            )}
            {/* {pageRoutes.map(route =>
              createProtectedRoute(route, '/', isLogin),
            )} */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        )}
      </Routes>
    </>
  )
}

export default AppRoutes

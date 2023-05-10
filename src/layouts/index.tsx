import React, { Suspense, useMemo } from 'react'
import './index.scss'
import { Layout, Row, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useSbUserInit from '@/components/SendbirdChat/hooks/userHooks/useSbUserInit'
import ModalChat from '@/components/ModalChat'
import { shortenRoutes } from '@/utils/helpers/authorize.helper'
import { AdminMeType } from '@/services/accountApi/types'
import useOnesignal from '@/hooks/useOnesignal'
import { createMenus } from '@/core/helpers/menu.helper'
import routes from '@/routes/pages-routes'
import ASidebar from '@/components/layouts/ASidebar'
import AContent from '@/components/layouts/AContent'
import AHeader from '@/components/layouts/AHeader'

const { Footer } = Layout

interface Props {
  authorizeStatus: { [key: string]: boolean } | null
  adminInfo: AdminMeType | null
}

const MainLayout = ({ authorizeStatus, adminInfo }: Props) => {
  useSbUserInit()
  useOnesignal()
  const menuItems = useMemo(() => {
    return authorizeStatus
      ? createMenus(shortenRoutes(routes, authorizeStatus))
      : undefined
  }, [authorizeStatus])
  const [collapsed, setCollapsed] = React.useState(false)
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <Layout className="font-sans">
      <AHeader adminInfo={adminInfo} showDrawer={showDrawer} />
      <Layout
        className={`relative site-layout h-screen overflow-hidden ${
          collapsed ? 'xl:ml-12' : 'xl:ml-72'
        }  `}
      >
        <ASidebar
          menuItems={menuItems}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          onCloseDrawer={onCloseDrawer}
          openDrawer={openDrawer}
          adminInfo={adminInfo}
        />
        <AContent>
          <Suspense
            fallback={
              <Row
                justify="center"
                align="middle"
                className="max-w-full min-h-screen text-blue-500 text-base"
              >
                <Spin />
              </Row>
            }
          >
            <div className="px-5 flex-grow">
              <Outlet />
            </div>
            <ModalChat />
          </Suspense>
          <Footer style={{ textAlign: 'center' }}>
            <div>Lien Minh Van Tai &copy;{new Date().getFullYear()}</div>
            <div className="text-xs font-bold">ver 1.0.0</div>
          </Footer>
        </AContent>
      </Layout>
    </Layout>
  )
}

export default MainLayout

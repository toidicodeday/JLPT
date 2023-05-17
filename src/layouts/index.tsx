import React, { Suspense } from 'react'
import './index.scss'
import { Layout, Row, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useSbUserInit from '@/components/SendbirdChat/hooks/userHooks/useSbUserInit'
import ModalChat from '@/components/ModalChat'
import { AdminMeType } from '@/services/accountApi/types'
import useOnesignal from '@/hooks/useOnesignal'
import AContent from '@/components/layouts/AContent'
import AHeader from '@/components/layouts/AHeader'
import AFooter from '@/components/layouts/AFooter'

interface Props {
  authorizeStatus: { [key: string]: boolean } | null
  adminInfo: AdminMeType | null
}

const MainLayout = ({ authorizeStatus, adminInfo }: Props) => {
  useSbUserInit()
  useOnesignal()
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  return (
    <Layout className="font-sans">
      <AHeader adminInfo={adminInfo} showDrawer={showDrawer} />
      <Layout className={`relative site-layout h-screen overflow-hidden `}>
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
            <div className="flex-grow">
              <Outlet />
            </div>
            <ModalChat />
          </Suspense>
          <AFooter />
        </AContent>
      </Layout>
    </Layout>
  )
}

export default MainLayout

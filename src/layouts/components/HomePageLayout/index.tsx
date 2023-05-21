import ModalChat from '@/components/ModalChat'
import useSbUserInit from '@/components/SendbirdChat/hooks/userHooks/useSbUserInit'
import AContent from '@/components/layouts/AContent'
import AHeader from '@/components/layouts/AHeader'
import useOnesignal from '@/hooks/useOnesignal'
import { AdminMeType } from '@/services/accountApi/types'
import { Layout, Row, Spin } from 'antd'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderNotLogin from '../../../components/layouts/AHeader/components/HeaderNotLogin'

interface Props {
  authorizeStatus: { [key: string]: boolean } | null
  adminInfo: AdminMeType | null
}

const HomePageLayout = ({ authorizeStatus, adminInfo }: Props) => {
  useSbUserInit()
  useOnesignal()
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  return (
    <Layout className="font-inter">
      {/* <AHeader adminInfo={adminInfo} showDrawer={showDrawer} /> */}
      <HeaderNotLogin adminInfo={adminInfo} showDrawer={showDrawer} />
      <Layout>
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
        </AContent>
      </Layout>
    </Layout>
  )
}

export default HomePageLayout

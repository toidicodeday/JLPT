import React, { Suspense } from 'react'
import { Layout, Row, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import ModalChat from '@/components/ModalChat'
import { AdminMeType } from '@/services/accountApi/types'
import AContent from '@/components/layouts/AContent'
import AHeader from '@/components/layouts/AHeader'
import AFooter from '@/components/layouts/AFooter'

interface Props {
  authorizeStatus: { [key: string]: boolean } | null
  adminInfo: AdminMeType | null
}

const AuthLayout = ({ authorizeStatus, adminInfo }: Props) => {
  return (
    <Layout className="font-inter">
      <AHeader adminInfo={adminInfo} />
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
          <AFooter />
        </AContent>
      </Layout>
    </Layout>
  )
}

export default AuthLayout

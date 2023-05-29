import React, { Suspense } from 'react'
import './index.scss'
import { Layout, Row, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import AContent from '@/components/layouts/AContent'
import AHeader from '@/components/layouts/AHeader'
import AFooter from '@/components/layouts/AFooter'

const MainLayout = () => {
  return (
    <Layout className="font-inter">
      <AHeader />
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
          </Suspense>
          <AFooter />
        </AContent>
      </Layout>
    </Layout>
  )
}

export default MainLayout

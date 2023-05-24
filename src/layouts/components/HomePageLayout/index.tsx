import ModalChat from '@/components/ModalChat'
import AContent from '@/components/layouts/AContent'
import { Layout, Row, Spin } from 'antd'
import React, { PropsWithChildren, Suspense } from 'react'
import HeaderNotLogin from '../../../components/layouts/AHeader/HeaderNotLogin'

const HomePageLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="font-inter">
      <HeaderNotLogin />
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
            <div className="flex-grow">{children}</div>
            <ModalChat />
          </Suspense>
        </AContent>
      </Layout>
    </Layout>
  )
}

export default HomePageLayout

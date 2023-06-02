import AContent from '@/components/layouts/AContent'
import { Layout, Row, Spin } from 'antd'
import React, { PropsWithChildren, Suspense, useMemo } from 'react'
import HeaderNotLogin from '../../../components/layouts/AHeader/HeaderNotLogin'
import AHeader from '@/components/layouts/AHeader'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@/store/authSlice/selector'
import { isConnectedUser } from '@/core/objects/Auth'
import useAutoScrollToTop from '@/hooks/useAutoScrollToTop'

const HomePageLayout = ({ children }: PropsWithChildren) => {
  const accessToken = useSelector(selectAccessToken)
  const isLogin = useMemo(
    () => Boolean(accessToken) || isConnectedUser(),
    [accessToken],
  )
  useAutoScrollToTop()

  return (
    <Layout className="font-inter">
      {isLogin ? <AHeader /> : <HeaderNotLogin />}
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
          </Suspense>
        </AContent>
      </Layout>
    </Layout>
  )
}

export default HomePageLayout

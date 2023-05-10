import React, { useEffect, useState } from 'react'
import { Avatar, Drawer, Layout, Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMenyKeyFromPath } from '@/core/helpers/menu.helper'
import routes from '@/routes/pages-routes'
import styles from './styles.module.scss'
import { useGetDocumentQuery } from '@/services/documentApi'
import { AdminMeType } from '@/services/accountApi/types'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

interface Props {
  menuItems?: MenuItem[]
  collapsed: boolean
  toggleCollapsed: () => void
  onCloseDrawer: () => void
  openDrawer: boolean
  adminInfo?: AdminMeType | null
}

const ASidebar = ({
  menuItems,
  collapsed,
  onCloseDrawer,
  openDrawer,
  adminInfo,
  toggleCollapsed,
}: Props) => {
  const [current, setCurrent] = useState('1')
  const [mounted, setMounted] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { data: documents } = useGetDocumentQuery(
    {
      ref: 'admin',
      refId: Number(adminInfo?.id),
      query: 'limit=1&order=id:desc&search=type:=:0',
    },
    { skip: !adminInfo?.id },
  )

  useEffect(() => {
    const activeMenuKey = getMenyKeyFromPath(routes, location.pathname)
    if (activeMenuKey) setCurrent(activeMenuKey)
    setMounted(true)
  }, [location.pathname, mounted])

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    onCloseDrawer()
  }

  return (
    <React.Fragment>
      <div className="hidden xl:block">
        <Sider
          className="h-screen fixed left-0 bg-white hidden xl:block"
          width={288}
          collapsed={collapsed}
          collapsedWidth={50}
        >
          <div className="relative border-r border-t-0 border-b-0 border-l-0 border-dashed border-grayButton h-full">
            <span
              className={`bg-white rounded-full ${styles.boxShadow} w-5 h-5 absolute -right-[10px] top-40 flex items-center justify-center ${styles.collapeBtn} hover:cursor-pointer z-50 hidden xl:flex`}
              onClick={toggleCollapsed}
            >
              {collapsed ? (
                <MdKeyboardArrowRight className="text-base" />
              ) : (
                <MdKeyboardArrowLeft className="text-base" />
              )}
            </span>
            <div
              className={`h-[calc(100vh-104px)] overflow-auto ${styles.menuSidebar}`}
            >
              <Menu
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                onClick={onClick}
                mode="inline"
                items={menuItems}
              />
            </div>
          </div>
        </Sider>
      </div>
      <div className="block xl:hidden">
        <Drawer
          placement="left"
          closable={false}
          onClose={onCloseDrawer}
          open={openDrawer}
          key="left"
          className={`block xl:hidden ${styles.menuDrawer}`}
          width={300}
        >
          <div className="flex flex-col justify-between items-start">
            <div className="w-full">
              <div
                className="flex items-center rounded-xl bg-slate-100 m-6 px-6 py-4"
                onClick={() => navigate('/profile')}
              >
                <div>
                  <Avatar src={documents?.data?.[0]?.document?.url} size={38} />
                </div>
                <div className="ml-2.5">
                  <div className="font-bold">{adminInfo?.name}</div>
                  <div className="text-xs">Quản lý</div>
                </div>
              </div>
              <div
                className={`h-[calc(100vh-104px)] overflow-auto ${styles.menuSidebar}`}
              >
                <Menu
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[current]}
                  onClick={onClick}
                  mode="inline"
                  items={menuItems}
                />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  )
}

export default ASidebar

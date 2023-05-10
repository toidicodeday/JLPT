import React, { useState } from 'react'
import { Button, Layout, Badge, Popover, Tooltip, Divider, Avatar } from 'antd'
import { MdNotifications } from 'react-icons/md'
import NotiModal from './components/NotificationModal'
import { RiMessengerFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import useSbChannelUnreadCount from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelUnreadCount'
import {
  useGetCountAccountNotifyNotSeenQuery,
  useUpdatePlayerIdWhenSignOutMutation,
} from '@/services/notificationApi'
import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
import { useGetDocumentQuery } from '@/services/documentApi'
import { AdminMeType } from '@/services/accountApi/types'
import { HiOutlineLogout, HiOutlineMenuAlt2 } from 'react-icons/hi'
import { loggedOut } from '@/store/authSlice'
import { useDispatch } from 'react-redux'

const { Header } = Layout

interface Props {
  adminInfo?: AdminMeType | null
  showDrawer: () => void
}

const AHeader = ({ adminInfo, showDrawer }: Props) => {
  const [open, setOpen] = useState(false)
  const [openAccPopover, setOpenAccPopover] = useState(false)
  const { unreadChannelCount } = useSbChannelUnreadCount({
    customeTypes: [
      SB_GROUP_CUSTOM_TYPE.ADMIN_ADMIN,
      SB_GROUP_CUSTOM_TYPE.SUPPORT_DRIVER,
      SB_GROUP_CUSTOM_TYPE.SUPPORT_GUEST,
      SB_GROUP_CUSTOM_TYPE.ORDER_DRIVER,
      SB_GROUP_CUSTOM_TYPE.ORDER_GUEST,
    ],
  })
  const { data: countMessageNotSeen } = useGetCountAccountNotifyNotSeenQuery({
    query: '',
  })
  const { data: documents } = useGetDocumentQuery(
    {
      ref: 'admin',
      refId: Number(adminInfo?.id),
      query: 'limit=1&order=id:desc&search=type:=:0',
    },
    { skip: !adminInfo?.id },
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [updatePlayerIdWhenSignOut] = useUpdatePlayerIdWhenSignOutMutation()
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const handleOpenAccPopoverChange = (newOpen: boolean) => {
    setOpenAccPopover(newOpen)
  }
  const handleLogout = async () => {
    // ctx?.sendbird.disconnect()

    await updatePlayerIdWhenSignOut({
      userId: Number(adminInfo?.id),
      currentPlayerId: localStorage.getItem('player_id'),
    })
    dispatch(loggedOut())
    navigate('/login')
  }

  return (
    <Header
      className="site-layout-background sticky z-40 w-full top-0 left-0 bg-[#24292e]"
      style={{ padding: 0, backgroundColor: '#606168', color: '#FFF' }}
    >
      <div className="h-full flex items-center justify-end px-5 p-0 shadow-sm">
        <HiOutlineMenuAlt2
          className="text-3xl text-[#00ffff] inline-block xl:hidden"
          onClick={showDrawer}
        />
        <div className="flex items-center justify-end flex-1">
          <Badge
            count={unreadChannelCount || 0}
            style={{ color: '#FFF', fontSize: '10px' }}
            className="mr-4"
            size="small"
          >
            <Button
              type="text"
              icon={<RiMessengerFill className="text-2xl text-white" />}
              onClick={() => navigate('/chat')}
            ></Button>
          </Badge>
          <Popover
            placement="bottomRight"
            content={
              <NotiModal closePopover={() => setOpen(false)} isOpen={open} />
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Badge
              count={countMessageNotSeen?.data?.count}
              style={{ color: '#FFF', fontSize: '10px' }}
              className="mr-4"
              size="small"
            >
              <Button
                type="text"
                icon={<MdNotifications className="text-2xl text-white" />}
              ></Button>
            </Badge>
          </Popover>
          <Popover
            content={
              <div>
                <div>
                  <p className="text-sm font-bold">{adminInfo?.name}</p>
                  <p className="text-xs">{adminInfo?.email}</p>
                </div>
                <Divider className="my-3" dashed />
                <div
                  className="mb-3"
                  onClick={() => {
                    navigate('/profile')
                    setOpenAccPopover(false)
                  }}
                >
                  Trang cá nhân
                </div>
                <div onClick={handleLogout}>Đăng xuất</div>
              </div>
            }
            trigger="click"
            placement="bottomLeft"
            open={openAccPopover}
            onOpenChange={handleOpenAccPopoverChange}
          >
            <Button
              type="text"
              icon={
                <Avatar src={documents?.data?.[0]?.document?.url} size={30} />
              }
              className="flex items-center justify-center xl:hidden"
            ></Button>
          </Popover>
          <div className="hidden xl:flex items-center">
            <Divider type="vertical" className="border-l-grayButton" />
            <div
              className="flex items-center hover:cursor-pointer mx-4"
              onClick={() => navigate('/profile')}
            >
              <Avatar src={documents?.data?.[0]?.document?.url} size={40} />
              <div className="ml-2">
                <div className="leading-4 font-bold">{adminInfo?.name}</div>
                <div className="leading-4 text-grayButton text-xs">
                  {adminInfo?.systemRoles?.[0]?.name}
                </div>
              </div>
            </div>
            <Divider type="vertical" className="border-l-grayButton" />
            <Tooltip placement="bottomLeft" title="Đăng xuất">
              <Button
                type="text"
                icon={<HiOutlineLogout className="text-xl text-white" />}
                className="flex items-center justify-center"
                onClick={handleLogout}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default AHeader

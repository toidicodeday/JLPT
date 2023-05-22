import React from 'react'
import { Button, Layout, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import useSbChannelUnreadCount from '@/components/SendbirdChat/hooks/channelHooks/useSbChannelUnreadCount'
import { useUpdatePlayerIdWhenSignOutMutation } from '@/services/notificationApi'
import { SB_GROUP_CUSTOM_TYPE } from '@/components/SendbirdChat/constant/sendbird.constant'
import { HiOutlineLogout, HiOutlineMenuAlt2 } from 'react-icons/hi'
import { loggedOut } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useGetDocumentQuery } from '@/services/documentApi'
import { AdminMeType } from '@/services/accountApi/types'

const { Header } = Layout

interface Props {
  adminInfo?: AdminMeType | null
  showDrawer: () => void
}

const HeaderNotLogin = ({ adminInfo, showDrawer }: Props) => {
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
      className="site-layout-background sticky z-40 w-full top-0 left-0 bg-[white]"
      style={{ padding: 0, backgroundColor: '#606168', color: '#FFF' }}
    >
      <div className="h-full flex items-center justify-between lg:px-32 md:px-32 sm:px-32 max-[640px]:px-20 p-0 shadow-sm">
        <Link to={'/home'}>
          <Typography className="text-[#FB3457] font-semibold text-2xl cursor-pointer hover:opacity-80">
            tuhocjlpt
          </Typography>
        </Link>
        <Button
          type="text"
          className="bg-[#FB3357] rounded-[20px] text-white"
          onClick={handleLogout}
        >
          Đăng nhập
        </Button>
      </div>
    </Header>
  )
}

export default HeaderNotLogin

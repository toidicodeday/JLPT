import React from 'react'
import { Button, Layout, Tooltip, Divider, Avatar, Typography } from 'antd'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { loggedOut } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import avatarImg from '../../../assets/img/images/avatar.jpg'

const { Header } = Layout

const AHeader = () => {
  const navbars = [
    {
      id: 1,
      label: 'Luyện bài tập',
      path: '/exercise',
    },
    {
      id: 2,
      label: 'Luyện sách',
      path: '/study',
    },
    {
      id: 3,
      label: 'Luyện đề',
      path: '/test',
    },
    {
      id: 4,
      label: 'Thi thử',
      path: '/trial-exam',
    },
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(loggedOut())
    navigate('/login')
  }

  return (
    <Header
      className="site-layout-background sticky z-40 w-full top-0 left-0 bg-[white]"
      style={{ padding: 0, backgroundColor: '#606168', color: '#FFF' }}
    >
      <div className="h-full flex items-center xl:justify-end max-lg:justify-between md:px-32 max-md:px-10 shadow-sm">
        <Typography
          className="text-[#FB3457] font-semibold text-2xl cursor-pointer hover:opacity-80"
          onClick={() => navigate('/home')}
        >
          tuhocjlpt
        </Typography>
        <div className="flex items-center justify-end flex-1 max-lg:flex-grow-0">
          <div className=" font-normal text-sm flex gap-5 cursor-pointer max-lg:hidden">
            {navbars.map(item => (
              <Link
                key={item.id}
                className="flex items-center gap-3 hover:text-[#FB3457] text-[#707070]"
                to={item.path}
              >
                {item.label}
                <BsFillCaretDownFill className="text-[#CCCCCC] text-xs" />
              </Link>
            ))}
          </div>
          <div className="hidden xl:flex items-center">
            <Divider type="vertical" className="border-l-grayButton" />
            <div className="flex items-center hover:cursor-pointer mx-4">
              <Avatar size={40} src={avatarImg} />
              <div className="ml-2">
                <div className="leading-4 text-black font-normal text-xs">
                  Nguyễn Đức Anh
                </div>
              </div>
            </div>
            <Divider type="vertical" className="border-l-grayButton" />
            <Tooltip placement="bottomLeft" title="Đăng xuất">
              <Button
                type="text"
                icon={<HiOutlineLogout className="text-xl text-[#868686]" />}
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

import React from 'react'
import { Button, Layout, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Header } = Layout

const HeaderNotLogin = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
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
          // TODO handle sign in button
          onClick={handleLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </Header>
  )
}

export default HeaderNotLogin

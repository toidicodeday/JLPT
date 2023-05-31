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
      <div className="h-full flex items-center justify-between sm:px-32 max-sm:px-6  shadow-sm">
        <Link to={'/home'}>
          <Typography className="text-[#FB3457] font-semibold sm:text-2xl max-sm:text-xl cursor-pointer hover:opacity-80">
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

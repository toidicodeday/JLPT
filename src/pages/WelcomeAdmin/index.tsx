import { MobileWelcome } from '@/assets/img'
import { AdminMeType } from '@/services/accountApi/types'
import { selectUserMe } from '@/store/authSlice/selector'
import React from 'react'
import { useSelector } from 'react-redux'

const WelcomeAdmin = () => {
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  return (
    <div className="h-full xl:bg-welcome-pattern bg-no-repeat bg-cover pt-20 bg-right-bottom">
      <div className="text-[32px]">
        Xin chào, <span className="text-[#414184]">{adminInfo?.name}</span>
      </div>
      <div className="text-[20px] mt-2">
        Thành Hưng chúc bạn một ngày làm việc vui vẻ!
      </div>
      <div className="xl:hidden mt-8">
        <img width="100%" src={MobileWelcome} alt="MobileWelcome" />
      </div>
    </div>
  )
}

export default WelcomeAdmin

import Button from '@/components/Button'
import AuthLayout from '@/pages/Auth/AuthLayout'
import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'

const AuthPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate()

  const handleGoToAuthOTP = () => {
    navigate('/auth-otp-number')
  }

  return (
    <AuthLayout>
      <div className="bg-white p-12 mx-auto relative">
        <p className="text-2xl font-bold text-center mb-14">Đăng nhập</p>
        <p className="text-2xl text-center mb-10">Nhập số điện thoại của bạn</p>
        <OtpInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          numInputs={10}
          renderInput={props => (
            <input
              {...props}
              className="w-10 h-12 max-sm:w-8 max-sm:h-10 max-sm:ml-1 ml-3 rounded font-bold text-xl border-solid border-smokeyGrey"
            />
          )}
          shouldAutoFocus
        />
        <Button
          type="primary"
          label="Tiếp tục"
          className="mt-10 px-11 h-10 rounded-3xl left-1/2 -translate-x-1/2 hover:opacity-80"
          onClick={handleGoToAuthOTP}
        />
      </div>
    </AuthLayout>
  )
}

export default AuthPhoneNumber

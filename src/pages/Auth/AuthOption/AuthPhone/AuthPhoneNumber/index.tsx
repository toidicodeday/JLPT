import Button from '@/components/Button'
import AuthLayout from '@/pages/Auth/AuthLayout'
import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'

const AuthPhoneNumber = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const HandleGoToAuthOTP = () => {
    navigate('/auth-otp-number')
  }

  return (
    <AuthLayout>
      <div className="bg-white p-12 mx-auto relative">
        <p className="text-2xl font-bold text-center mb-14">Đăng nhập</p>
        <p className="text-2xl text-center mb-10">Nhập số điện thoại của bạn</p>
        <OtpInput
          inputStyle={{
            width: '40px',
            height: '50px',
            marginLeft: '10px',
            borderRadius: '4px',
            fontWeight: '700',
            fontSize: '20px',
          }}
          value={otp}
          onChange={setOtp}
          numInputs={10}
          renderInput={props => <input {...props} />}
          shouldAutoFocus
        />
        <Button
          type="primary"
          label="Tiếp tục"
          className="mt-10 px-11 h-10 rounded-3xl left-1/2 -translate-x-1/2 hover:opacity-80"
          onClick={HandleGoToAuthOTP}
        />
      </div>
    </AuthLayout>
  )
}

export default AuthPhoneNumber

import { KEYS } from '@/constants/keys'
import { MESSAGES } from '@/constants/messages'
import AuthLayout from '@/pages/Auth/AuthLayout'
import { useTypedDispatch } from '@/store'
import { saveAccInfo, tokenReceived } from '@/store/authSlice'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const fakeAuthResponse = {
  data: {
    account: { phone: '324324', email: 'fsdfsd' },
    accessToken: 'sdfsdf',
    refreshToken: 'ádfsd',
  },
}

const numberInputs = 6

const AuthPhoneOTP = () => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const [otp, setOtp] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLogin = () => {
    try {
      const loginRes = fakeAuthResponse
      if (otp.length === numberInputs) {
        dispatch(
          saveAccInfo({
            account: loginRes?.data?.account,
          }),
        )
        dispatch(
          tokenReceived({
            accessToken: loginRes?.data?.accessToken,
            refreshToken: loginRes?.data?.refreshToken,
          }),
        )
        Cookies.set(KEYS.ACCESS_TOKEN, loginRes?.data?.accessToken || '')
        Cookies.set(KEYS.REFRESH_TOKEN, loginRes?.data?.refreshToken || '')

        toast.success(MESSAGES.SUCESS_LOGIN)
        if (otp.length === numberInputs) {
          navigate('/exercise')
        }
      }
      if ('error' in loginRes) {
        toast.error(
          get(loginRes.error, 'data.error.message') || MESSAGES.ERROR_LOGIN,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.ERROR_LOGIN)
    }
  }

  useEffect(() => {
    if (otp.length >= numberInputs) {
      handleLogin()
    }
  }, [otp, handleLogin])

  return (
    <AuthLayout>
      <div className="bg-white p-12 mx-auto">
        <p className="text-2xl font-bold text-center mb-14">Đăng nhập</p>
        <p className="text-2xl text-center mb-10">Nhập OTP</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={numberInputs}
          renderInput={props => (
            <input
              {...props}
              className="w-10 h-12 ml-3 rounded font-bold text-xl border-smokeyGrey border-solid"
            />
          )}
          shouldAutoFocus
        />
      </div>
    </AuthLayout>
  )
}

export default AuthPhoneOTP

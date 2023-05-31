import { KEYS } from '@/constants/keys'
import { MESSAGES } from '@/constants/messages'
import AuthLayout from '@/pages/Auth/AuthLayout'
import { useTypedDispatch } from '@/store'
import { saveAccInfo, tokenReceived } from '@/store/authSlice'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import React, { useState } from 'react'
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

const AuthPhoneOTP = () => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()
  const [otp, setOtp] = useState('')
  const numberInputs = 6
  if (otp.length === numberInputs) {
    try {
      // TODO [login] chưa có api login,
      // const loginRes = await loginAdmin(values)
      // fake login response
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

  return (
    <AuthLayout>
      <div className="bg-white p-12 mx-auto">
        <p className="text-2xl font-bold text-center mb-14">Đăng nhập</p>
        <p className="text-2xl text-center mb-10">Nhập OTP</p>
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
          numInputs={numberInputs}
          renderInput={props => <input {...props} />}
          shouldAutoFocus
        />
      </div>
    </AuthLayout>
  )
}

export default AuthPhoneOTP

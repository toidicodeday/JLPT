import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedDispatch } from '@/store'
import Cookies from 'js-cookie'
import { KEYS, MESSAGES } from '@/constants'
import { saveAccInfo, tokenReceived } from '@/store/authSlice'
import '../styles.scss'
import { get } from 'lodash'
import AuthLayout from '../AuthLayout'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const fakeAuthResponse = {
  data: {
    account: { phone: '324324', email: 'fsdfsd' },
    accessToken: 'sdfsdf',
    refreshToken: 'ádfsd',
  },
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const handleLogin = async (values: any) => {
    try {
      const loginRes = fakeAuthResponse
      if ('data' in loginRes) {
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
        navigate('/exercise')
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

  const handleAuthPhoneNumber = () => {
    navigate('/auth-phone-number')
  }

  return (
    <AuthLayout>
      <div className="flex justify-center items-center">
        <div>
          <div className="w-full max-w-lg bg-white p-6 sm:p-12 mx-auto">
            <p className="text-2xl font-bold text-center">Đăng nhập</p>
            <div className="mt-20">
              <div
                className="border border-solid border-aquaGreen px-4 lg:px-9 py-3 text-aquaGreen flex justify-center font-bold text-sm lg:text-xl rounded-xl mb-10 cursor-pointer"
                onClick={handleAuthPhoneNumber}
              >
                <div className="flex gap-5">
                  <MdOutlinePhoneAndroid className="text-2xl" />
                  <p>Đăng nhập bằng số điện thoại</p>
                </div>
              </div>
              <div
                className="border border-solid border-crystalBlue px-4 lg:px-9 py-3 text-crystalBlue flex justify-center font-bold text-sm lg:text-xl rounded-xl mb-10 cursor-pointer"
                onClick={handleLogin}
              >
                <div className="flex items-center gap-5">
                  <AiFillFacebook className="text-2xl" />
                  <p>Đăng nhập bằng Facebook</p>
                </div>
              </div>
              <div
                className="border border-solid border-selectiveYellow px-4 lg:px-9 py-3 text-selectiveYellow flex justify-center gap-5 font-bold text-sm lg:text-xl rounded-xl mb-10 cursor-pointer"
                onClick={handleLogin}
              >
                <div className="flex gap-5">
                  <FcGoogle className="text-2xl" />
                  <p>Đăng nhập với Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login

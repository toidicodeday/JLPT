import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTypedDispatch } from '@/store'
import Cookies from 'js-cookie'
import { KEYS, MESSAGES } from '@/constants'
import { saveAccInfo, tokenReceived } from '@/store/authSlice'
import '../styles.scss'
import { get } from 'lodash'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
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
      // TODO [login] chưa có api login,
      // const loginRes = await loginAdmin(values)
      // fake login response
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

  const onFinishFailed = () => {
    toast.error(MESSAGES.ERROR_LOGIN)
  }

  const handleAuthPhoneNumber = () => {
    navigate('/auth-phone-number')
  }

  return (
    <AuthLayout>
      <div className="flex justify-center">
        <div>
          <div className="sm:w-[28rem] md:w-[32rem] bg-white p-12 xl:mt-16 mx-auto">
            <p className="text-2xl font-bold text-center">Đăng nhập</p>
            {/* <Form
              name="roleForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              onFinishFailed={onFinishFailed}
              className="mt-10"
            >
              <div className="relative mb-3">
                <Form.Item
                  label="Tên đăng nhập"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập địa chỉ email của bạn!',
                    },
                    { type: 'email', message: 'Email không đúng định dạng!' },
                  ]}
                >
                  <Input size="large" prefix={<UserOutlined />} />
                </Form.Item>
              </div>
              <div className="relative mb-3">
                <Form.Item
                  label="Mật khẩu"
                  name={'password'}
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập mật khẩu của bạn!',
                    },
                  ]}
                >
                  <Input.Password size="large" prefix={<LockOutlined />} />
                </Form.Item>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline hover:underline-offset-2 flex justify-end mb-10"
              >
                Quên mật khẩu?
              </Link>
              <Form.Item>
                <Button block type="primary" size="large" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form> */}
            <div className="mt-20">
              <div
                className="border border-solid border-aquaGreen px-9 py-3 text-aquaGreen flex justify-center font-bold text-xl rounded-xl mb-10 cursor-pointer"
                onClick={handleAuthPhoneNumber}
              >
                <div className="flex gap-5">
                  <MdOutlinePhoneAndroid className="text-2xl" />
                  <p>Đăng nhập bằng số điện thoại</p>
                </div>
              </div>
              <div
                className="border border-solid border-crystalBlue px-9 py-3 text-crystalBlue flex justify-center font-bold text-xl rounded-xl mb-10 cursor-pointer"
                onClick={handleLogin}
              >
                <div className="flex items-center gap-5">
                  <AiFillFacebook className="text-2xl" />
                  <p>Đăng nhập bằng Facebook</p>
                </div>
              </div>
              <div
                className="border border-solid border-selectiveYellow px-9 py-3 text-selectiveYellow flex justify-center gap-5 font-bold text-xl rounded-xl mb-10 cursor-pointer"
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

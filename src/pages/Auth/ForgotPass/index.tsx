import { Button, Divider, Form, Input, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForgotPassMutation } from '../../../services/authApi'
import '../styles.scss'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'
import AuthLayout from '../AuthLayout'

const ForgotPassword = () => {
  const [forgotPass, { isLoading }] = useForgotPassMutation()
  const handleForgotPass = async (values: any) => {
    try {
      const forgotRes = await forgotPass({
        email: values.email,
        returnUrl: `${import.meta.env.VITE_SITE_URL}/reset-password`,
      })
      if ('data' in forgotRes) {
        toast.success('Link cập nhật mật khẩu đã được gửi đến email của bạn!')
      }
      if ('error' in forgotRes) {
        toast.error(
          get(forgotRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <AuthLayout>
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl text-center font-bold text-[#018ab9] hidden xl:block">
            HỆ THỐNG QUẢN LÝ LIÊN MINH VẬN TẢI
          </h1>
          <div className="auth-card sm:w-[28rem] md:w-[32rem] xl:w-[38rem] bg-white p-12 xl:mt-16 rounded-2xl mx-auto">
            <p className="text-2xl font-bold text-center">Quên mật khẩu</p>
            <Typography className="text-center mt-10 text-base font-normal">
              Vui lòng nhập email để nhận chỉ dẫn từ LIÊN MINH VẬN TẢI.
            </Typography>
            <Form
              name="roleForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={handleForgotPass}
              className="mt-10"
            >
              <div className="relative mb-3">
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập địa chỉ email của bạn!',
                    },
                    { type: 'email', message: 'Email không đúng định dạng!' },
                  ]}
                >
                  <Input size="large" placeholder="Nhập email" />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={isLoading}
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <Link to="/login" className="hover:underline">
              Bạn đã có tài khoản?
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword

import { Button, Form, Input } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useResetPassMutation } from '../../../services/authApi'
import '../styles.scss'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'
import AuthLayout from '../AuthLayout'

const ResetPassword = () => {
  const [resetPass, { isLoading }] = useResetPassMutation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleResetPass = async (values: {
    password: string
    confirmPassword: string
  }) => {
    try {
      const resetRes = await resetPass({
        password: values.password,
        confirmPassword: values.confirmPassword,
        token: location.search.replace('?token=', ''),
      })
      if ('data' in resetRes) {
        toast.success('Cập nhật mật khẩu thành công!')
        navigate('/login')
      }
      if ('error' in resetRes)
        toast.error(
          get(resetRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
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
            <Form
              name="roleForm"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={handleResetPass}
              className="mt-10"
            >
              <div className="relative mb-3">
                <Form.Item
                  label=""
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập mật khẩu của bạn!',
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Nhập mật khẩu mới"
                  />
                </Form.Item>
              </div>
              <div className="relative mb-3">
                <Form.Item
                  label=""
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập lại mật khẩu của bạn!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp'))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Nhập lại mật khẩu mới"
                  />
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
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword

import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import { InputConfirmPassword, InputPassword } from '@/components/inputs'
import { useChangeMyPassMutation } from '@/services/accountApi/account'
import { toast } from 'react-toastify'

const ChangeProfilePass = () => {
  const [changeMyPass, { isLoading }] = useChangeMyPassMutation()
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    try {
      const response = await changeMyPass({
        body: {
          ...values,
        },
      })
      if ('data' in response) {
        toast.success('Cập nhật mật khẩu thành công!')
        form.resetFields()
      }
      if ('error' in response)
        toast.error('Cập nhật mật khẩu có lỗi. Vui lòng thử lại sau.')
    } catch (error) {
      toast.error('Cập nhật mật khẩu có lỗi. Vui lòng thử lại sau.')
    }
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
    >
      <InputPassword
        labelText="Mật khẩu cũ"
        propName="oldPassword"
        errorMess="Hãy nhập mật khẩu hiện tại của bạn!"
        formProp={Form}
      />
      <InputPassword
        labelText="Mật khẩu mới"
        propName="newPassword"
        errorMess="Hãy nhập mật khẩu mới của bạn!"
      />
      <InputConfirmPassword
        labelText="Nhập lại mật khẩu mới"
        propName="confirmPassword"
        dependencies="newPassword"
        errorMess="Hãy xác nhận mật khẩu mới của bạn!"
      />
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Form.Item>
            <div>
              <Button
                type="primary"
                style={{ width: '100%' }}
                htmlType="submit"
                loading={isLoading}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Col>
        <Col span={6}></Col>
      </Row>
    </Form>
  )
}

export default ChangeProfilePass

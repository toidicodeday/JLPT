import { Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import React from 'react'

interface Props {
  labelText: string
  placeholder?: string
  propName?: string
  errorMess?: string
  formProp?: any
}

const InputPassword = (props: Props) => {
  return (
    <Form.Item
      label={props.labelText}
      name={props?.propName ? props?.propName : 'password'}
      rules={[
        {
          required: true,
          message: props?.errorMess
            ? props?.errorMess
            : 'Hãy nhập mật khẩu của bạn!',
        },
      ]}
    >
      <Input.Password
        size="large"
        prefix={<LockOutlined />}
        placeholder={props?.placeholder}
      />
    </Form.Item>
  )
}

export default InputPassword

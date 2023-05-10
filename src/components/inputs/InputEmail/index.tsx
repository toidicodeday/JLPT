import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'

interface Props {
  labelText: string
  placeholder?: string
  noPrefix?: boolean
}

const InputEmail = (props: Props) => {
  return (
    <Form.Item
      label={props.labelText}
      name="email"
      rules={[
        {
          required: true,
          message: 'Hãy nhập địa chỉ email của bạn!',
        },
        { type: 'email', message: 'Email không đúng định dạng!' },
      ]}
    >
      <Input
        size="large"
        prefix={props?.noPrefix ? <></> : <UserOutlined />}
        placeholder={props?.placeholder}
      />
    </Form.Item>
  )
}

export default InputEmail

import { Form, Input } from 'antd'
import React from 'react'

const InputName = () => {
  return (
    <Form.Item
      label="Họ và tên"
      name="name"
      rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
    >
      <Input />
    </Form.Item>
  )
}

export default InputName

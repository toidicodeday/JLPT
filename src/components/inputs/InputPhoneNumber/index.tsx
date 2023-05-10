import { Form, Input } from 'antd'
import React from 'react'

const InputPhoneNumber = () => {
  return (
    <Form.Item
      label="Số điện thoại"
      name="phone"
      rules={[
        { required: true, message: 'Hãy nhập số điện thoại!' },
        {
          validator(_, value) {
            const regexString = new RegExp(/([3|5|7|8|9])+([0-9]{8})\b/g)
            if (regexString.test(value) || !value) {
              return Promise.resolve()
            }
            return Promise.reject(
              new Error('Số điện thoại chưa đúng định dạng'),
            )
          },
        },
      ]}
    >
      <Input prefix="+84" maxLength={9} />
    </Form.Item>
  )
}

export default InputPhoneNumber

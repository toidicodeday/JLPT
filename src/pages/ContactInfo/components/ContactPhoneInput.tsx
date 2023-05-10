import { PhoneOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'

interface Props {
  name: string
  title: string
}

const ContactPhoneInput = ({ name, title }: Props) => {
  return (
    <Form.List name={name}>
      {fields => {
        return (
          <div className="mb-6">
            <p className="font-bold text-sm">{title}</p>
            {fields.map((field, index) => (
              <div className="flex md:w-2/5 sm:w-3/5" key={field.key}>
                <PhoneOutlined className="m-2 text-sm" />
                <Form.Item
                  key={field.key}
                  name={[field.name, 'phone']}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                    { min: 8, message: 'Yêu cầu ít nhất 8 số' },
                    {
                      validator(_, value) {
                        const regexString = new RegExp(
                          /^([+|0-9])+([0-9]{7,11})\b/g,
                        )
                        if (regexString.test(value) || !value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error('Số điện thoại chưa đúng định dạng'),
                        )
                      },
                    },
                  ]}
                  className="w-full mb-0"
                >
                  <Input maxLength={12} />
                </Form.Item>
              </div>
            ))}
          </div>
        )
      }}
    </Form.List>
  )
}

export default ContactPhoneInput

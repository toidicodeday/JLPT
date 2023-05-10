import { Form, Input } from 'antd'
import { max } from 'lodash'
import React from 'react'

interface Props {
  lable?: string
  name: string
  required?: boolean
  maxLength?: number
  minLength?: number
}

const FormInputText = ({ lable, name, required, maxLength }: Props) => {
  return (
    <Form.Item
      label={lable}
      name={name}
      rules={[
        {
          required: required,
          message: 'Trường này không được để trống',
        },
      ]}
    >
      <Input maxLength={maxLength} />
    </Form.Item>
  )
}

export default FormInputText

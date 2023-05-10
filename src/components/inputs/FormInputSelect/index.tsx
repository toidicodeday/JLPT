import { Form, Select } from 'antd'
import React from 'react'

interface Props {
  lable?: string
  name: string
  options: { value: string | number; label: string }[] | undefined
  required?: boolean
  mode?: 'multiple' | 'tags'
  placeholder?: string
}
const FormInputSelect = ({
  lable,
  name,
  options,
  required,
  mode,
  placeholder,
}: Props) => {
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
      <Select
        className="w-full"
        options={options}
        mode={mode}
        placeholder={placeholder}
        allowClear
      />
    </Form.Item>
  )
}

export default FormInputSelect

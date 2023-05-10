import { Form, InputNumber } from 'antd'
import React from 'react'

interface Props {
  lable?: string
  name: string
  errorMess?: string
  onChange?: (values: any) => void
  precision?: number
}
const InputPercent = (props: Props) => {
  return (
    <Form.Item
      label={props.lable}
      name={props.name}
      rules={[
        {
          required: true,
          message: props?.errorMess,
        },
      ]}
    >
      <InputNumber
        addonAfter="%"
        className="w-full"
        onChange={props.onChange}
        precision={props.precision}
      />
    </Form.Item>
  )
}
export default InputPercent

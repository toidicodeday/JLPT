import { GENDER } from '@/utils/constant/constant'
import { Form, Radio } from 'antd'
import React from 'react'

interface Props {
  required?: boolean
}
const GenderSelection = ({ required }: Props) => {
  return (
    <Form.Item
      label="Giới tính"
      name="gender"
      rules={[{ required: required }]}
      initialValue={GENDER.MALE}
    >
      <Radio.Group>
        <Radio value={GENDER.MALE}> Nam </Radio>
        <Radio value={GENDER.FEMALE}> Nữ </Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default GenderSelection

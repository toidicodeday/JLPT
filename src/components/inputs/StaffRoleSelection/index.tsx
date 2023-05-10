import { Form, Select } from 'antd'
import React from 'react'

interface Props {
  disabled?: boolean
  required?: boolean
}

const StaffRoleSelection = (props: Props) => {
  return (
    <Form.Item
      label="Quyền"
      name="role"
      rules={[
        {
          required: props?.required ? props?.required : true,
          message: 'Hãy chọn quyền tài khoản!',
        },
      ]}
    >
      <Select disabled={props?.disabled}>
        <Select.Option value="AM">Admin</Select.Option>
        <Select.Option value="QL">Quản lý</Select.Option>
        <Select.Option value="KD">Nhân viên kinh doanh</Select.Option>
      </Select>
    </Form.Item>
  )
}

export default StaffRoleSelection

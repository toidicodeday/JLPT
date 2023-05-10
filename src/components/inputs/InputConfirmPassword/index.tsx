import { LockOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'

interface Props {
  labelText: string
  placeholder?: string
  propName?: string
  dependencies?: string
  errorMess?: string
}

const InputConfirmPassword = (props: Props) => {
  return (
    <Form.Item
      label={props.labelText}
      name={props?.propName ? props?.propName : 'confirmPassword'}
      dependencies={[props?.dependencies ? props?.dependencies : 'newPassword']}
      rules={[
        {
          required: true,
          message: props?.errorMess
            ? props?.errorMess
            : 'Hãy nhập lại mật khẩu của bạn!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              !value ||
              getFieldValue(
                props?.dependencies ? props?.dependencies : 'password',
              ) === value
            ) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('Mật khẩu không khớp'))
          },
        }),
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

export default InputConfirmPassword

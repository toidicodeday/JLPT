import { Form, Switch, Typography } from 'antd'
import React from 'react'

interface Props {
  label: string
  uncheckText: string
  checkText: string
  formName: string
}

const SwitchCase = (props: Props) => {
  return (
    <Form.Item
      label={props.label}
      name={props.formName}
      valuePropName="checked"
    >
      <Switch
        checkedChildren={
          <Typography className="text-white w-16 text-center">
            {props.checkText}
          </Typography>
        }
        unCheckedChildren={
          <Typography className="w-16 text-center">
            {props.uncheckText}
          </Typography>
        }
      />
    </Form.Item>
  )
}

export default SwitchCase

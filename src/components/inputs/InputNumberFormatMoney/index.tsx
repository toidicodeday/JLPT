import { InputNumber, InputNumberProps } from 'antd'
import React from 'react'

interface Props {
  classNameAddon?: string
  addonAfterText?: string
  label?: string
  className?: string
}

const InputNumberFormatMoney = ({
  classNameAddon,
  addonAfterText,
  className,
  ...inputProps
}: Props & InputNumberProps) => {
  return (
    <InputNumber
      {...inputProps}
      className={className ? className : 'w-full'}
      addonAfter={
        addonAfterText ? (
          <p className={classNameAddon}>{addonAfterText}</p>
        ) : (
          inputProps.addonAfter || ''
        )
      }
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value!.replace(/\$\s?|(,*)/g, '')}
    />
  )
}

export default InputNumberFormatMoney

import { Radio, RadioChangeEvent, Space } from 'antd'
import React, { useMemo, useState } from 'react'

type Props = {
  value?: string | number
  options?: { label: React.ReactNode; value: string | number }[]
  onChange?: (value: string | number) => void
  disabled?: boolean
  optionClassName?: string
}

const RadioGroup = ({
  value,
  options,
  onChange,
  disabled,
  optionClassName,
}: Props) => {
  const [radioValue, setRadioValue] = useState(value)

  const handleChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
    onChange?.(e.target.value)
  }

  const memoValue = useMemo(() => {
    if (value === undefined) return radioValue
    return value
  }, [radioValue, value])

  return (
    <div>
      <Radio.Group
        onChange={handleChange}
        value={memoValue}
        disabled={disabled}
      >
        <Space direction="vertical">
          {options?.map(option => (
            <Radio
              key={option.value}
              className="flex gap-[20px]"
              value={option.value}
            >
              {option.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default RadioGroup

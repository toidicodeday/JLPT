import { Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

const RadioGroup = () => {
  const [value, setValue] = useState(0)
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio className="flex gap-[20px]" value={1}>
            Đáp án A
          </Radio>
          <Radio className="flex gap-[20px]" value={2}>
            Đáp án B
          </Radio>
          <Radio className="flex gap-[20px]" value={3}>
            Đáp án C
          </Radio>
          <Radio className="flex gap-[20px]" value={4}>
            Đáp án D
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}

export default RadioGroup

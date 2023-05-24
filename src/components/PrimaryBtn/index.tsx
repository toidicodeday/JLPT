import { Button } from 'antd'
import React from 'react'

type Props = {
  label: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const PrimaryBtn = ({ label, onClick }: Props) => {
  return (
    <div>
      <Button
        type="text"
        className="bg-[#FB3357] rounded-[20px] text-white"
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  )
}

export default PrimaryBtn

import { Button as AntButton } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  type?: 'primary' | 'secondary' | 'dashed' | 'outline'
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

const Button = ({ label, type = 'primary', onClick, className }: Props) => {
  return (
    <AntButton
      className={twMerge(
        type === 'primary'
          ? 'bg-primary text-white font-bold border-none cursor-pointer'
          : '',
        type === 'secondary'
          ? 'bg-[#D9D9D9] text-[#707070] border-none cursor-pointer'
          : '',
        type === 'outline'
          ? 'bg-white text-primary border border-solid border-primary font-bold cursor-pointer'
          : '',
        type === 'dashed'
          ? 'bg-white text-black border border-dashed border-[#707070] cursor-pointer'
          : '',
        'rounded-lg',
        className || '',
      )}
      onClick={onClick}
    >
      {label}
    </AntButton>
  )
}

export default Button

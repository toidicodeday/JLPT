import { OrderDetailsType } from '@/services/orderApi/types'
import React from 'react'
import CancelLabel from '../CancelLabel'

interface Props {
  children: any
  data?: OrderDetailsType
}

const DetailsLayout = ({ children, data }: Props) => {
  return (
    <div className="min-h-[calc(100vh-250px)] flex flex-col justify-between">
      <div>{children}</div>
      <CancelLabel data={data} />
    </div>
  )
}

export default DetailsLayout

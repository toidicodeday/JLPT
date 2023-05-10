import { STATUS_DISCOUNT_OPS } from '@/utils/constant/constant'
import React from 'react'

interface Props {
  status: string
}

const StatusUI = (props: Props) => {
  return (
    <>
      {STATUS_DISCOUNT_OPS.filter(data => data.value === props?.status)?.map(
        (item: any) => (
          <div className={`${item?.bg} px-6 py-1 text-sm text-center`}>
            {item.name}
          </div>
        ),
      )}
    </>
  )
}
export default StatusUI

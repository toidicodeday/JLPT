import React from 'react'
import { Typography } from 'antd'
import { format } from 'date-fns'
import { FaCheckCircle } from 'react-icons/fa'
import Icon from '@ant-design/icons'

interface Props {
  dataSource: any
}

const FinishedOrderNoti = (props: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div>
        <Icon
          component={FaCheckCircle}
          style={{ fontSize: 18, color: '#0fa80f' }}
        />
      </div>
      <div className="col-span-11">
        <Typography className="font-bold text-black truncate">
          Chuyến hàng {props?.dataSource?.orderDetails?.code} đã hoàn thành
        </Typography>
        <Typography className="font-sans text-xs text-grayBorder mt-1">
          {props?.dataSource?.orderDetails?.logs?.completedAt
            ? format(
                new Date(props?.dataSource?.orderDetails?.logs?.completedAt),
                'dd/MM hh:mm',
              )
            : ''}
        </Typography>
      </div>
    </div>
  )
}

export default FinishedOrderNoti

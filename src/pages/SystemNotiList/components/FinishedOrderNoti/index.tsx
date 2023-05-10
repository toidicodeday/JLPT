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
    <div className="flex">
      <div>
        <Icon
          component={FaCheckCircle}
          style={{ fontSize: 18, color: '#0fa80f' }}
        />
      </div>
      <div className="flex-1 pl-4 flex justify-between">
        <div className="font-bold">
          <Typography className="font-bold text-black truncate">
            Chuyến hàng {props?.dataSource?.orderDetails?.code} đã hoàn thành
          </Typography>
        </div>
        <Typography className="font-sans text-grayBorder">
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

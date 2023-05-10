import React from 'react'
import { Typography } from 'antd'
import { format } from 'date-fns'
import Icon from '@ant-design/icons'
import { MdWarning } from 'react-icons/md'

interface Props {
  dataSource: any
}

const NoDriverOrderNoti = (props: Props) => {
  return (
    <div className="flex">
      <div>
        <Icon
          component={MdWarning}
          style={{ fontSize: 18, color: '#ff9966' }}
        />
      </div>
      <div className="flex-1 pl-4 flex justify-between">
        <div className="font-bold">
          <Typography className="font-bold text-black truncate">
            Cảnh báo Chuyến hàng {props?.dataSource?.orderDetails?.code} chưa có
            tài xế nhận
          </Typography>
        </div>
        <Typography className="font-sans text-grayBorder">
          {props?.dataSource?.orderDetails?.logs?.noDriverWarningdAt
            ? format(
                new Date(
                  props?.dataSource?.orderDetails?.logs?.noDriverWarningdAt,
                ),
                'dd/MM hh:mm',
              )
            : ''}
        </Typography>
      </div>
    </div>
  )
}

export default NoDriverOrderNoti

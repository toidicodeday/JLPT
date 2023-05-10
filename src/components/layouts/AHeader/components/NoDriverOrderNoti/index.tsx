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
    <div className="grid grid-cols-12 gap-4">
      <div>
        <Icon
          component={MdWarning}
          style={{ fontSize: 18, color: '#ff9966' }}
        />
      </div>
      <div className="col-span-11">
        <div className="font-bold text-black">
          Cảnh báo Chuyến hàng {props?.dataSource?.orderDetails?.code} chưa có
          tài xế nhận
        </div>
        <Typography className="font-sans text-xs text-grayBorder mt-1">
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

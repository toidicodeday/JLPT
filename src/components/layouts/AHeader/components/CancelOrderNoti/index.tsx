import React from 'react'
import { Typography } from 'antd'
import { format } from 'date-fns'
import Icon from '@ant-design/icons'
import { MdCancel } from 'react-icons/md'

interface Props {
  dataSource: any
}

const CancelOrderNoti = (props: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div>
        <Icon component={MdCancel} style={{ fontSize: 18, color: '#ff0000' }} />
      </div>
      <div className="col-span-11">
        <div className="font-bold">
          <Typography className="font-bold text-black truncate">
            Chuyến hàng {props?.dataSource?.orderDetails?.code} đã bị huỷ bởi
            khách hàng
          </Typography>
        </div>
        <Typography className="font-sans text-xs text-grayBorder mt-1">
          {props?.dataSource?.orderDetails?.logs?.cancelledAt
            ? format(
                new Date(props?.dataSource?.orderDetails?.logs?.cancelledAt),
                'dd/MM hh:mm',
              )
            : ''}
        </Typography>
      </div>
    </div>
  )
}

export default CancelOrderNoti

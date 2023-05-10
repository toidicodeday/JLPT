import React from 'react'
import { HouseIcon, TruckIcon } from '@/assets/img'
import { Typography } from 'antd'
import { format } from 'date-fns'

interface Props {
  dataSource: any
}

const NewOrderNoti = (props: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div>
        <img
          width="100%"
          src={
            props?.dataSource?.orderDetails?.serviceType === 'taxi'
              ? TruckIcon
              : HouseIcon
          }
          alt="Truck"
        />
      </div>
      <div className="col-span-11">
        <div className="font-bold">
          <Typography className="font-bold text-black truncate">
            {props?.dataSource?.orderDetails?.serviceType === 'taxi'
              ? 'Có chuyến hàng mới: '
              : 'Đăng ký dịch vụ chuyển nhà trọn gói: '}{' '}
            {props?.dataSource?.orderDetails?.code}
          </Typography>
          <Typography className=" truncate">
            Khách hàng: {props?.dataSource?.orderDetails?.sentBy?.name}
          </Typography>
          <Typography className=" truncate">
            Điểm đi: {props?.dataSource?.orderDetails?.sentBy?.address}. Điểm
            đến: {props?.dataSource?.orderDetails?.receivedBy?.address}
          </Typography>
        </div>
        <Typography className="font-sans text-xs text-grayBorder mt-1">
          {props?.dataSource?.orderDetails?.logs?.createdAt
            ? format(
                new Date(props?.dataSource?.orderDetails?.logs?.createdAt),
                'dd/MM hh:mm',
              )
            : ''}
        </Typography>
      </div>
    </div>
  )
}

export default NewOrderNoti

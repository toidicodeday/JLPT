import { OrderDriverVehicleType } from '@/services/orderApi/types'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { Avatar, Tag, Typography } from 'antd'
import React from 'react'

interface Props {
  data: OrderDriverVehicleType
  received: boolean
}

const TxPermanentDriverInfo = ({ data, received }: Props) => {
  return (
    <div className="flex-1 flex items-center">
      <Avatar size={64} />
      <div className="ml-4 flex-1">
        <Typography className="mt-1">
          Tài xế: <span className="font-bold mt-1"> {data?.driver?.name}</span>
        </Typography>
        <Typography className="mt-1">
          {data?.driver?.phone
            ? formatPhone(data?.driver?.phone)
            : 'Chưa rõ SĐT'}
        </Typography>
        <Typography>{data?.vehicle?.licensePlatese}</Typography>
      </div>
      <div className="items-center flex">
        <Tag
          color={received ? '#35703B' : '#F99233'}
          className="hidden xl:inline-block"
        >
          {received ? 'Đã nhận chuyến' : 'Chưa nhận chuyến'}
        </Tag>
      </div>
    </div>
  )
}

export default TxPermanentDriverInfo

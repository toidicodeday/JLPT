import { useGetDocumentQuery } from '@/services/documentApi'
import { DOCUMENT_TYPE } from '@/utils/constant/constant'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { Avatar, Tag } from 'antd'
import { isNumber } from 'lodash'
import React, { useMemo } from 'react'

interface Props {
  data: {
    driverName?: string
    driverId?: number
    driverPhone: string
    driverLicensePlatese?: string
    isWorking: boolean
    isNotify: boolean
  }
}

const MannualDriverOps = ({ data }: Props) => {
  const { data: driverImages } = useGetDocumentQuery(
    {
      ref: 'driver',
      refId: Number(data?.driverId),
      query: `order=id:desc&search=type:=:${DOCUMENT_TYPE.AVATAR}&limit=1`,
    },
    { skip: !isNumber(Number(data?.driverId)) && !data?.driverId },
  )

  const driverInfo = useMemo(() => {
    return {
      driverId: data?.driverId,
      name: data?.driverName,
      phone: data?.driverPhone,
      avatar: driverImages?.data?.[0]?.document.url,
      licensePlatese: data?.driverLicensePlatese,
    }
  }, [data, driverImages?.data])

  return (
    <div className="flex items-center">
      <Avatar src={driverInfo?.avatar} />
      <div className="flex-1 ml-2">
        <div className="font-bold mt-1">
          {driverInfo?.name ? driverInfo?.name : 'Không rõ'}
        </div>
        <div className="mt-1">
          <span>
            {driverInfo?.phone
              ? formatPhone(driverInfo?.phone)
              : 'Không rõ sđt'}
          </span>
          <span className="ml-2">
            {driverInfo?.licensePlatese
              ? driverInfo?.licensePlatese
              : 'Không rõ'}
          </span>
          <Tag color={data?.isWorking ? '#F99233' : 'green'} className="ml-2">
            {data?.isWorking ? 'Đang vận chuyển' : 'Đang trống'}
          </Tag>
          {!data?.isNotify && (
            <p className="text-[#EA8C8C]">Tài xế đang tắt nhận chuyến</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MannualDriverOps

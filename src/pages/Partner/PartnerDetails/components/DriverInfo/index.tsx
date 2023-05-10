import { NoImage } from '@/assets/img'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Typography, Image } from 'antd'
import React from 'react'

type DriverInfoType = {
  name?: string
  phone?: string
  dob?: string
  gender?: string
  identity?: string
  address?: string
  avatar?: string
  cccdfrontUrl?: string
  cccdbackUrl?: string
}

interface Props {
  driverInfo: DriverInfoType
}

const DriverInfo = ({ driverInfo }: Props) => {
  return (
    <div className="p-3 rounded border border-solid border-grayDivider my-4">
      <Typography className="text-base font-bold mb-4">
        THÔNG TIN TÀI XẾ
      </Typography>
      <div className="flex items-start flex-wrap gap-3">
        <Avatar src={driverInfo.avatar} size={130} icon={<UserOutlined />} />
        <div className="ml-8 flex-grow">
          <div className="flex flex-wrap">
            <p className="font-bold min-w-[140px]">Họ và tên</p>
            <p>{driverInfo.name}</p>
          </div>
          <div className="flex flex-wrap mt-2">
            <p className="font-bold min-w-[140px]">Số điện thoại</p>
            <p>{driverInfo.phone}</p>
          </div>
          <div className="flex flex-wrap mt-2">
            <p className="font-bold min-w-[140px]">Ngày sinh</p>
            <p>{driverInfo.dob}</p>
          </div>
          <div className="flex flex-wrap mt-2">
            <p className="font-bold min-w-[140px]">Giới tính</p>
            <p>{driverInfo.gender}</p>
          </div>
          <div className="flex flex-wrap mt-2">
            <p className="font-bold min-w-[140px]">Số CCCD</p>
            <p>{driverInfo.identity}</p>
          </div>
          <div className="flex flex-wrap mt-2">
            <p className="font-bold min-w-[140px]">Địa chỉ thường trú</p>
            <p>{driverInfo.address}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 ">
          <div>
            <Typography className="mb-1">Ảnh CCCD mặt trước</Typography>
            <Image
              src={driverInfo.cccdfrontUrl || NoImage}
              preview={Boolean(driverInfo.cccdfrontUrl)}
              className="w-40 h-32"
              fallback={NoImage}
            />
          </div>
          <div>
            <Typography className="mb-1">Ảnh CCCD mặt sau</Typography>
            <Image
              src={driverInfo.cccdbackUrl || NoImage}
              preview={Boolean(driverInfo.cccdbackUrl)}
              className="w-40 h-32"
              fallback={NoImage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverInfo

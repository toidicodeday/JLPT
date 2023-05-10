import { NoImage } from '@/assets/img'
import { Typography, Image, Divider } from 'antd'
import React from 'react'

type VehicleType = {
  licensePlatese?: string
  vehicleCategory?: string
  workingArea?: string
  licensePlateUrl?: string
  vehicleUrl?: string
  registrationUrl?: string
  driverLicense?: string
}

interface Props {
  vehicle: VehicleType
}

const VehicleInfo = ({ vehicle }: Props) => {
  return (
    <div className="p-3 rounded border border-solid border-grayDivider my-4">
      <Typography className="text-base font-bold mb-4">THÔNG TIN XE</Typography>
      <div className="mb-3 flex">
        <div className="font-bold min-w-[130px]">
          <Typography>Biển số xe</Typography>
          <Typography className="mt-1">Loại xe</Typography>
          <Typography className="mt-1">Khu vực hoạt động</Typography>
        </div>
        <div className="flex-grow">
          <Typography>{vehicle.licensePlatese}</Typography>
          <Typography className="mt-1">{vehicle.vehicleCategory}</Typography>
          <Typography className="mt-1">{vehicle.workingArea}</Typography>
        </div>
      </div>
      <Divider />
      <div className="flex flex-wrap gap-3">
        <div>
          <Typography className="mb-1">Ảnh biển số xe</Typography>
          <Image
            src={vehicle.licensePlateUrl || NoImage}
            className="w-40 h-32"
            fallback={NoImage}
          />
        </div>
        <div>
          <Typography className="mb-1">Ảnh giấy phép đăng ký xe</Typography>
          <Image
            src={vehicle.registrationUrl || NoImage}
            className="w-40 h-32"
            fallback={NoImage}
          />
        </div>
        <div>
          <Typography className="mb-1">Ảnh bằng lái</Typography>
          <Image
            src={vehicle.driverLicense || NoImage}
            className="w-40 h-32"
            fallback={NoImage}
          />
        </div>
        <div>
          <Typography className="mb-1">Ảnh xe</Typography>
          <Image
            src={vehicle.vehicleUrl || NoImage}
            className="w-40 h-32"
            fallback={NoImage}
          />
        </div>
      </div>
    </div>
  )
}

export default VehicleInfo

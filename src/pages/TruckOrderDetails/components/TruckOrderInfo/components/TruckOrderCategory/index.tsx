import { VehicleCategoryType } from '@/services/vehicleCategoryApi/types'
import { Typography } from 'antd'
import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'

interface Props {
  categoryData: VehicleCategoryType
}

const TruckVehicleCategory = ({ categoryData }: Props) => {
  return (
    <div className="flex-1 xl:flex">
      <div className="items-center xl:flex flex-1">
        <div className="text-center xl:text-left">
          <TbTruckDelivery style={{ color: '#F99233', fontSize: 50 }} />
        </div>
        <div className="ml-4 flex-1">
          <Typography className="font-bold text-center xl:text-left">
            {categoryData?.name}
          </Typography>
          <Typography className="mt-2 text-center xl:text-left">
            {categoryData?.description}
          </Typography>
          <Typography className="mt-1 text-center xl:text-left">
            {categoryData?.length} x {categoryData?.width} x{' '}
            {categoryData?.height} m . Lên đến {categoryData?.capacity}kg
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default TruckVehicleCategory

import { useGetVehicleCategoryDetailsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { Typography } from 'antd'
import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'

interface Props {
  data?: number
}

const OrderCategoryCpnt = ({ data }: Props) => {
  const { data: categoryDetails } = useGetVehicleCategoryDetailsQuery({
    id: data,
  })

  return (
    <div className="flex-1 flex">
      <div className="items-center flex flex-1">
        <TbTruckDelivery style={{ color: '#F99233', fontSize: 50 }} />
        <div className="ml-4 flex-1">
          <Typography className="font-bold">{categoryDetails?.name}</Typography>
          <Typography className="mt-2">
            {categoryDetails?.description}
          </Typography>
          <Typography className="mt-1">
            {categoryDetails?.length} x {categoryDetails?.width} x{' '}
            {categoryDetails?.height} m . Lên đến {categoryDetails?.capacity}kg
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default OrderCategoryCpnt

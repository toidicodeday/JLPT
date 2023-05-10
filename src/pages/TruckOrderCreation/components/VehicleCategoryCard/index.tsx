import { VehicleCategoryType } from '@/services/vehicleCategoryApi/types'
import Icon from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import { HiTruck } from 'react-icons/hi'

interface Props {
  dataSource: Partial<VehicleCategoryType>
}

const VehicleCategoryCard = (props: Props) => {
  return (
    <div className="flex items-center">
      <div>
        <Icon
          component={HiTruck}
          style={{
            fontSize: 50,
            color: '#F99233',
          }}
        />
      </div>
      <div className="flex-1 ml-4">
        <Typography className="font-bold">{props.dataSource?.name}</Typography>
        <Typography>{props.dataSource?.description}</Typography>
        <Typography>{`${props.dataSource?.length}x${props.dataSource?.width}x${props.dataSource?.height}m . Lên đến ${props.dataSource?.capacity}kg`}</Typography>
      </div>
    </div>
  )
}

export default VehicleCategoryCard

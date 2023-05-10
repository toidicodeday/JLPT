import { useDebounceState } from '@/hooks/useDebounce'
import VehicleCategoryCard from '@/pages/TruckOrderCreation/components/VehicleCategoryCard'
import { useGetVehicleCategoryListQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { Empty, Select, Spin } from 'antd'
import React from 'react'

interface Props {
  handleChangeVC: (newVal: { id: number; name: string }) => void
  initialVal: number[]
  disabled: boolean
}

export type VCOpsType = {
  value: number
  label?: string
}

const VCMultiSelection = ({ handleChangeVC, initialVal, disabled }: Props) => {
  const {
    dbValue,
    handleChange: handleSearch,
    isDebounce,
  } = useDebounceState({})
  const convertQueryString = (text: string) => {
    return text === ''
      ? '?page=1&limit=10000'
      : '?page=1&limit=10000&search=' +
          encodeURIComponent(`name:ilike:%${text}%`)
  }
  const { data: vehicleCategoryList, isFetching } =
    useGetVehicleCategoryListQuery({
      query: convertQueryString(dbValue),
    })
  const selectOptions = vehicleCategoryList
    ?.filter(item => !initialVal.includes(item.id))
    ?.map(item => ({
      key: item.id,
      value: item.id,
      raw: item,
      label: (
        <VehicleCategoryCard
          dataSource={{
            id: item?.id,
            name: item?.name,
            description: item?.description,
            height: item?.height,
            width: item?.width,
            length: item?.length,
            capacity: item?.capacity,
          }}
        />
      ),
      name: '',
      disabled: initialVal.includes(item.id),
    }))
  const handleChange = (value: number, option: any) => {
    const newVal = {
      id: option.value,
      name: option.raw.name,
    }
    handleChangeVC(newVal)
  }

  return (
    <Select
      value={null}
      style={{ width: '70%' }}
      placeholder="Tìm kiếm loại xe"
      onChange={handleChange}
      optionLabelProp="name"
      showSearch
      onSearch={handleSearch}
      notFoundContent={
        isDebounce || isFetching ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      filterOption={false}
      options={selectOptions}
      disabled={disabled}
    />
  )
}

export default VCMultiSelection

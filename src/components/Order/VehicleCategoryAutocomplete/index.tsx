import VehicleCategoryCard from '@/pages/TruckOrderCreation/components/VehicleCategoryCard'
import { VehicleCategoryType } from '@/services/vehicleCategoryApi/types'
import {
  useGetVehicleCategoryListQuery,
  useLazyGetVehicleCategoryByIdQuery,
} from '@/services/vehicleCategoryApi/vehicleCategory'
import { AutoComplete } from 'antd'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

interface Props {
  handleUpdateFee: (feeKeyVal: number) => void
  value?: number
}

const VehicleCategoryAutocomplete = ({ handleUpdateFee, value }: Props) => {
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [searchText, setSearchText] = useState<string>('')
  const { data: vehicleCategoryList } = useGetVehicleCategoryListQuery({
    query: `?search=name:like:%${searchText}%`,
  })
  const vehicleCateOps = useMemo(
    () =>
      vehicleCategoryList?.map((item: VehicleCategoryType) => ({
        value: item?.id,
        label: (
          <div className="flex">
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
          </div>
        ),
      })),
    [vehicleCategoryList],
  )
  const [getVCDetails] = useLazyGetVehicleCategoryByIdQuery()
  const getInitialVehicleCateDetails = useCallback(async () => {
    const response = await getVCDetails({
      id: Number(value),
    })
    if ('data' in response) {
      setInputValue(response?.data?.data?.name)
    }
    if ('error' in response) {
      setInputValue('')
    }
  }, [getVCDetails, value])
  const handleSearch = useCallback((text: string) => {
    setSearchText(text)
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), [])

  const onSelect = async (selectedValue: any) => {
    handleUpdateFee(selectedValue)
  }

  useEffect(() => {
    getInitialVehicleCateDetails()
  }, [getInitialVehicleCateDetails])

  return (
    <AutoComplete
      options={vehicleCateOps}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={(text: string) => {
        setInputValue(text)
        debounceSearch(text)
      }}
      className="w-full"
      value={inputValue}
      placeholder="Tìm kiếm tên loại xe"
    />
  )
}

export default VehicleCategoryAutocomplete

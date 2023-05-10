import MannualDriverOps from '@/components/Order/ManualDriverOps'
import { useDebounceState } from '@/hooks/useDebounce'
import { OrderVehicleType } from '@/services/vehicleApi/type'
import { Empty, Select, Spin } from 'antd'
import React from 'react'

const { Option } = Select

interface Props {
  rtk: { useGetQuery?: any }
  arg: { endPoint?: any; search?: string }
  queryAttributeName: string
  setChoosenVehicleId: React.Dispatch<React.SetStateAction<number | null>>
}

const LazyLoadAutocomplete = ({
  rtk,
  arg,
  queryAttributeName,
  setChoosenVehicleId,
}: Props) => {
  const {
    dbValue,
    handleChange: handleSearch,
    isDebounce,
  } = useDebounceState({})

  const convertQueryString = (value: string) =>
    value !== ''
      ? '?search=' +
        encodeURIComponent(
          `${arg.search};[driver.name:ilike:%${value}%|vehicleCode:ilike:%${value}%]`,
        )
      : '?search=' + encodeURIComponent(`${arg.search}`)

  const { data: suggestList, isFetching } = rtk.useGetQuery({
    ...arg.endPoint,
    query: convertQueryString(dbValue),
  })

  return (
    <Select
      filterOption={false}
      showSearch
      notFoundContent={
        isDebounce || isFetching ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      onSearch={handleSearch}
      placeholder="Tìm kiếm tài xế"
      className="w-full"
      onChange={values => {
        setChoosenVehicleId(values)
        handleSearch('')
      }}
      optionLabelProp="label"
      allowClear
    >
      {!isFetching ? (
        suggestList?.data?.map((item: OrderVehicleType) => (
          <Option
            key={item?.id}
            value={item?.id}
            label={`${item?.driver?.name} - ${item?.driver?.phone} - ${item?.licensePlatese}`}
            disabled={item.isWorking || !item?.driver?.notify}
          >
            <MannualDriverOps
              data={{
                driverId: item?.driverId,
                driverName: item?.driver?.name,
                driverPhone: item?.driver?.phone,
                driverLicensePlatese: item?.licensePlatese,
                isWorking: item?.isWorking,
                isNotify: item?.driver?.notify,
              }}
            />
          </Option>
        ))
      ) : (
        <></>
      )}
    </Select>
  )
}

export default LazyLoadAutocomplete

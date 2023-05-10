import { useDebounceState } from '@/hooks/useDebounce'
import { useGetCustomerOpsQuery } from '@/services/customerApi'
import {
  convertPhoneToSearchStr,
  formatPhone,
} from '@/utils/helpers/convert.helper'
import { Button, Select, Spin } from 'antd'
import React, { useMemo, useState } from 'react'
import AddNewGuestModal from '../AddNewGuestModal'

type Props = {
  setGuestInfo: React.Dispatch<
    React.SetStateAction<{
      id: number
      name: string
      phone: string
    } | null>
  >
}

const GuestInfoSelection = ({ setGuestInfo }: Props) => {
  const [openAddNew, setOpenAddNew] = useState<boolean>(false)
  const {
    dbValue,
    handleChange: handleSearch,
    isDebounce,
  } = useDebounceState({})

  const { data: apiOptions, isFetching } = useGetCustomerOpsQuery({
    query: `?search=${encodeURIComponent(
      `phone:ilike:%${convertPhoneToSearchStr(dbValue)}%`,
    )}`,
  })
  const selectOptions = useMemo(() => {
    return apiOptions?.map(item => ({
      key: item?.value,
      value: item?.value,
      raw: item,
      label: (
        <div className="flex">
          <div className="font-bold">{item?.label}</div>
          <div className="ml-2">{formatPhone(item?.phone)}</div>
        </div>
      ),
      name: item?.label,
    }))
  }, [apiOptions])

  const handleChange = (_: any, option: any) => {
    setGuestInfo({
      id: option.raw.value,
      name: option.name,
      phone: option.raw.phone,
    })
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        placeholder="Tìm kiếm khách hàng theo số điện thoại"
        // onChange={handleChange}
        optionLabelProp="label"
        showSearch
        onSearch={handleSearch}
        notFoundContent={
          isDebounce || isFetching ? (
            <Spin size="small" />
          ) : (
            <>
              <p className="text-black text-center">
                Không tìm thấy khách hàng
              </p>
              <div className="text-center mt-3">
                <Button type="primary" onClick={() => setOpenAddNew(true)}>
                  Tạo mới
                </Button>
              </div>
            </>
          )
        }
        filterOption={false}
        options={selectOptions}
        onSelect={handleChange}
      />
      <AddNewGuestModal
        open={openAddNew}
        setOpen={setOpenAddNew}
        setGuestInfo={setGuestInfo}
        initValue={dbValue}
      />
    </>
  )
}

export default GuestInfoSelection

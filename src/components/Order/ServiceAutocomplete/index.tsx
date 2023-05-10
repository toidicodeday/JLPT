import {
  useGetServiceOpsQuery,
  useLazyGetServiceListQuery,
} from '@/services/serviceApi/service'
import { AutoComplete } from 'antd'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
  handleUpdateFee: (feeKeyVal: number | null) => void
  value?: number
  serviceId?: number
  open: boolean
}

const ServiceAutocomplete = ({
  handleUpdateFee,
  value,
  serviceId,
  open,
}: Props) => {
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [searchText, setSearchText] = useState<string>('')
  const convertQuery = (s: string) =>
    s !== ''
      ? `parentId:=:${serviceId};name:ilike:%${s}%`
      : `parentId:=:${serviceId}`
  const { data: serviceList } = useGetServiceOpsQuery({
    query: `?search= + ${encodeURIComponent(convertQuery(searchText))}`,
  })

  const [getDVDetails] = useLazyGetServiceListQuery()
  const getInitialDVDetails = useCallback(async () => {
    const response = await getDVDetails({
      query: `?search=id:=:${Number(value)}`,
    })
    if ('data' in response) {
      setInputValue(
        response?.data && response?.data?.length > 0
          ? response?.data[0]?.name
          : '',
      )
    }
    if ('error' in response) {
      setInputValue('')
    }
  }, [getDVDetails, value])
  const handleSearch = useCallback((text: string) => {
    setSearchText(text)
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), [])

  const onSelect = (selectedValue: any, option: any) => {
    handleUpdateFee(selectedValue)
    setInputValue(option?.label)
  }

  useEffect(() => {
    if (open) {
      getInitialDVDetails()
    }
  }, [getInitialDVDetails, open])

  return (
    <AutoComplete
      options={serviceList}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={(text: string) => {
        setInputValue(text)
        handleUpdateFee(null)
        debounceSearch(text)
      }}
      className="w-full"
      value={inputValue}
      placeholder="Tìm kiếm tên dịch vụ"
    />
  )
}

export default ServiceAutocomplete

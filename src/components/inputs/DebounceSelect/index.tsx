import { useDebounceState } from '@/hooks/useDebounce'
import useOptions from '@/hooks/useOptions'
import { SelectOptionType } from '@/services/commonResposntType'
import { Empty, Select, Spin } from 'antd'
import React from 'react'

type Props = {
  value?: any
  onChange?: (value: any, option: SelectOptionType | SelectOptionType[]) => void
  initSelected?: SelectOptionType[]
  mode?: 'multiple' | 'tags'
  optionQuery: any
  convertQueryString: (value: string) => string
  placeholder?: string
  className?: string
  allowClear?: boolean
  disabled?: boolean
}

const DebounceSelect = ({
  value,
  onChange,
  initSelected = [],
  mode,
  optionQuery,
  convertQueryString,
  placeholder,
  className,
  allowClear,
  disabled,
}: Props) => {
  const {
    dbValue,
    handleChange: handleSearch,
    isDebounce,
  } = useDebounceState({})

  const { data: apiOptions, isFetching } = optionQuery({
    query: convertQueryString(dbValue),
  })
  const convertOptions = useOptions({
    apiOptions: apiOptions,
    searchValue: dbValue,
    initSelected: initSelected,
  })

  return (
    <Select
      value={value}
      onChange={onChange}
      options={isFetching ? [] : convertOptions}
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
      mode={mode}
      placeholder={placeholder}
      className={className}
      allowClear={allowClear}
      disabled={disabled}
    />
  )
}

export default DebounceSelect

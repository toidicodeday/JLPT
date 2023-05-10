import { Input } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import debouce from 'lodash.debounce'
import { FilterItem } from '@/core/objects/Table'

interface Props {
  filterType: 'normal' | 'other'
  placeholder: string
  setFilter: React.Dispatch<React.SetStateAction<FilterItem[]>>
  searchKey: string
  setPage?: any
}

const INIT_PAGE = 1
const ReportSearchText = ({
  placeholder,
  setFilter,
  searchKey,
  filterType,
  setPage,
}: Props) => {
  const [searchText, setSearchText] = React.useState('')

  const handleChange = (event: any) => {
    setSearchText(event.target.value)
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 1000)
  }, [])

  const handleSetFilter = useCallback(() => {
    if (searchText === '') {
      setFilter((prev: any) =>
        prev.filter((item: any) => item.searchKey !== searchKey),
      )
    } else {
      setFilter((prev: any) => [
        ...prev.filter((item: any) => item.searchKey !== searchKey),
        {
          type: filterType,
          searchKey: searchKey,
          opt: '=',
          value: searchText,
        },
      ])
    }
  }, [filterType, searchKey, searchText, setFilter])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  useEffect(() => {
    handleSetFilter()
  }, [handleSetFilter])

  return (
    <Input.Search
      allowClear
      placeholder={placeholder}
      onChange={value => {
        debouncedResults(value)
        setPage(INIT_PAGE)
      }}
      style={{ borderColor: '#9D9999' }}
    />
  )
}

export default ReportSearchText

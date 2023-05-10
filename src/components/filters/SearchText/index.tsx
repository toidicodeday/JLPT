import { Input } from 'antd'
import React, { useCallback, useEffect } from 'react'
import '../styles.scss'
import { FilterItem } from '@/core/objects/Table'
import { debounce } from 'lodash'

interface Props {
  filterType: 'normal' | 'other'
  placeholder: string
  setFilter: React.Dispatch<React.SetStateAction<FilterItem[]>>
  searchKey: string
  setPage?: any
}

const INIT_PAGE = 1
const SearchText = ({
  placeholder,
  setFilter,
  searchKey,
  filterType,
  setPage,
}: Props) => {
  const [searchText, setSearchText] = React.useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResults = useCallback(
    debounce(value => setSearchText(value), 300),
    [],
  )

  const handleSetFilter = useCallback(() => {
    if (searchText === '') {
      setFilter((prev: any) =>
        prev.filter((item: any) => item.searchKey !== searchKey),
      )
    } else {
      setFilter((prev: any) =>
        filterType === 'normal'
          ? [
              ...prev.filter((item: any) => item.searchKey !== searchKey),
              {
                type: filterType,
                searchKey: searchKey,
                opt: ':ilike:',
                value: `%${searchText}%`,
              },
            ]
          : [
              ...prev.filter((item: any) => item.searchKey !== searchKey),
              {
                type: filterType,
                searchKey: searchKey,
                opt: '=',
                value: searchText,
              },
            ],
      )
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
      onChange={event => {
        if (event.target.value) debouncedResults(event.target.value)
        else setSearchText('')
        setPage(INIT_PAGE)
      }}
      style={{ borderColor: '#9D9999' }}
    />
  )
}

export default SearchText

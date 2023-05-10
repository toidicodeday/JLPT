import { Select } from 'antd'
import React from 'react'
import '../styles.scss'

interface Props {
  filterType: 'normal' | 'other'
  children: any
  defaultValue?: any
  placeholder?: string
  filter: any
  setFilter: (values: any) => void
  searchKey: string
  options: any
  setPage?: any
}

const INIT_PAGE = 1

const FilterSelection = (props: Props) => {
  const handleChange = (value: any) => {
    if (value === 'all') {
      props.setFilter([
        ...props.filter?.filter((item: any) => {
          return item.searchKey !== props.searchKey
        }),
      ])
    } else {
      props.setFilter([
        ...props.filter?.filter((item: any) => {
          return item.searchKey !== props.searchKey
        }),
        {
          type: props.filterType,
          searchKey: props.searchKey,
          opt: props.filterType === 'normal' ? ':=:' : '=',
          value: value,
        },
      ])
    }
  }

  return (
    <Select
      style={{ width: '100%' }}
      onChange={value => {
        handleChange(value)
        props?.setPage(INIT_PAGE)
      }}
      placeholder={props.placeholder}
      defaultValue={
        props.options?.filter((item: any) => item.isSelected)[0]?.value
      }
    >
      {props.children}
    </Select>
  )
}

export default FilterSelection

import DatePicker from '@/components/inputs/DatePicker'
import { format } from 'date-fns'
import React from 'react'
import '../styles.scss'

const { RangePicker } = DatePicker

interface Props {
  filterType: 'normal' | 'other'
  filter: any
  setFilter: (values: any) => void
  searchKey: string
  setPage?: any
}

const INIT_PAGE = 1

const FilterDate = (props: Props) => {
  const handleDatePick = (value: any) => {
    if (value) {
      const filterValue = [
        ...props.filter.filter(
          (item: any) => item.searchKey !== props.searchKey,
        ),
        {
          type: props.filterType,
          searchKey: props.searchKey,
          opt: ':>=:',
          value: format(value[0], 'yyyy-MM-dd'),
        },
        {
          type: props.filterType,
          searchKey: props.searchKey,
          opt: ':<=:',
          value: format(value[1], 'yyyy-MM-dd'),
        },
      ]
      props.setFilter(filterValue)
    } else if (!value) {
      const filterValue2 = props.filter.filter(
        (item: any) => item.searchKey !== props.searchKey,
      )
      props.setFilter(filterValue2)
    }
  }

  return (
    <RangePicker
      placeholder={['Từ ngày', 'Đến ngày']}
      style={{ width: '100%' }}
      onChange={value => {
        handleDatePick(value)
        props?.setPage(INIT_PAGE)
      }}
      format="dd-MM-yyyy"
    />
  )
}

export default FilterDate

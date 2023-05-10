import DatePicker from '@/components/inputs/DatePicker'
import { lastDayOfMonth } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
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

const FilterMonth = (props: Props) => {
  const today = new Date()
  const handleDatePick = (value: any) => {
    if (value) {
      const filterValue = [
        ...props.filter.filter(
          (item: any) => !props.searchKey.split(';').includes(item.searchKey),
        ),
        {
          type: props.filterType,
          searchKey: props.searchKey.split(';')[0],
          opt: '=',
          value: zonedTimeToUtc(
            new Date(
              value[0].getFullYear(),
              value[0].getMonth(),
              1,
              0,
              0,
              0,
              0,
            ),
            'Asia/Bangkok',
          ).toISOString(),
        },
        {
          type: props.filterType,
          searchKey: props.searchKey.split(';')[1],
          opt: '=',
          value: zonedTimeToUtc(
            new Date(
              value[1].getFullYear(),
              value[1].getMonth(),
              lastDayOfMonth(value[1]).getDate(),
              23,
              59,
              59,
              999,
            ),
            'Asia/Bangkok',
          ).toISOString(),
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
      placeholder={['Từ tháng', 'Đến tháng']}
      style={{ width: '100%' }}
      onChange={value => {
        handleDatePick(value)
        props?.setPage(INIT_PAGE)
      }}
      picker="month"
      format="MM-yyyy"
      defaultValue={[
        new Date(today.getFullYear(), today.getMonth(), 1),
        lastDayOfMonth(today),
      ]}
    />
  )
}

export default FilterMonth

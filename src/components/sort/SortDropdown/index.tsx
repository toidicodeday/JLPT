import React from 'react'
import { Select } from 'antd'
import { SortFieldType } from '@/services/tableBaseApi/types'

interface Props {
  children: any
  sortField: SortFieldType | undefined
  setSortField: React.Dispatch<React.SetStateAction<SortFieldType | undefined>>
}

const SortDropdown = (props: Props) => {
  const handleChange = (value: string) => {
    props.setSortField((prev: any) => ({
      ...prev,
      options: prev?.options?.map((item: any) => {
        if (item.sort === value) {
          return {
            ...item,
            isSelected: true,
          }
        } else {
          return {
            ...item,
            isSelected: false,
          }
        }
      }),
    }))
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        value={
          props.sortField?.options?.filter((item: any) => item.isSelected)[0]
            ?.sort
        }
        onChange={handleChange}
      >
        {props.children}
      </Select>
    </>
  )
}

export default SortDropdown

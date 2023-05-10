import SearchText from '@/components/filters/SearchText'
import React from 'react'
import { Col } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { FilterItem } from '@/core/objects/Table'

type Props = {
  searchKey: string
  filterType: 'normal' | 'other'
  isMobile: boolean
  width: number
  placeholder?: string
  setFilter: React.Dispatch<React.SetStateAction<FilterItem[]>>
  deleteFilterFieldsMobile: (key: string) => void
}

const FilterSearchText = ({
  searchKey,
  filterType,
  isMobile,
  width,
  setFilter,
  placeholder = '',
  deleteFilterFieldsMobile,
}: Props) => {
  console.log(searchKey, filterType)
  return (
    <>
      <Col key={`${searchKey}-${filterType}`} span={isMobile ? 22 : 6 * width}>
        <SearchText
          filterType={filterType}
          searchKey={searchKey}
          placeholder={placeholder}
          setFilter={setFilter}
        />
      </Col>
      {isMobile && (
        <Col span={2}>
          <CloseCircleOutlined
            className="text-primary"
            onClick={() => deleteFilterFieldsMobile(searchKey)}
          />
        </Col>
      )}
    </>
  )
}

export default FilterSearchText

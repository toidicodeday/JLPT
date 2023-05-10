import { Input, List, Typography } from 'antd'
import React from 'react'

interface Props {
  value: any
  filter: any
  setFilter: (values: any) => void
  setSideBarFilter: (values: any) => void
}

const FilterTab = (props: Props) => {
  const handleFilterSideBar = (item: any) => {
    const filterTabRecentData = props?.filter?.filter(
      (child: any) => child?.searchKey === props?.value?.searchKey,
    )
    switch (filterTabRecentData?.length) {
      case 0:
        props?.setFilter([
          ...props?.filter,
          {
            searchKey: props?.value?.searchKey,
            opt: ':=:',
            value: item?.id,
          },
        ])
        return
      case 1:
        switch (filterTabRecentData[0]?.value === item?.id) {
          case true:
            props?.setFilter(
              props?.filter?.filter(
                (child: any) => child?.searchKey !== props?.value?.searchKey,
              ),
            )
            return
          case false:
            props?.setFilter([
              ...props?.filter?.filter(
                (child: any) => child?.searchKey !== props?.value?.searchKey,
              ),
              {
                searchKey: props?.value?.searchKey,
                opt: ':=:',
                value: item?.id,
              },
            ])
            return
        }
    }
  }

  const [searchText, setSearchText] = React.useState('')

  return (
    <div className="pr-4 h-full pt-8">
      <div className="border border-solid border-grayDivider p-4 h-full">
        <Input.Search
          className="w-full"
          placeholder="Tìm kiếm loại xe"
          value={searchText}
          onChange={event => {
            setSearchText(event.target.value)
            props?.setSideBarFilter({
              searchKey: props?.value?.searchKey,
              opt: ':ilike:',
              value: event.target.value,
            })
          }}
        />
        <List
          className="mt-2"
          dataSource={props?.value?.options}
          renderItem={(item: any) => (
            <List.Item
              className={
                props?.filter?.filter(
                  (child: any) => child?.searchKey === props?.value?.searchKey,
                )[0]?.value === item?.id
                  ? 'cursor-pointer font-bold bg-grayDivider'
                  : 'cursor-pointer'
              }
              onClick={() => {
                handleFilterSideBar(item)
              }}
            >
              <Typography className="px-2">{item?.name}</Typography>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default FilterTab

import FilterSelection from '@/components/filters/FilterSelection'
import { Select, Row, Col, Button, Dropdown, Tooltip } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { compact, debounce, isArray } from 'lodash'
import {
  CloseCircleOutlined,
  ExportOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import {
  FilterFieldsType,
  FilterOptionType,
} from '@/services/tableBaseApi/types'
import { FilterItem } from '@/core/objects/Table'
import type { MenuProps } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import TableResponsive from '../Table'
import FilterMonth from '../filters/FilterMonth'
import IncomeStatisticCard from './components/IncomeStatisticCard'
import { MobileReportSort } from '@/pages/IncomeReport'
import { lastDayOfMonth } from 'date-fns'
import { handleExportFile } from '@/utils/helpers/table.helper'
import ReportSearchText from './components/ReportSearchText'
import { zonedTimeToUtc } from 'date-fns-tz'
import { MdRefresh } from 'react-icons/md'
const { Option } = Select

// FIX CONSTANT
const INIT_PAGE = 1
const INIT_LIMIT = 10
const DEFAULT_ORDER_DIRECTION = 'ASC'
const DEFAULT_ORDER_PROPERTY = 'date'

type Props = {
  // table props
  columns: ColumnsType<any>
  columnsMobile?: ColumnsType<any>
  rowKey: string
  type?: string

  // query method
  rtk: any
  initialSort?: { sort: string; sortBy: string }
  initialFilter?: FilterItem | FilterItem[]

  // auto gen input search
  filterFields: FilterFieldsType[]

  // action btn
  enableDownloadFile?: boolean

  // ui visible
  hiddenTotal?: boolean
  headerHidden?: boolean
  refetchTable?: boolean

  //statistic
  showStatistic?: boolean
  setStatisticQuery: React.Dispatch<React.SetStateAction<string>>
  statisticData?: {
    data: StatisticType[]
    isLoading: boolean
  }

  //sort
  sortField?: { key: string; sort: null | string } | null
  mobileSortField?: MobileReportSort[]

  //export file
  exportUrl: string
}

export type StatisticType = {
  title: string
  icon: any
  value: number
}

const ReportTable = ({
  filterFields,
  initialSort,
  initialFilter,
  rtk,
  rowKey = 'id',
  columns,
  columnsMobile,
  sortField,
  headerHidden: showHeaderTable = false,
  showStatistic,
  mobileSortField,
  setStatisticQuery,
  statisticData,
  exportUrl,
  refetchTable,
}: Props) => {
  const [page, setPage] = useState(INIT_PAGE)
  const [rowsPerPage, setRowsPerPage] = useState(INIT_LIMIT)
  const today = new Date()
  const [filterConditions, setFilterConditions] = useState<FilterItem[]>([
    {
      searchKey: 'dateFrom',
      opt: '=',
      value: zonedTimeToUtc(
        new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0),
        'Asia/Bangkok',
      ).toISOString(),
      type: 'other',
    },
    {
      searchKey: 'dateTo',
      opt: '=',
      value: zonedTimeToUtc(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          lastDayOfMonth(today).getDate(),
          23,
          59,
          59,
          999,
        ),
        'Asia/Bangkok',
      ).toISOString(),
      type: 'other',
    },
  ])
  const [filterKeySelected, setFilterKeySelected] = useState(
    filterFields
      .filter(
        item =>
          item?.type === 'searchText' || item?.type === 'filterMonthRange',
      )
      .map(i => i.searchKey),
  )
  const mobileSortOps = mobileSortField?.map(item => ({
    ...item,
    value: `${item.sortKey}-${item.sortDirection}`,
  }))
  const [currentMobileSort, setCurrentMobileSort] = useState<{
    key: string
    sort: string
  } | null>(null)
  const orderPropertyName = useMemo(() => {
    if (sortField) {
      return sortField.key
    } else if (mobileSortField) {
      return currentMobileSort?.key
    } else if (initialSort) return initialSort?.sortBy
    else return null
  }, [currentMobileSort?.key, initialSort, mobileSortField, sortField])
  const orderDirection = useMemo(() => {
    if (sortField) {
      return sortField.sort
    } else if (mobileSortField) {
      return currentMobileSort?.sort
    } else if (initialSort) return initialSort?.sort
    else return null
  }, [currentMobileSort?.sort, initialSort, mobileSortField, sortField])

  const isMultipleKey = (item: FilterItem) =>
    item.searchKey.split(',').length > 1

  const renderOrQuery = (item: FilterItem) =>
    '[' +
    item.searchKey
      .split(',')
      .map(key => key.concat(item.opt, item.value))
      .join('|') +
    ']'

  const filterFieldsMenuDropdown = useMemo(() => {
    return filterFields.filter(
      item =>
        item?.type !== 'searchText' &&
        !filterKeySelected.includes(item.searchKey),
    )
  }, [filterFields, filterKeySelected])

  const filterFieldsSelected = useMemo(() => {
    return filterFields.filter(item =>
      filterKeySelected.includes(item.searchKey),
    )
  }, [filterFields, filterKeySelected])

  const handleRenderQueryStr = useCallback(
    (type: 'tableQuery' | 'exportQuery') => {
      const normalSearchArray: string[] = []
      let otherSearchArray: string[] = []
      switch (type) {
        case 'tableQuery':
          if (orderPropertyName && orderDirection) {
            otherSearchArray = [
              `?page=${page}`,
              `limit=${rowsPerPage}`,
              `order=${orderPropertyName || DEFAULT_ORDER_PROPERTY}:${
                orderDirection || DEFAULT_ORDER_DIRECTION
              }`,
            ]
            break
          } else {
            otherSearchArray = [`?page=${page}`, `limit=${rowsPerPage}`]
            break
          }
        case 'exportQuery':
          if (orderPropertyName && orderDirection) {
            otherSearchArray = [
              `?order=${orderPropertyName || DEFAULT_ORDER_PROPERTY}:${
                orderDirection || DEFAULT_ORDER_DIRECTION
              }`,
            ]
            break
          } else {
            otherSearchArray = []
            break
          }
        default:
          break
      }
      const allFilter = filterConditions.slice()
      if (isArray(initialFilter)) allFilter.push(...initialFilter)
      if (initialFilter && !isArray(initialFilter))
        allFilter.push(initialFilter)

      allFilter.forEach((item: FilterItem) => {
        let _stringSearch = isMultipleKey(item)
          ? renderOrQuery(item)
          : item.searchKey + item.opt + item.value
        if (item.type === 'other') otherSearchArray.push(_stringSearch)
        if (item.type === 'normal') normalSearchArray.push(_stringSearch)
      })

      const normalSearchString = normalSearchArray.join(';')
      const otherSearchString = otherSearchArray.join('&')

      return compact([
        otherSearchString,
        encodeURIComponent(normalSearchString),
      ]).join('&search=') as string
    },
    [
      filterConditions,
      initialFilter,
      orderDirection,
      orderPropertyName,
      page,
      rowsPerPage,
    ],
  )

  //! Call APIs get data
  const {
    data: dataApi,
    isLoading: isLoadingTable,
    refetch: refectApi,
  } = rtk?.useGetQuery?.({
    query: handleRenderQueryStr('tableQuery'),
  })

  //handle change page and change rows per page
  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  // MOBILE additional function
  const addFilterFieldMobile: MenuProps['onClick'] = ({ key }) => {
    setFilterKeySelected(s => [...s, key])
  }
  const removeFilterFieldMobile = (searchKey: string) => {
    setFilterKeySelected(s => s.filter((item: any) => item !== searchKey))
  }
  const renderFilterField = (item: FilterFieldsType, mobile: boolean) => {
    const key = `${item.searchKey}-${item.filterType}`
    const span = mobile ? 22 : 6 * item?.width
    switch (item?.type) {
      case 'searchText':
        return (
          <React.Fragment key={key}>
            <Col span={span}>
              <ReportSearchText
                filterType={item?.filterType}
                searchKey={item?.searchKey}
                placeholder={item?.placeholder ? item?.placeholder : ''}
                setFilter={setFilterConditions}
                setPage={setPage}
              />
            </Col>
          </React.Fragment>
        )
      case 'filterSelection':
        return (
          <React.Fragment key={key}>
            <Col span={span}>
              <FilterSelection
                filterType={item?.filterType}
                children={item?.options?.map((item: FilterOptionType) => (
                  <Option key={item?.value} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
                placeholder={item?.placeholder}
                filter={filterConditions}
                setFilter={setFilterConditions}
                searchKey={item?.searchKey}
                options={item?.options}
                setPage={setPage}
              />
            </Col>
            {mobile && (
              <Col span={2}>
                <CloseCircleOutlined
                  className="text-primary"
                  onClick={() => removeFilterFieldMobile(item.searchKey)}
                />
              </Col>
            )}
          </React.Fragment>
        )
      case 'filterMonthRange':
        return (
          <React.Fragment key={key}>
            <Col span={span}>
              <FilterMonth
                filterType={item?.filterType}
                filter={filterConditions}
                setFilter={setFilterConditions}
                searchKey={item.searchKey}
                setPage={setPage}
              />
            </Col>
            {mobile && (
              <Col span={2}>
                <CloseCircleOutlined
                  className="text-primary"
                  onClick={() => removeFilterFieldMobile(item.searchKey)}
                />
              </Col>
            )}
          </React.Fragment>
        )
      default:
        return null
    }
  }
  //handle download file
  const handleDownloadFile = () => {
    handleExportFile(
      `${import.meta.env.VITE_API_URL}${exportUrl}${
        handleRenderQueryStr('exportQuery').substring(0, 1) === '?'
          ? handleRenderQueryStr('exportQuery')
          : `?${handleRenderQueryStr('exportQuery')}`
      }&export=1`,
    )
  }

  useEffect(() => {
    if (showStatistic) {
      setStatisticQuery(handleRenderQueryStr('exportQuery'))
    }
  }, [handleRenderQueryStr, setStatisticQuery, showStatistic])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceReload = useCallback(debounce(refectApi, 1000), [])

  return (
    <div>
      <div className="desktop hidden sm:block">
        {filterFields?.length > 0 && (
          <Row
            className="my-8 border border-solid border-grayBorder py-4 px-2"
            gutter={[16, 16]}
          >
            {filterFields?.map((item: FilterFieldsType) => {
              return renderFilterField(item, false)
            })}
          </Row>
        )}
      </div>
      <div className="mobile sm:hidden block">
        {filterFieldsSelected?.length > 0 && (
          <Row
            className="my-8 border border-solid border-grayBorder py-4 px-2"
            gutter={[16, 16]}
          >
            {filterFieldsSelected?.map((item: FilterFieldsType) => {
              return renderFilterField(item, true)
            })}
          </Row>
        )}
      </div>

      <div className="mobile sm:hidden flex gap-2 mt-2 w-full overflow-auto">
        {filterFieldsMenuDropdown?.length > 0 && (
          <Dropdown
            menu={{
              items: filterFieldsMenuDropdown?.map((item: any) => ({
                key: item?.searchKey,
                label: item?.placeholder,
              })),
              onClick: addFilterFieldMobile,
            }}
            placement="bottomLeft"
            arrow
          >
            <Button>
              <FilterOutlined />
            </Button>
          </Dropdown>
        )}
        {mobileSortField && (
          <Select
            style={{ width: '100%' }}
            options={mobileSortOps}
            onChange={(value: string) => {
              setCurrentMobileSort({
                key: value.split('-')[0],
                sort: value.split('-')[1],
              })
            }}
            value={
              currentMobileSort
                ? `${orderPropertyName}-${orderDirection}`
                : undefined
            }
            placeholder="Sắp xếp"
          />
        )}
      </div>
      <Row gutter={[8, 8]} className="pb-4 my-2 lg:my-0">
        {showStatistic &&
          statisticData &&
          statisticData.data &&
          statisticData.data.map((item: any) => (
            <Col span={24} md={12} lg={6}>
              <IncomeStatisticCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                value={item.value}
                isLoading={statisticData.isLoading}
              />
            </Col>
          ))}
        <Col
          span={24}
          md={showStatistic ? 12 : 24}
          lg={showStatistic ? 6 : 24}
          className="items-end justify-end hidden lg:flex"
        >
          <Button
            type="primary"
            icon={<ExportOutlined />}
            onClick={handleDownloadFile}
          >
            Xuất báo cáo
          </Button>
          {refetchTable && (
            <Tooltip title="Làm mới" placement="topRight">
              <Button
                icon={<MdRefresh className="text-xl" />}
                className="flex items-center justify-center ml-2"
                onClick={() => debounceReload()}
              />
            </Tooltip>
          )}
        </Col>
      </Row>
      <TableResponsive
        rowKey={rowKey}
        dataSource={dataApi?.data || []}
        columns={columns}
        columnsMobile={columnsMobile || columns}
        totalData={dataApi?.total}
        handleChangePage={handleChangePage}
        loading={isLoadingTable}
        currentPage={page}
      />
    </div>
  )
}

export default ReportTable

import FilterSelection from '@/components/filters/FilterSelection'
import SearchText from '@/components/filters/SearchText'
import {
  Select,
  Row,
  Col,
  Button,
  Typography,
  Dropdown,
  Tooltip,
  Badge,
  Space,
  Spin,
} from 'antd'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import FilterDate from '@/components/filters/FilterDate'
import { compact, debounce, isArray, isEmpty, isNumber } from 'lodash'
import Icon, {
  CloseCircleOutlined,
  FileExcelFilled,
  FilterOutlined,
} from '@ant-design/icons'
import {
  FilterFieldsType,
  FilterOptionType,
  FilterTabsType,
  SortFieldType,
} from '@/services/tableBaseApi/types'
import { FilterItem } from '@/core/objects/Table'
import type { MenuProps } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import TableResponsive from '../Table'
import FilterSelectionWSearch from '../filters/FilterSelectionWSearch'
import { handleExportFile } from '@/utils/helpers/table.helper'
import { MdRefresh } from 'react-icons/md'
import styles from './styles.module.scss'
const { Option } = Select

// FIX CONSTANT
const INIT_PAGE = 1
const INIT_LIMIT = 10
const DEFAULT_ORDER_PROPERTY_NAME = 'createdAt'

type Props = {
  // table props
  columns: ColumnsType<any>
  columnsMobile?: ColumnsType<any>
  rowKey: string

  // query method
  rtk: any
  initialSort?: { sort: 'asc' | 'desc' | string; sortBy: string }
  initialFilter?: FilterItem | FilterItem[]
  sortField?: SortFieldType
  rtkSkip?: boolean
  rtkInterval?: {
    isRefetchData: boolean
    setIsRefetchData: React.Dispatch<React.SetStateAction<boolean>>
  }

  // auto gen input search, tabs
  filterFields: FilterFieldsType[]
  filterTabs?: FilterTabsType

  // action btn
  enableDownloadFile?: boolean

  // ui visible
  hiddenTotal?: boolean
  headerHidden?: boolean
  refetchTable?: boolean
  isBorder?: boolean
  className?: string
  listFilterConditions?: any
  isDisplayListFiterCOndition?: boolean
  rowClassName?: any
  isResizable?: boolean
}

const CRUD = ({
  filterFields,
  initialSort,
  initialFilter,
  filterTabs,
  rtkSkip,
  rtk,
  rowKey = 'id',
  columns,
  columnsMobile,
  sortField,
  headerHidden,
  enableDownloadFile = false,
  hiddenTotal = false,
  refetchTable,
  rtkInterval,
  isBorder,
  className,
  listFilterConditions = [],
  isDisplayListFiterCOndition,
  rowClassName,
  isResizable = false,
}: Props) => {
  const [page, setPage] = useState(INIT_PAGE)
  const [rowsPerPage, setRowsPerPage] = useState(INIT_LIMIT)
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc' | string>(
    initialSort?.sort || 'desc',
  )
  const [filterConditions, setFilterConditions] = useState<FilterItem[]>([])
  const [activedTab, setActivedTab] = useState(
    filterTabs?.options?.[0]?.value || '',
  )
  const [filterKeySelected, setFilterKeySelected] = useState(
    filterFields
      .filter(item => item?.type === 'searchText')
      .map(i => i.searchKey),
  )

  const isMultipleKey = (item: FilterItem) =>
    item.searchKey.split(',').length > 1

  const renderOrQuery = (item: FilterItem) => {
    return (
      '[' +
      item.searchKey
        .split(',')
        .map(key => {
          if (key === 'phone' && Number(item.value.charAt(1)) === 0) {
            return `${key}${item.opt}${item.value.replace(/\s/g, '')}|${key}${
              item.opt
            }${item.value.replace(/\s/g, '').replace('0', '+84')}`
          } else {
            return key.concat(item.opt, item.value)
          }
        })
        .join('|') +
      ']'
    )
  }

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

  //handle render query str
  const handleRenderQueryStr = useCallback(
    (type: 'tableQuery' | 'exportQuery') => {
      const orderPropertyName =
        initialSort?.sortBy || DEFAULT_ORDER_PROPERTY_NAME
      const normalSearchArray: string[] = []
      const otherSearchArray =
        type === 'tableQuery'
          ? [
              `?page=${page}`,
              `limit=${rowsPerPage}`,
              `order=${orderPropertyName}:${orderDirection}`,
            ]
          : [`?order=${orderPropertyName}:${orderDirection}`]
      const allFilter = filterConditions.slice()
      if (isArray(initialFilter)) allFilter.push(...initialFilter)
      if (initialFilter && !isArray(initialFilter))
        allFilter.push(initialFilter)
      if (
        filterTabs?.type &&
        filterTabs?.searchKey &&
        filterTabs?.opt &&
        activedTab
      ) {
        allFilter.push({
          searchKey: filterTabs.searchKey,
          opt: filterTabs.opt,
          value: activedTab,
          type: filterTabs.type as 'normal' | 'other',
        })
      }
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
        'search=' + encodeURIComponent(normalSearchString),
      ]).join('&')
    },
    [
      activedTab,
      filterConditions,
      filterTabs,
      initialFilter,
      initialSort?.sortBy,
      orderDirection,
      page,
      rowsPerPage,
    ],
  )

  //! Call APIs get data
  const {
    data: dataApi,
    isLoading: isLoadingTable,
    refetch: refectApi,
    isFetching: isFetchingOrderDetails,
  } = rtk?.useGetQuery?.(
    {
      query: handleRenderQueryStr('tableQuery'),
    },
    { skip: rtkSkip },
  )

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
              <SearchText
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
      case 'filterSelectionWSearch':
        return (
          <React.Fragment key={key}>
            <Col span={span}>
              <FilterSelectionWSearch
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
      case 'filterDateRange':
        return (
          <React.Fragment key={key}>
            <Col span={span}>
              <FilterDate
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

  const sortOps = useMemo(
    () =>
      sortField?.options.map(child => ({
        label: child.label,
        value: child.sort,
      })),
    [sortField?.options],
  )

  //handle download file
  const handleDownloadFile = () => {
    handleExportFile(
      `${
        import.meta.env.VITE_API_URL
      }/order/admin/orders/export-excel${handleRenderQueryStr('exportQuery')}`,
    )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceReload = useCallback(debounce(refectApi, 1000), [])

  //refetch data every 30s
  const handleRefetchData = useCallback(() => {
    refectApi()
    rtkInterval?.setIsRefetchData(false)
  }, [refectApi, rtkInterval])

  useEffect(() => {
    if (rtkInterval?.isRefetchData) handleRefetchData()
  }, [handleRefetchData, rtkInterval?.isRefetchData])

  const refetchFilterConditions = useCallback(() => {
    listFilterConditions(filterConditions)
  }, [filterConditions, listFilterConditions])

  useEffect(() => {
    isDisplayListFiterCOndition && refetchFilterConditions()
  }, [isDisplayListFiterCOndition, refetchFilterConditions])

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
            {sortField && (
              <Col span={6}>
                <Select
                  style={{ width: '100%' }}
                  options={sortOps}
                  value={orderDirection}
                  onChange={setOrderDirection}
                />
              </Col>
            )}
          </Row>
        )}
      </div>
      <div className="desktop hidden sm:flex items-center justify-between">
        <div>
          {filterTabs && !isEmpty(filterTabs) && (
            <div className="flex w-full overflow-auto">
              {filterTabs?.options?.map((item: any) => {
                return (
                  <Button
                    key={`${filterTabs?.searchKey}-${item?.value}`}
                    className={`rounded-none ${
                      activedTab !== item.value && 'bg-lightBlueBg text-black'
                    } border-y-0 border-l-0 border-r border-solid border-slate-200 ${
                      activedTab === item.value && 'text-white'
                    }`}
                    type="primary"
                    onClick={() => {
                      setActivedTab(item.value)
                      setPage(INIT_PAGE)
                    }}
                  >
                    <Space className="flex items-end">
                      <Icon component={item?.icon} />
                      <span>{item?.label}</span>
                      {isNumber(item?.totalCounted) && (
                        <Spin spinning={item?.isCountingTotal}>
                          <Badge
                            count={item.totalCounted}
                            overflowCount={1000}
                            color="#F26157"
                          />
                        </Spin>
                      )}
                    </Space>
                  </Button>
                )
              })}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {!hiddenTotal && (
            <Typography className="text-[rgba(0,0,0,0.85)] text-right flex-1">{`Tổng: ${dataApi?.total} bản ghi`}</Typography>
          )}
          {enableDownloadFile && (
            <Tooltip title="Download dữ liệu" placement="topRight">
              <Button
                className="text-[#3F8B47] border-[#3F8B47] hover:border-[#60b668] hover:text-[#60b668]"
                onClick={handleDownloadFile}
                icon={<FileExcelFilled className="text-base" />}
              />
            </Tooltip>
          )}
          {refetchTable && (
            <Tooltip title="Làm mới" placement="topRight">
              <Button
                icon={<MdRefresh className="text-xl" />}
                className="flex items-center justify-center ml-2"
                onClick={() => debounceReload()}
                loading={isFetchingOrderDetails}
              />
            </Tooltip>
          )}
        </div>
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
        {filterTabs?.options && (
          <Select
            options={filterTabs?.options}
            className="w-1/2"
            value={activedTab}
            onChange={setActivedTab}
          />
        )}
        {sortField && (
          <Select
            style={{ width: '100%' }}
            options={sortOps}
            value={orderDirection}
            onChange={v => setOrderDirection(v)}
          />
        )}
      </div>

      <TableResponsive
        rowKey={rowKey}
        dataSource={dataApi?.data || []}
        columns={columns}
        columnsMobile={columnsMobile || columns}
        totalData={dataApi?.total}
        handleChangePage={handleChangePage}
        loading={isLoadingTable}
        currentPage={page}
        showHeader={headerHidden}
        bordered={isBorder}
        className={className}
        rowClassName={rowClassName}
        isResizable={isResizable}
      />
    </div>
  )
}

export default CRUD

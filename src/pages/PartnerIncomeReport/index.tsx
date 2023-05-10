import { Button, Tag, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import ReportTable from '@/components/ReportTable'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetPartnerIncomeReportQuery } from '@/services/reportApi'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { handleSetSortFields } from '@/utils/helpers/table.helper'
import { PartnerIncomeReportTransType } from '@/services/reportApi/types'

export type MobileReportSort = {
  id: string
  sortKey: string
  sortDirection: string
  label: string
}

const IncomeReport = () => {
  //handle filter data
  const { data: locationList } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })

  //handle sort table head
  const [sortFields, setSortFields] = React.useState<
    Array<{ key: string; sort: null | string }>
  >([
    {
      key: 'sum_driver_income',
      sort: null,
    },
    {
      key: 'sum_discount',
      sort: null,
    },
  ])
  const currentSort = useMemo(() => {
    const currSort = sortFields.filter(field => field.sort)
    return currSort.length === 0 ? null : currSort[0]
  }, [sortFields])
  //handle Mobile sort
  const mobileSortField: MobileReportSort[] = useMemo(() => {
    return [
      {
        id: 'sum_driver_income-desc',
        sortKey: 'sum_driver_income',
        sortDirection: 'desc',
        label: 'Thu nhập ròng giảm dần',
      },
      {
        id: 'sum_driver_income-asc',
        sortKey: 'sum_driver_income',
        sortDirection: 'asc',
        label: 'Thu nhập ròng tăng dần',
      },
      {
        id: 'sum_discount-desc',
        sortKey: 'sum_discount',
        sortDirection: 'desc',
        label: 'Chiết khấu TH giảm dần',
      },
      {
        id: 'sum_discount-asc',
        sortKey: 'sum_discount',
        sortDirection: 'asc',
        label: 'Chiết khấu TH tăng dần',
      },
    ]
  }, [])
  //table columns
  const columns: ColumnsType<PartnerIncomeReportTransType> = [
    {
      // title: () => {
      //   const isCurrentSort = currentSort?.key === 'date'
      //   return renderTitle(isCurrentSort, currentSort, 'date', 'Ngày')
      // },
      title: 'Tài xế',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: value => <>{value ? value : 'Chưa rõ'}</>,
    },
    {
      title: 'Số chuyến taxi tải',
      dataIndex: 'count_tx',
      key: 'count_tx',
      align: 'center',
      render: value => <>{value.toLocaleString('en-US')}</>,
    },
    {
      title: 'Doanh thu taxi tải',
      dataIndex: 'sum_tx',
      key: 'sum_tx',
      align: 'center',
      render: value => <>{value.toLocaleString('en-US')}</>,
    },
    {
      title: 'Số chuyến chuyển nhà, VP trọn gói',
      dataIndex: 'count_cn',
      key: 'count_cn',
      align: 'center',
      render: value => <>{value.toLocaleString('en-US')}</>,
    },
    {
      title: 'Doanh thu chuyển trọn gói',
      dataIndex: 'sum_cn',
      key: 'sum_cn',
      align: 'center',
      render: value => <>{value.toLocaleString('en-US')}</>,
    },
    {
      title: 'Khu vực',
      dataIndex: 'working_area_name',
      key: 'working_area_name',
      align: 'center',
      render: value => <>{value ? value : 'Chưa rõ'}</>,
    },
    {
      title: () => {
        const isCurrentSort = currentSort?.key === 'sum_driver_income'
        return renderTitle(
          isCurrentSort,
          currentSort,
          'sum_driver_income',
          'Thu nhập ròng',
        )
      },
      dataIndex: 'sum_driver_income',
      key: 'sum_driver_income',
      align: 'center',
      render: value => <>{value ? value.toLocaleString('en-US') : 0}</>,
    },
    {
      title: () => {
        const isCurrentSort = currentSort?.key === 'sum_discount'
        return renderTitle(
          isCurrentSort,
          currentSort,
          'sum_discount',
          'Chiết khấu TH',
        )
      },
      dataIndex: 'sum_discount',
      key: 'sum_discount',
      align: 'center',
      render: value => <>{value ? value.toLocaleString('en-US') : 0}</>,
    },
  ]
  const columnsMobile: ColumnsType<PartnerIncomeReportTransType> = [
    {
      key: 'id',
      className: 'cursor-pointer',
      render: (_, record) => {
        return (
          <div>
            <div className="flex items-center justify-between">
              <Tag color="#108ee9">{record.name}</Tag>
              <span className="text-[#108ee9] font-bold text-base">{}</span>
            </div>
            <div className="mt-2">
              <div>
                Số chuyến taxi tải:{' '}
                <span className="font-bold">
                  {record.count_tx.toLocaleString('en-US')}
                </span>
              </div>
              <div>
                Số chuyến chuyển nhà, VP trọn gói:{' '}
                <span className="font-bold">
                  {record.count_cn.toLocaleString('en-US')}
                </span>
              </div>
              <div>
                Doanh thu taxi tải:{' '}
                <span className="font-bold">
                  {record.sum_tx.toLocaleString('en-US')}
                </span>
              </div>
              <div>
                Doanh thu chuyển trọn gói:{' '}
                <span className="font-bold">
                  {record.sum_cn.toLocaleString('en-US')}
                </span>
              </div>
            </div>
            <div className="text-[#59AFFF] mt-2">
              Thu nhập ròng:{' '}
              <span className="font-bold">
                {record.sum_driver_income.toLocaleString('en-US')}
              </span>
            </div>
            <div className="text-primary">
              Chiết khấu TH:{' '}
              <span className="font-bold">
                {record.sum_discount.toLocaleString('en-US')}
              </span>
            </div>
          </div>
        )
      },
    },
  ]
  //table filter fields
  const filterFields: FilterFieldsType[] = useMemo(
    () => [
      {
        filterType: 'other',
        type: 'searchText',
        searchKey: 'search',
        width: 1,
        placeholder: 'Tìm kiếm',
      },
      {
        filterType: 'other',
        type: 'filterSelection',
        searchKey: 'workingAreaId',
        placeholder: 'Tìm kiếm khu vực',
        options:
          !locationList || locationList?.length <= 0
            ? [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các khu vực',
                  isSelected: true,
                },
              ]
            : [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các khu vực',
                  isSelected: true,
                },
                ...locationList?.map(
                  (item: { value: string | number; label: string }) => ({
                    id: item.value,
                    value: item.value,
                    label: item.label,
                    isSelected: false,
                  }),
                ),
              ],
        width: 1,
      },
      {
        filterType: 'other',
        type: 'filterMonthRange',
        searchKey: 'dateFrom;dateTo',
        width: 1,
        placeholder: 'Thời gian từ - đến',
      },
    ],
    [locationList],
  )
  const [statisticQuery, setStatisticQuery] = useState<string>('')
  //statistic query
  const renderTitle = (
    isCurrentSort: boolean,
    currentSort: { key: string; sort: string | null } | null,
    columnKey: string,
    title: string,
  ) => {
    return (
      <div className="flex items-center justify-center">
        <span>{title}</span>
        <Button
          className="ml-2 flex items-center"
          type="link"
          icon={
            isCurrentSort ? (
              <>{currentSort?.sort === 'ASC' ? <FaSortUp /> : <FaSortDown />}</>
            ) : (
              <FaSort className="text-grayButton" />
            )
          }
          onClick={() => {
            const newSortField = handleSetSortFields(
              sortFields,
              columnKey,
              sortFields.filter(field => field.key === columnKey)[0].sort,
            )
            setSortFields(newSortField)
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">BÁO CÁO ĐỐI TÁC</Typography>
      </div>
      <ReportTable
        columns={columns}
        filterFields={filterFields}
        sortField={currentSort}
        rtk={{
          useGetQuery: useGetPartnerIncomeReportQuery,
        }}
        rowKey="id"
        showStatistic={false}
        columnsMobile={columnsMobile}
        mobileSortField={mobileSortField}
        initialSort={{
          sortBy: 'id',
          sort: 'DESC',
        }}
        setStatisticQuery={setStatisticQuery}
        exportUrl="/order/admin/reports/revenue-driver/export"
        refetchTable={true}
      />
    </>
  )
}

export default IncomeReport

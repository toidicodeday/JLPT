import { Button, Tag, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import ReportTable from '@/components/ReportTable'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  useGetIncomeReportQuery,
  useGetIncomeStatisticQuery,
  useLazyGetIncomeStatisticQuery,
} from '@/services/reportApi'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { handleSetSortFields } from '@/utils/helpers/table.helper'
import { formatDateString } from '@/utils/helpers/convert.helper'
import { IncomeReportTransType } from '@/services/reportApi/types'
import { lastDayOfMonth } from 'date-fns'
import {
  TotalCnStatistic,
  TotalIncomeStatistic,
  TotalTxStatistic,
} from '@/assets/img'
import { zonedTimeToUtc } from 'date-fns-tz'

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
      key: 'date',
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
        id: 'date-asc',
        sortKey: 'date',
        sortDirection: 'asc',
        label: 'Cũ nhất',
      },
      {
        id: 'date-desc',
        sortKey: 'date',
        sortDirection: 'desc',
        label: 'Mới nhất',
      },
    ]
  }, [])
  //table columns
  const columns: ColumnsType<IncomeReportTransType> = [
    {
      title: () => {
        const isCurrentSort = currentSort?.key === 'date'
        return renderTitle(isCurrentSort, currentSort, 'date', 'Ngày')
      },
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: value => <>{formatDateString(value)}</>,
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
      title: 'Tổng doanh thu',
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      align: 'center',
      render: value => (
        <div className="text-[#59AFFF] font-bold">
          {value.toLocaleString('en-US')}
        </div>
      ),
    },
  ]
  const columnsMobile: ColumnsType<IncomeReportTransType> = [
    {
      key: 'id',
      className: 'cursor-pointer',
      render: (_, record) => {
        return (
          <div>
            <div className="flex items-center justify-between">
              <Tag color="#108ee9">{formatDateString(record.date)}</Tag>
              <span className="text-[#108ee9] font-bold text-base">
                {record.totalIncome.toLocaleString('en-US')}
              </span>
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
  //statistic data
  const today = new Date()
  const [statisticQuery, setStatisticQuery] = useState<string>(
    `?order=date:ASC&dateFrom=${zonedTimeToUtc(
      new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0),
      'Asia/Bangkok',
    ).toISOString()}&dateTo=${zonedTimeToUtc(
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
    ).toISOString()}`,
  )
  const { data: statisticRawData, isLoading: isLoadingStatistic } =
    useGetIncomeStatisticQuery({
      query:
        statisticQuery.substring(0, 1) === '?'
          ? statisticQuery
          : `?${statisticQuery}`,
    })
  const statisticData = useMemo(() => {
    return [
      {
        title: 'Tổng doanh thu',
        icon: TotalIncomeStatistic,
        value: statisticRawData?.sum_revenue
          ? statisticRawData?.sum_revenue
          : 0,
      },
      {
        title: 'Tổng chuyến taxi tải',
        icon: TotalTxStatistic,
        value: statisticRawData?.count_tx ? statisticRawData?.count_tx : 0,
      },
      {
        title: 'Tổng chuyến trọn gói',
        icon: TotalCnStatistic,
        value: statisticRawData?.count_cn ? statisticRawData?.count_cn : 0,
      },
    ]
  }, [statisticRawData])
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
        <Typography className="text-lg font-bold">BÁO CÁO DOANH THU</Typography>
      </div>
      <ReportTable
        columns={columns}
        filterFields={filterFields}
        sortField={currentSort}
        rtk={{
          useGetQuery: useGetIncomeReportQuery,
          useGetStatistic: useLazyGetIncomeStatisticQuery,
        }}
        rowKey="date"
        showStatistic={true}
        columnsMobile={columnsMobile}
        mobileSortField={mobileSortField}
        initialSort={{
          sortBy: 'date',
          sort: 'ASC',
        }}
        setStatisticQuery={setStatisticQuery}
        statisticData={{
          data: statisticData,
          isLoading: isLoadingStatistic,
        }}
        exportUrl="/order/admin/reports/revenue/export"
        refetchTable={true}
      />
    </>
  )
}

export default IncomeReport

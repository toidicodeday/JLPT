import { useGetDriverHistoryEvaluateQuery } from '@/services/driverApi'
// import { useGetQuery } from '@/services/tableBaseApi'
import { Card, Col, Input, Row, Statistic } from 'antd'

import React, { useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatDate, numberWithComma } from '@/utils/helpers/convert.helper'
import DatePicker from '@/components/inputs/DatePicker'
import { debounce } from 'lodash'
import { useGetOneDriverQuery } from '@/services/partnerApi/partner'
import { ColumnsType } from 'antd/lib/table'
import TableResponsive from '@/components/Table'

const initPage = 1
const initPageSize = 10
const DEBOUNCE_TIME = 500
const { RangePicker } = DatePicker

const DriverActivityLogs = () => {
  const location = useLocation()
  const driverId = new URLSearchParams(location.search).get('id')

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [contentSearch, setContentSearch] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const { data: driverInfo } = useGetOneDriverQuery(
    { id: Number(driverId) },
    { skip: !driverId },
  )

  const searchQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&driverId=${driverId}&search=`
    let queryEncode = ''
    if (contentSearch) queryEncode += `code:ilike:%${contentSearch}%;`
    if (dateStart) queryEncode += `createdAt:>=:${dateStart};`
    if (dateEnd) queryEncode += `createdAt:<=:${dateEnd};`
    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [contentSearch, dateEnd, dateStart, driverId, page, rowsPerPage])

  const { data: historyRevenue, isLoading: loading } =
    useGetDriverHistoryEvaluateQuery({
      query: searchQuery,
    })

  const columnsMobile: ColumnsType<any> = [
    {
      key: 'id',
      render: (_: unknown, record: any) => {
        return (
          <>
            <p className="font-bold">
              {record?.code} - {record?.service?.name}
            </p>
            <p>Ngày tạo: {formatDate(record?.createdAt)}</p>
            <p>Hình thức: {record?.paymentMethod?.name}</p>
            <p>Giá cước: {record?.price && numberWithComma(record?.price)}</p>
            {driverInfo?.unitKey !== 'thanhhung_driver' && (
              <>
                <p>Chiết khấu: {record?.Cincome}</p>
                <p>Thu nhập dòng: {record?.income}</p>
              </>
            )}
          </>
        )
      },
    },
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'Thời gian',
      key: 'date',
      render: (_: unknown, record: any) => formatDate(record?.createdAt),
    },
    {
      title: 'Mã chuyến hàng',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Dịch vụ',
      key: 'serviceType',
      dataIndex: ['service', 'name'],
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: ['paymentMethod', 'name'],
      key: 'paymentMethod',
    },
    {
      title: 'Giá cước',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (_: unknown, record: any) =>
        record?.price && numberWithComma(record?.revenue),
    },
    ...(driverInfo?.unitKey !== 'thanhhung_driver'
      ? [
          {
            title: 'Chiết khấu',
            dataIndex: 'discount',
            key: 'discount',
            render: (_: unknown, record: any) =>
              numberWithComma(record?.discount),
          },
          {
            title: 'Thu nhập ròng',
            dataIndex: 'netIncome',
            key: 'netIncome',
            render: (_: unknown, record: any) =>
              numberWithComma(record?.netIncome),
          },
        ]
      : []),
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchContent = useCallback(
    debounce(value => setContentSearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (newPage: number, newPageSize: number) => {
    setPage(newPage)
    setRowsPerPage(newPageSize)
  }

  return (
    <>
      <div className="site-statistic-demo-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} className=" p-4 bg-grayDivider">
            <Card>
              <Statistic
                title="Tổng chuyến"
                value={historyRevenue?.data?.count}
                valueStyle={{ color: '#116476' }}
              />
            </Card>
          </Col>
          {driverInfo?.unitKey !== 'thanhhung_driver' && (
            <Col xs={24} sm={24} md={8} className=" p-4 bg-grayDivider">
              <Card>
                <Statistic
                  title="Thu nhập ròng"
                  value={
                    historyRevenue?.data?.netIncome
                      ? historyRevenue?.data?.netIncome
                      : 0
                  }
                  valueStyle={{ color: '#D32F2F' }}
                />
              </Card>
            </Col>
          )}
          {driverInfo?.unitKey !== 'thanhhung_driver' && (
            <Col xs={24} sm={24} md={8} className=" p-4 bg-grayDivider">
              <Card>
                <Statistic
                  title="Tổng chiết khấu"
                  value={
                    historyRevenue?.data?.totalDiscount
                      ? historyRevenue?.data?.totalDiscount
                      : 0
                  }
                  valueStyle={{ color: '#F99233' }}
                />
              </Card>
            </Col>
          )}
        </Row>
        <div className="my-4 border border-solid border-grayBorder py-4 px-2">
          <Row gutter={16}>
            <Col className="rounded" span={12} lg={{ span: 18 }} xs={24}>
              <Input
                allowClear
                placeholder="Tìm kiếm"
                onChange={(values: any) => {
                  debounceSearchContent(values?.target?.value)
                  setPage(initPage)
                }}
                className="mb-2"
              />
            </Col>
            <Col span={12} lg={{ span: 6 }} xs={24}>
              <RangePicker
                className="w-full"
                format="YYYY-MM-DD"
                onChange={(value: any) => {
                  if (value) {
                    setDateStart(formatDate(value[0], 'yyyy-MM-dd'))
                    setDateEnd(formatDate(value[1], 'yyyy-MM-dd'))
                    setPage(initPage)
                  } else {
                    setDateStart('')
                    setDateEnd('')
                    setPage(initPage)
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <TableResponsive
          columns={columns}
          dataSource={historyRevenue?.data?.data}
          loading={loading}
          className="mt-2"
          totalData={historyRevenue?.data?.count}
          handleChangePage={handleChangePage}
          columnsMobile={columnsMobile}
          currentPage={page}
        />
      </div>
    </>
  )
}

export default DriverActivityLogs

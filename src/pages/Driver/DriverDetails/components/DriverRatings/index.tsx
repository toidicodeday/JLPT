import { useGetDriverEvaluateQuery } from '@/services/driverApi'
import { formatDate, formatPhone } from '@/utils/helpers/convert.helper'
import { Col, Rate, Row, Table } from 'antd'
import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const initPage = 1
const initPageSize = 10

const DriverRatings = () => {
  const location = useLocation()
  const driverId = new URLSearchParams(location.search).get('id')

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)

  const { data: driverEvaluate, isLoading: loading } =
    useGetDriverEvaluateQuery({
      query: `?page=${page}&limit=${rowsPerPage}&order=evaluateDate:desc&driverId=${driverId}`,
    })

  const columns = [
    {
      title: '',
      render: (record: any) => {
        return (
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <p className="font-bold mb-2">
                {record?.guest?.name} ( {formatPhone(record?.guest?.phone)} )
              </p>
              <p>{formatDate(record?.evaluateDate, 'hh:mm aaa dd/MM/yyyy')}</p>
            </Col>
            <Col xs={24} sm={24} md={16}>
              <Rate allowHalf disabled value={record?.serviceRateStar} />
              <p className="mt-1">{record?.serviceGuestReviews}</p>
            </Col>
          </Row>
        )
      },
    },
  ]

  const handleChangePage = (newPage: number, newPageSize: number) => {
    setPage(newPage)
    setRowsPerPage(newPageSize)
  }
  const summaryInfo = useMemo(() => {
    let receipt = '0'
    let cancel = '0'
    let rating = '0'
    const { receiptPercent, cancelPercent, everageRating } =
      driverEvaluate?.data?.datasetResponse || {}

    if (receiptPercent) receipt = ((receiptPercent || 0) * 100).toFixed(2)
    if (cancelPercent) cancel = ((cancelPercent || 0) * 100).toFixed(2)
    if (everageRating) rating = ((everageRating || 0) * 5).toFixed(2)

    return {
      receipt,
      cancel,
      rating,
    }
  }, [driverEvaluate?.data?.datasetResponse])

  return (
    <>
      <div className="flex gap-x-8 gap-y-4 flex-wrap">
        <div className="flex">
          <p>Tỉ lệ nhận đơn:</p>
          <p className="text-[#35703B] ml-2">{summaryInfo.receipt} %</p>
        </div>
        <div className="flex">
          <p>Tỉ lệ huỷ chuyến:</p>
          <p className="text-[#2192FF] ml-2">{summaryInfo.cancel} %</p>
        </div>
        <div className="flex">
          <p>Khách hàng đánh giá trung bình:</p>
          <p className="text-[#F99233] ml-2">{summaryInfo.rating}</p>
        </div>
      </div>
      <div>
        <div className="mt-4 font-bold text-[16px]">
          Đánh giá của khách hàng
        </div>
        <Table
          columns={columns}
          rowKey="id"
          dataSource={driverEvaluate?.data?.data}
          showHeader={false}
          loading={loading}
          className="mt-2"
          pagination={{
            total: driverEvaluate?.data?.count,
            pageSizeOptions: [10, 20, 50, 100],
            defaultPageSize: 10,
            showSizeChanger: true,
            onChange(page, pageSize) {
              handleChangePage(page, pageSize)
            },
          }}
        />
      </div>
    </>
  )
}

export default DriverRatings

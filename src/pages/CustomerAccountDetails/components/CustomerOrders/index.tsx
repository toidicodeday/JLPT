import { useGetHistoryCustomerQuery } from '@/services/customerApi'
import { Table, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import { format } from 'date-fns'
import {
  CN_ORDER_STATUS_ARR,
  ORDER_STATUS,
  TYPE_SERVICE_ORDER,
} from '@/utils/constant/constant'
import { numberWithComma } from '@/utils/helpers/convert.helper'

type Props = {
  idGuest: string | null
}
const initPage = 1
const initPageSize = 10

const CustomerOrders = ({ idGuest }: Props) => {
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)

  const { data: historyCust, isLoading: loading } = useGetHistoryCustomerQuery({
    id: idGuest,
    query: `?page=${page}&limit=${rowsPerPage}`,
  })
  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  const columns = [
    {
      key: 'code',
      render: (_: any, record: any) => {
        return (
          <Typography
            key={record.id}
            className="text-left"
          >{`${record?.code} - ${record?.service?.name}`}</Typography>
        )
      },
    },
    {
      key: 'pickupDate',
      render: (_: any, record: any) => {
        return (
          <p>
            {record?.pickupDate
              ? `${format(new Date(record?.pickupDate), 'dd/MM/yyyy')}`
              : ''}
          </p>
        )
      },
    },
    {
      key: 'status',
      render: (_: any, record: any) => {
        let statusOrder: any[] = []
        if (record?.service.type === TYPE_SERVICE_ORDER.MOVING_OFFICE)
          statusOrder = CN_ORDER_STATUS_ARR
        else statusOrder = ORDER_STATUS
        return (
          <>
            {statusOrder
              .filter(
                (item: {
                  value: number
                  label: string
                  color: string | undefined
                }) => item.value === record?.status,
              )
              .map(item => (
                <Tag color={item.color}>{item.label}</Tag>
              ))}
          </>
        )
      },
    },
  ]
  return (
    <>
      <div className="flex gap-6 font-bold mb-4">
        <p>Đã đặt {historyCust?.total} chuyến hàng</p>
        <p>
          Tổng trị giá: {numberWithComma(Number(historyCust?.totalMoney))} vnd
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={historyCust?.data}
        loading={loading}
        className="border border-solid border-[#D9D9D9] rounded px-4"
        showHeader={false}
        pagination={{
          total: historyCust?.total,
          pageSizeOptions: [10, 20, 50, 100],
          defaultPageSize: 10,
          showSizeChanger: true,
          onChange(page, pageSize) {
            handleChangePage(page, pageSize)
          },
        }}
      />
    </>
  )
}

export default CustomerOrders

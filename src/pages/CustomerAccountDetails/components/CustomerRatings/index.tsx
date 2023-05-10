import TableResponsive from '@/components/Table'
import { useGetHistoryCustomerQuery } from '@/services/customerApi'
import { Rate, Table } from 'antd'
import { format } from 'date-fns'
import React, { useState } from 'react'

type Props = {
  idGuest: string | null
}
const initPage = 1
const initPageSize = 10

const CustomerRatings = ({ idGuest }: Props) => {
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)

  const { data: historyCust, isLoading: loading } = useGetHistoryCustomerQuery({
    id: idGuest,
    query: `?page=${page}&limit=${rowsPerPage}&search=evaluateDate:IS NOT:NULL`,
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
          <>
            <div className="font-bold">Chuyến hàng {record?.code}</div>
            <div>
              {record?.evaluateDate &&
                format(new Date(record?.evaluateDate), 'hh:mm aaa dd/MM/yyyy')}
            </div>
          </>
        )
      },
    },
    {
      key: 'rate',
      render: (_: any, record: any) => {
        return (
          <>
            <Rate allowHalf disabled value={record?.applicationRateStar} />
            <div className="mt-1">{record?.applicationGuestReviews}</div>
            <Rate allowHalf disabled value={record?.serviceRateStar} />
            <div className="mt-1">{record?.serviceGuestReviews}</div>
          </>
        )
      },
    },
  ]
  const columnsMobile = [
    {
      key: 'code',
      render: (_: any, record: any) => {
        return (
          <>
            <div className="font-bold">Chuyến hàng {record?.code}</div>
            <div>
              {record?.evaluateDate &&
                format(new Date(record?.evaluateDate), 'hh:mm aaa dd/MM/yyyy')}
            </div>
            <Rate allowHalf disabled value={record?.applicationRateStar} />
            <div className="mt-1">{record?.applicationGuestReviews}</div>
            <Rate allowHalf disabled value={record?.serviceRateStar} />
            <div className="mt-1">{record?.serviceGuestReviews}</div>
          </>
        )
      },
    },
  ]
  return (
    <div className="mt-2">
      <TableResponsive
        columns={columns}
        dataSource={historyCust?.data}
        loading={loading}
        className="border-solid border-[#D9D9D9] rounded px-4"
        showHeader={false}
        totalData={historyCust?.total}
        handleChangePage={handleChangePage}
        columnsMobile={columnsMobile}
        currentPage={page}
      />
    </div>
  )
}

export default CustomerRatings

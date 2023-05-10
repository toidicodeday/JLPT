import { Col, Input, Row, Typography } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import DatePicker from '@/components/inputs/DatePicker'
import { useGetHistoryQuery } from '@/services/vehicleApi'
import { format } from 'date-fns'
import { useGetDriverByIdQuery } from '@/services/driverApi'
import { debounce } from 'lodash'
import TableResponsive from '@/components/Table'

const { RangePicker } = DatePicker
interface Props {
  idVehicle: string | null
  detailVehicle: any
}
const initPage = 1
const initPageSize = 10
const DEBOUNCE_TIME = 500

const VehicleActivityLogs = ({ idVehicle, detailVehicle }: Props) => {
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [contentSearch, setContentSearch] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const searchHistoryQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&order=createdAt:desc&search=`
    let queryEncode = ''
    if (idVehicle) queryEncode += `vehicleId:=:${idVehicle};`
    if (contentSearch)
      queryEncode += `contentDescription:ilike:%${contentSearch}%;`
    if (dateStart) queryEncode += `createdAt:>=:${dateStart};`
    if (dateEnd) queryEncode += `createdAt:<=:${dateEnd};`
    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [contentSearch, dateEnd, dateStart, idVehicle, page, rowsPerPage])

  const { data: listHistoryVehicle, isLoading: loading } = useGetHistoryQuery({
    query: searchHistoryQuery,
  })

  const { data: detailDriver } = useGetDriverByIdQuery({
    id: detailVehicle?.data?.driverId,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchContent = useCallback(
    debounce(value => setContentSearch(value), DEBOUNCE_TIME),
    [],
  )
  const columnsMobile = [
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: any) => (
        <>
          <p>
            {record?.createdAt
              ? format(new Date(record?.createdAt), 'dd/MM/yyyy')
              : ''}
          </p>
          <p>{record?.contentDescription}</p>
          <p>{record.ref === 'driver' ? detailDriver?.data?.name : 'Admin'}</p>
        </>
      ),
    },
  ]

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: any) => (
        <Typography>
          {record?.createdAt
            ? format(new Date(record?.createdAt), 'dd/MM/yyyy')
            : ''}
        </Typography>
      ),
    },
    {
      title: 'Hoạt động',
      dataIndex: 'contentDescription',
      key: 'contentDescription',
    },
    {
      title: 'Người thực hiện',
      key: 'by',
      render: (_: any, record: any) => (
        <Typography>
          {record.ref === 'driver' ? detailDriver?.data?.name : 'Admin'}
        </Typography>
      ),
    },
  ]

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  return (
    <>
      <div className="my-4 border border-solid border-grayBorder py-4 px-2">
        <Row gutter={16}>
          <Col className="rounded" xs={24} sm={24} md={18}>
            <Input
              allowClear
              placeholder="Tìm kiếm"
              onChange={(values: any) => {
                setPage(initPage)
                debounceSearchContent(values?.target?.value)
              }}
              className="mb-2"
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <RangePicker
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(value: any) => {
                if (value) {
                  setDateStart(format(value[0], 'yyyy-MM-dd'))
                  setDateEnd(format(value[1], 'yyyy-MM-dd'))
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
        dataSource={listHistoryVehicle?.data}
        loading={loading}
        totalData={listHistoryVehicle?.total}
        handleChangePage={handleChangePage}
        columnsMobile={columnsMobile}
        currentPage={page}
      />
    </>
  )
}

export default VehicleActivityLogs

import { Button, Tooltip } from 'antd'
import React, { useMemo, useState } from 'react'
import CRUD from '@/components/CRUD'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { ColumnsType } from 'antd/lib/table'
import { formatDate } from '@/utils/helpers/convert.helper'
import { RecordType } from '@/services/audioRecordApi/types'
import { useGetRecordListQuery } from '@/services/audioRecordApi'
import { EyeOutlined } from '@ant-design/icons'
import CallDetailsModal from './CallDetailsModal'

const CallList = () => {
  const [openCallModal, setOpenCallModal] = useState<boolean>(false)
  const [detailCall, setDetailCall] = useState()

  const columnsMobile: ColumnsType<RecordType> = [
    {
      key: 'code',
      render: (value, record) => {
        return (
          <div>
            <p className="mr-3 font-bold">
              Khách hàng: {record?.guest ? record?.guest?.name : 'Chưa rõ'}
            </p>
            <p className="mr-3 font-bold">
              Tài xế: {record?.driver ? record?.driver?.name : 'Chưa rõ'}
            </p>
            <p>
              Chuyến hàng: {record?.orderCode}{' '}
              {formatDate(record?.createdAt, 'HH:mm dd/MM/yyyy')}
            </p>
          </div>
        )
      },
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => {
        return (
          <Tooltip title="Xem và chỉnh sửa" placement="topRight">
            <Button
              type="text"
              icon={<EyeOutlined className="text-lg text-navyButton" />}
              onClick={() => {
                setOpenCallModal(true)
                setDetailCall(record)
              }}
            />
          </Tooltip>
        )
      },
    },
  ]
  const columns: ColumnsType<RecordType> = [
    {
      title: 'Khách hàng',
      key: 'guest',
      render: (_, record) => (record?.guest ? record?.guest?.name : 'Chưa rõ'),
    },
    {
      title: 'Tài xế',
      key: 'driver',
      dataIndex: 'driver',
      render: value => (value ? value?.name : 'Chưa rõ'),
    },
    {
      title: 'Mã chuyến hàng',
      key: 'orderCode',
      dataIndex: 'orderCode',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      align: 'center',
      render: (_, record) => formatDate(record?.createdAt, 'HH:mm dd/MM/yyyy'),
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => {
        return (
          <Tooltip title="Xem và chỉnh sửa" placement="topRight">
            <Button
              type="text"
              icon={<EyeOutlined className="text-lg text-navyButton" />}
              onClick={() => {
                setOpenCallModal(true)
                setDetailCall(record)
              }}
            />
          </Tooltip>
        )
      },
    },
  ]

  const filterField: FilterFieldsType[] = useMemo(
    () => [
      {
        filterType: 'normal',
        type: 'searchText',
        searchKey: 'orderCode',
        placeholder: 'Tìm kiếm',
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterDateRange',
        searchKey: 'createdAt',
        width: 1,
        placeholder: 'Thời gian từ - đến',
      },
    ],
    [],
  )

  return (
    <>
      <CRUD
        columns={columns}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetRecordListQuery }}
        rowKey="id"
        columnsMobile={columnsMobile}
      />
      <CallDetailsModal
        open={openCallModal}
        setOpen={(type: boolean) => setOpenCallModal(type)}
        detailCall={detailCall}
      />
    </>
  )
}

export default CallList

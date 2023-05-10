import Icon from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'
import React, { useMemo } from 'react'
import { FaLock, FaUnlockAlt } from 'react-icons/fa'
import CRUD from '@/components/CRUD'
import { Link, useNavigate } from 'react-router-dom'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { ColumnsType } from 'antd/lib/table'
import { CustommerType } from '@/services/customerApi/types'
import { useGetCustomerListQuery } from '@/services/customerApi'
import { useGetGuestTypeOpsQuery } from '@/services/guestTypeApi'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  addAllOpsToFilterOps,
  formatPhone,
} from '@/utils/helpers/convert.helper'
import { SelectOptionType } from '@/services/commonResposntType'
import { AiFillEdit } from 'react-icons/ai'

const CustomerAccountList = () => {
  const { data: customerTypeList } = useGetGuestTypeOpsQuery()
  const { data: locationList } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })
  const locationOps = useMemo(() => {
    return addAllOpsToFilterOps(locationList, 'Tất cả các khu vực')
  }, [locationList])
  const customerTypeOps = useMemo(() => {
    return addAllOpsToFilterOps(customerTypeList, 'Tất cả các loại khách hàng')
  }, [customerTypeList])
  const navigate = useNavigate()

  const columnsMobile: ColumnsType<CustommerType> = [
    {
      key: 'code',
      render: (value, record) => {
        return (
          <div>
            <span className="mr-3 font-bold">Khách hàng: {record?.name}</span>
            {record?.isBlocked ? (
              <FaLock className="text-[#FFE7D0]" />
            ) : (
              <FaUnlockAlt className="text-[#B6B4B4]" />
            )}
            <p>Số điện thoại: {formatPhone(record?.phone)}</p>
            <p>
              Khu vực:{' '}
              {record?.workingArea ? record?.workingArea?.name : 'Chưa rõ'}
            </p>
            <p>Số chuyến đăt: {record?.countOrder}</p>
            {record?.guestType ? (
              <p>Loại khách hàng {record?.guestType?.name}</p>
            ) : (
              <p>Loại khách hàng: Chưa rõ</p>
            )}
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
              icon={<AiFillEdit className="text-lg text-navyButton" />}
              onClick={() => navigate(`/khach-hang/chi-tiet?id=${record?.id}`)}
            />
          </Tooltip>
        )
      },
    },
  ]
  const columns: ColumnsType<CustommerType> = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <Link to={`/khach-hang/chi-tiet?id=${record?.id}`}>
          <Typography className="text-primary">{value}</Typography>
        </Link>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: value => <div>{value.replace('+84', '0')}</div>,
    },
    {
      title: 'Khu vực',
      key: 'addressId',
      align: 'center',
      render: (record: any) =>
        record?.workingArea ? record?.workingArea?.name : 'Chưa rõ',
    },
    {
      title: 'Số chuyến đã đặt',
      dataIndex: 'countOrder',
      key: 'countOrder',
      align: 'center',
    },
    {
      title: 'Loại khách hàng',
      dataIndex: 'guestTypeId',
      key: 'guestTypeId',
      align: 'center',
      render: value => {
        const currGuestType = customerTypeList?.filter(
          (item: SelectOptionType) => item.value === value,
        )
        if (currGuestType && currGuestType?.length > 0) {
          return <Typography>{currGuestType[0]?.label}</Typography>
        } else {
          return <Typography>Chưa rõ</Typography>
        }
      },
    },
    {
      title: '',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      align: 'center',
      render: value => {
        if (value) {
          return <Icon component={FaLock} style={{ color: '#FFE7D0' }} />
        } else {
          return <Icon component={FaUnlockAlt} style={{ color: '#B6B4B4' }} />
        }
      },
    },
  ]

  const filterField: FilterFieldsType[] = useMemo(
    () => [
      {
        filterType: 'normal',
        type: 'searchText',
        searchKey: 'name,phone',
        placeholder: 'Tìm kiếm',
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'addressId',
        placeholder: 'Tìm kiếm khu vực',
        options: locationOps,
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'guestTypeId',
        placeholder: 'Loại khách hàng',
        options: customerTypeOps,
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
    [customerTypeOps, locationOps],
  )

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          QUẢN LÝ KHÁCH HÀNG
        </Typography>
      </div>
      <CRUD
        columns={columns}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetCustomerListQuery }}
        rowKey="id"
        columnsMobile={columnsMobile}
        initialFilter={{
          type: 'normal',
          searchKey: 'status',
          opt: ':<>:',
          value: 0,
        }}
        refetchTable={true}
      />
    </>
  )
}

export default CustomerAccountList

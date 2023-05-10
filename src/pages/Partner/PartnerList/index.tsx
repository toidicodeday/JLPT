import { Tag, Typography } from 'antd'
import React, { useMemo } from 'react'
import CRUD from '@/components/CRUD'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useGetVehicleCategoryOptionsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { DriverType } from '@/services/partnerApi/types'
import { useGetDriverQuery } from '@/services/partnerApi/partner'
import { PARTNER_STATUS } from '@/utils/constant/constant'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { ColumnsType } from 'antd/lib/table'
import { PARTNER_STATUS_FULL, WORKING_AREA } from '@/constants/status'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { formatDate, formatPhone } from '@/utils/helpers/convert.helper'

const PartnerList = () => {
  const { data: opsVehicleCategory } = useGetVehicleCategoryOptionsQuery()
  const { data: LocationOps } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })
  const statusOptions = useMemo(() => {
    return [
      {
        id: 'all',
        label: 'Tất cả các trạng thái',
        value: 'all',
        isSelected: true,
      },
      ...PARTNER_STATUS_FULL.filter((item: any) => item.value !== 0).map(
        (item: any) => {
          return {
            ...item,
            isSelected: false,
          }
        },
      ),
    ]
  }, [])

  const navigate = useNavigate()

  const statusColumns = (status: number) => {
    switch (status) {
      case PARTNER_STATUS.NEW:
        return <Tag color="#e99e10">Chưa verify OTP</Tag>
      case PARTNER_STATUS.VERIFIED_OTP:
        return <Tag color="#D32F2F">Chưa phê duyệt</Tag>
      case PARTNER_STATUS.ACTIVE:
        return <Tag color="#35703B">Đã phê duyệt</Tag>
      case PARTNER_STATUS.REJECTED:
        return <Tag color="#A9A9A9">Huỷ</Tag>
    }
  }

  const columnsMobile: ColumnsType<DriverType[]> = [
    {
      title: 'Tài xế đăng ký',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div>
          <span className="font-bold text-base text-black mr-3">
            {record?.name}
          </span>
          {statusColumns(record?.status)}

          <div className="mt-1">
            <span className="text-sm text-black">
              {record.vehicles?.[0]?.licensePlatese || 'Không biển số'} -
              {record.vehicles?.[0]?.vehicleCategory?.name || 'Không rõ'}
            </span>
          </div>
          <p className="mt-1">Số điện thoại: {formatPhone(record.phone)}</p>
          <p className="mt-1">CCCD: {record.cccd}</p>
          <p className="mt-1">
            Ngày đăng ký:{' '}
            {formatDate(record.createdAt, 'hh:mm dd/MM/yyyy') || 'Không rõ'}
          </p>
          {record.vehicles[0]?.workingAreaId === WORKING_AREA.HN ? (
            <p>Khu vực: Hà Nội</p>
          ) : record.vehicles[0]?.workingAreaId === WORKING_AREA.HN ? (
            <p>Khu vực: Hồ Chí Minh</p>
          ) : (
            <p>Khu vực: Chưa rõ</p>
          )}
        </div>
      ),
    },
    {
      key: 'action',
      render: (_: any, record: any) => {
        const vehicleId = record.vehicles?.[0]?.id || null
        return (
          <div
            className="hover:cursor-pointer"
            onClick={() => handleChangePage(record.id, vehicleId)}
          >
            <span className="px-3 py-1 bg-blueColor rounded text-white hover:bg-clear_chill">
              Xem
            </span>
          </div>
        )
      },
    },
  ]

  const columns: ColumnsType<DriverType[]> = [
    {
      title: 'Tài xế đăng ký',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div>
          <Typography className="font-bold text-base text-black">
            {record?.name}
          </Typography>
          <Typography className="mt-1">{formatPhone(record.phone)}</Typography>
          <Typography className="mt-1">{record.cccd}</Typography>
          <Typography className="mt-1">
            Ngày đăng ký:{' '}
            {formatDate(record.createdAt, 'dd/MM/yyyy') || 'Không rõ'}
          </Typography>
        </div>
      ),
    },
    {
      title: 'Thông tin xe',
      dataIndex: 'vehicle',
      key: 'vehicleCate',
      render: (_: any, record: any) => {
        const vehicleLicense =
          record.vehicles?.[0]?.licensePlatese || 'Không biển số'
        const vehicleCategory =
          record.vehicles?.[0]?.vehicleCategory?.name || 'Không rõ'
        return (
          <div>
            <Typography className="font-bold text-base text-black">
              {vehicleLicense}
            </Typography>
            <Typography className="mt-1">Loại xe: {vehicleCategory}</Typography>
          </div>
        )
      },
    },
    {
      title: 'Khu vực đăng ký hoạt động',
      dataIndex: 'vehicles',
      key: 'location',
      align: 'center',
      render: (_: any, record: any) => {
        switch (record.vehicles[0]?.workingAreaId) {
          case WORKING_AREA.HN:
            return <Typography>Hà Nội</Typography>
          case WORKING_AREA.HCM:
            return <Typography>Hồ Chí Minh</Typography>
          default:
            return <Typography>Chưa rõ</Typography>
        }
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (values: number) => statusColumns(values),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      align: 'center',
      render: (_: any, record: any) => {
        const vehicleId = record.vehicles?.[0]?.id || null
        return (
          <div
            className="hover:cursor-pointer"
            onClick={() => handleChangePage(record.id, vehicleId)}
          >
            <span className="px-3 py-1 bg-blueColor rounded text-white hover:bg-clear_chill">
              Xem
            </span>
          </div>
        )
      },
    },
  ]
  const filterFields: FilterFieldsType[] = useMemo(
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
        searchKey: 'vehicles.workingAreaId',
        placeholder: 'Tìm kiếm khu vực',
        options: LocationOps
          ? [
              {
                id: 0,
                label: 'Tất cả các khu vực',
                value: 'all',
                isSelected: true,
              },
              ...LocationOps,
            ]
          : [
              {
                id: 0,
                label: 'Tất cả các khu vực',
                value: 'all',
                isSelected: true,
              },
            ],
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'status',
        placeholder: 'Trạng thái',
        options: statusOptions,
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'vehicleCategory.id',
        placeholder: 'Chọn loại xe',
        options: opsVehicleCategory
          ? [
              {
                id: 0,
                label: 'Tất cả các loại xe',
                value: 'all',
                isSelected: true,
              },
              ...opsVehicleCategory,
            ]
          : [
              {
                id: 0,
                label: 'Tất cả các loại xe',
                value: 'all',
                isSelected: true,
              },
            ],
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
    [LocationOps, opsVehicleCategory, statusOptions],
  )
  const handleChangePage = (driverId: string, vehicleCateId: string) => {
    navigate({
      pathname: '/doi-tac/chi-tiet',
      search: createSearchParams({
        driverId: driverId,
        vehicleId: vehicleCateId,
      }).toString(),
    })
  }
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          QUẢN LÝ ĐĂNG KÝ CỦA ĐỐI TÁC
        </Typography>
      </div>
      <CRUD
        columns={columns}
        filterFields={filterFields}
        rtk={{ useGetQuery: useGetDriverQuery }}
        initialFilter={[
          {
            type: 'normal',
            searchKey: 'status',
            opt: ':<>:',
            value: 0,
          },
          {
            type: 'normal',
            searchKey: 'unitKey',
            opt: ':=:',
            value: 'thanhhung_partner',
          },
        ]}
        rowKey="id"
        initialSort={{ sort: 'asc%3BcreatedAt:desc', sortBy: 'status' }}
        columnsMobile={columnsMobile}
        refetchTable={true}
      />
    </>
  )
}

export default PartnerList

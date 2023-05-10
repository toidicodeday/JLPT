import React, { useMemo, useState } from 'react'
import { Button, Tooltip, Typography, TableColumnProps, Switch } from 'antd'
import { FaHandshake } from 'react-icons/fa'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { HiTruck } from 'react-icons/hi'
import { MdAddCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {
  useDeleteDriverMutation,
  useEditDriverMutation,
  useGetDriverQuery,
} from '@/services/driverApi'
import CRUD from '@/components/CRUD'
import {
  addAllOpsToFilterOps,
  formatDate,
  formatPhone,
} from '@/utils/helpers/convert.helper'
import { DriverType } from '@/services/driverApi/type'
import {
  DRIVER_TYPE,
  STATUS_DRIVER,
  SYSTEM_ROLE_KEY,
} from '@/utils/constant/constant'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetMeQuery } from '@/services/accountApi/account'

const DriverList = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.driver,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.driver,
        'delete',
      ),
    }
  }, [adminInfo])

  const [deleteInfo, setDeleteInfo] = useState<{
    visible: boolean
    id: number | null
  }>({ visible: false, id: null })

  const [statusNotifyInfo, setStatusNotifyInfo] = useState<{
    visible: boolean
    id: number
    isNotify: boolean
  }>({ visible: false, id: 0, isNotify: false })

  const { data: locationList } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })
  const locationOps = useMemo(() => {
    return addAllOpsToFilterOps(locationList, 'Tất cả các khu vực')
  }, [locationList])

  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation()
  const [editDriver] = useEditDriverMutation()
  const { data: userMe } = useGetMeQuery()

  const handleDeleteDriver = (id: number | null) => {
    if (id === null) return
    try {
      deleteDriver({ id }).then(response => {
        if ('data' in response) {
          toast.success('Xóa tài xế thành công!')
          setDeleteInfo({ visible: false, id: null })
        }
        if ('error' in response) {
          toast.error(
            get(response.error, 'data.error.message') ||
              MESSAGES.CALL_API_DELETE_ERROR,
          )
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const actionColumns = (record: any) => {
    return (
      <>
        <Tooltip title="Xem và chỉnh sửa thông tin tài xế" placement="topRight">
          <Link to={`/quan-ly-xe/tai-xe/chi-tiet?id=${record.id}`}>
            <Button
              type="text"
              icon={<AiFillEdit className="text-xl text-gray-600" />}
            />
          </Link>
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá thông tin tài xế" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-xl text-gray-600" />}
              onClick={() =>
                setDeleteInfo({ visible: true, id: record.id || null })
              }
            />
          </Tooltip>
        )}
      </>
    )
  }

  const columnsMobile: TableColumnProps<DriverType>[] = [
    {
      key: 'id',
      render: (_, record) => {
        return (
          <>
            <div className="flex gap-3">
              <p className="font-bold">Tài xế: {record?.name}</p>
              <Tooltip
                title="Chỉnh sửa chế độ nhận chuyến của tài xế"
                placement="topRight"
              >
                <Switch
                  checked={record?.notify}
                  onChange={() =>
                    record.id &&
                    setStatusNotifyInfo({
                      visible: true,
                      id: record.id,
                      isNotify: !record?.notify,
                    })
                  }
                  disabled={!userMe?.data?.isAdmin}
                  className={`mr-2 mb-3 ${
                    record?.notify ? 'bg-[#63DB6F]' : 'bg-[#9D9999]'
                  }`}
                />
              </Tooltip>
            </div>
            {record.notify &&
            record.player_id != null &&
            record?.vehicles &&
            record?.vehicles[0]?.status === 'PUBLISH' ? (
              <p className="text-[#63DB6F] ">Trạng thái app: Hoạt động</p>
            ) : (
              <p className="text-primary">Trạng thái app: Tắt</p>
            )}
            <p>Số điện thoại: {formatPhone(record?.phone)}</p>
            <p>Ngày sinh: {record?.dob && formatDate(record?.dob)}</p>
            <p>Khu vực: {record?.address}</p>
            <p>
              Mã xe:{' '}
              {record?.vehicles && record?.vehicles[0]?.vehicleCode
                ? record?.vehicles[0]?.vehicleCode
                : 'Chưa rõ'}
            </p>
            {!record?.vehicles?.length && (
              <p className="text-gray-300">Không có xe</p>
            )}
            {record?.vehicles &&
              record?.vehicles?.map((item: any) => (
                <p>
                  {item?.vehicleCategory?.name &&
                    `${item?.vehicleCategory?.name} - `}
                  {item?.licensePlatese}
                </p>
              ))}
          </>
        )
      },
    },
    {
      key: 'actions',
      align: 'right',
      render: (_a, record) => actionColumns(record),
    },
  ]

  const columns: TableColumnProps<DriverType>[] = [
    {
      title: 'Tài xế',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      render: formatPhone,
    },
    {
      title: 'Khu vực',
      key: 'workingAreaId',
      align: 'center',
      render: (_a, record) => record?.workingArea?.name,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      align: 'center',
      render: (v: string) => formatDate(v),
    },
    {
      title: 'Mã xe',
      key: 'vehicles',
      dataIndex: 'vehicles',
      render: values =>
        values[0]?.vehicleCode ? values[0]?.vehicleCode : 'Chưa rõ',
    },
    {
      title: 'Xe',
      dataIndex: 'vehicles',
      key: 'vehicles',
      render: values => {
        if (!values.length) return <p className="text-gray-300">Không có xe</p>
        return values.map((item: any) => (
          <p>
            {item?.vehicleCategory?.name && `${item?.vehicleCategory?.name} - `}
            {item?.licensePlatese}
          </p>
        ))
      },
    },
    {
      title: 'Chế độ nhận chuyến',
      dataIndex: 'notify',
      align: 'center',
      key: 'notify',
      render: (_a, record) => (
        <Switch
          checked={record?.notify}
          onChange={() =>
            record.id &&
            setStatusNotifyInfo({
              visible: true,
              id: record.id,
              isNotify: !record?.notify,
            })
          }
          disabled={!userMe?.data?.isAdmin}
          className={`mr-2 mb-3 ${
            record?.notify ? 'bg-[#63DB6F]' : 'bg-[#9D9999]'
          }`}
        />
      ),
    },
    {
      title: 'Trạng thái app',
      dataIndex: 'notify',
      align: 'center',
      key: 'notify',
      render: (_a, record) =>
        record?.notify && record?.isOnline ? (
          <p className="text-[#63DB6F] ">Hoạt động</p>
        ) : (
          <p className="text-primary">Tắt</p>
        ),
    },
    {
      key: 'actions',
      align: 'right',
      render: (_a, record) => actionColumns(record),
    },
  ]

  const filterField: FilterFieldsType[] = [
    {
      filterType: 'normal',
      type: 'searchText',
      searchKey: 'name,phone,vehicles.licensePlatese',
      placeholder: 'Tìm kiếm',
      width: 3,
    },
    {
      filterType: 'normal',
      type: 'filterSelection',
      searchKey: 'workingAreaId',
      placeholder: 'Tìm kiếm khu vực',
      options: locationOps,
      width: 1,
    },
  ]

  const filterTabs = {
    type: 'normal',
    searchKey: 'unitKey',
    opt: ':=:',
    options: [
      {
        value: DRIVER_TYPE.THANHHUNG_DRIVER,
        icon: HiTruck,
        label: 'Tài xế Thành Hưng',
        isSearching: true,
      },
      {
        value: DRIVER_TYPE.THANHHUNG_PARTNER,
        icon: FaHandshake,
        label: 'Tài xế đối tác',
        isSearching: false,
      },
    ],
  }

  const handleChangeStatusNotify = (id: number, isNotify: boolean) => {
    const data = {
      notify: isNotify,
    }
    editDriver({ id, data }).then(response => {
      if ('data' in response) {
        toast.success('Chỉnh sửa thành công!')
        setStatusNotifyInfo({ ...statusNotifyInfo, visible: false })
      } else if ('error' in response) {
        toast.error('Chỉnh sửa thất bại!')
      }
    })
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ TÀI XẾ</Typography>
        {authorizeStatus.canCreate && (
          <div className="flex items-center">
            <Tooltip title="Thêm mới tài xế" placement="topRight">
              <Link to="/quan-ly-xe/tai-xe/them-moi">
                <Button
                  type="text"
                  icon={<MdAddCircle className="text-2xl text-primary" />}
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <CRUD
        columns={columns}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetDriverQuery }}
        filterTabs={filterTabs}
        hiddenTotal
        initialSort={{ sort: 'desc', sortBy: 'isOnline' }}
        rowKey="id"
        columnsMobile={columnsMobile}
        initialFilter={{
          type: 'normal',
          searchKey: 'status',
          opt: ':=:',
          value: STATUS_DRIVER.ACTIVE,
        }}
        refetchTable={true}
      />
      <ConfirmModal
        setIsModalOpen={() => setDeleteInfo({ visible: false, id: null })}
        isModalOpen={deleteInfo.visible}
        onSubmit={() => handleDeleteDriver(deleteInfo.id)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá tài xế"
        message="Bạn có chắc chắn muốn xoá tài xế hiện tại?"
        isDeleting={isDeleting}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setStatusNotifyInfo({ ...statusNotifyInfo, visible: isOpen })
        }
        isModalOpen={statusNotifyInfo.visible}
        onSubmit={() =>
          handleChangeStatusNotify(
            statusNotifyInfo?.id,
            statusNotifyInfo.isNotify,
          )
        }
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle={`Xác nhận ${
          statusNotifyInfo.isNotify ? 'bật' : 'tắt'
        } chế độ nhận chuyến`}
        message={`Bạn chắc chắn ${
          statusNotifyInfo.isNotify ? 'bật' : 'tắt'
        } chế độ nhận chuyến của tài xế`}
      />
    </>
  )
}

export default DriverList

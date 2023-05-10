import { Button, Popconfirm, Tag, Tooltip, Typography } from 'antd'
import React, { useMemo } from 'react'
import CRUD from '@/components/CRUD'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import {
  useGetStaffQuery,
  useDeleteStaffMutation,
} from '@/services/accountApi/account'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { ColumnsType } from 'antd/lib/table'
import { STAFF_STATUS_FULL, STAFF_STATUS } from '@/constants/status'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { AdminAccount, AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { useGetRolesOpsQuery } from '@/services/roleApi'

const StaffAccountList = () => {
  const navigate = useNavigate()
  const statusOptions = useMemo(() => {
    return [
      {
        id: 'all',
        label: 'Tất cả các trạng thái',
        value: 'all',
        isSelected: true,
      },
      ...STAFF_STATUS_FULL.map((item: any) => {
        return {
          ...item,
          isSelected: false,
        }
      }),
    ]
  }, [])

  const { data: roleOps } = useGetRolesOpsQuery()

  const [openConfirmModal, setOpenConfirmModal] = React.useState<boolean>(false)
  const [selectedStaff, setSelectedStaff] = React.useState<number>(0)

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.account,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.account,
        'delete',
      ),
    }
  }, [adminInfo])

  const actionColumns = (record: AdminAccount) => {
    return (
      <>
        <Tooltip
          title="Xem và chỉnh sửa thông tin tài khoản"
          placement="topRight"
        >
          <Button
            type="text"
            icon={<AiFillEdit className="text-lg text-navyButton" />}
            onClick={() =>
              navigate(
                `/quan-ly-tai-khoan/tai-khoan/chi-tiet/?staffId=${record?.id}`,
              )
            }
          />
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá thông tin tài khoản" placement="topRight">
            <Popconfirm
              title={`Bạn có chắc chắn xoá tài khoản ${record.name}?`}
              placement="bottomRight"
              okText="Tiếp tục"
              cancelText="Quay lại"
              onConfirm={() => handleDeleteStaff(record.id)}
            >
              <Button
                type="text"
                icon={<AiFillDelete className="text-lg" />}
                onClick={() => {
                  setSelectedStaff(record?.id)
                }}
              />
            </Popconfirm>
          </Tooltip>
        )}
      </>
    )
  }

  const statusColumns = (values: number) => {
    switch (values) {
      case STAFF_STATUS.ACTIVE:
        return <Tag color="#87d068">Hoạt động</Tag>
      case STAFF_STATUS.LOCKED:
        return <Tag color="#A9A9A9">Khoá</Tag>
      default:
        return null
    }
  }

  const columnsMobile: ColumnsType<AdminAccount> = [
    {
      key: 'id',
      render: (_, record) => {
        return (
          <>
            <p>
              {record?.name} {statusColumns(record?.status)}
            </p>
            <p>
              Quyền:{' '}
              {record.systemRoles && record?.systemRoles?.length > 0 ? (
                <span className="flex items-center flex-wrap">
                  {record.systemRoles.map(
                    (item: { id: number; name: string }) => (
                      <Tag key={item.id}>{item.name}</Tag>
                    ),
                  )}
                </span>
              ) : (
                'Chưa rõ'
              )}
            </p>
            <p>Số điện thoại: {formatPhone(record?.phone)}</p>
          </>
        )
      },
    },
    {
      key: 'action',
      align: 'right',
      render: (_: any, record: any) => actionColumns(record),
    },
  ]
  const columns: ColumnsType<AdminAccount> = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => <Typography>{record?.name}</Typography>,
    },
    {
      title: 'Quyền',
      dataIndex: 'systemRoles',
      align: 'center',
      key: 'systemRoles',
      render: value => (
        <>
          {value && value?.length > 0 ? (
            <div className="flex items-center justify-center flex-wrap">
              {value.map((item: { id: number; name: string }) => (
                <Tag key={item.id}>{item.name}</Tag>
              ))}
            </div>
          ) : (
            'Chưa rõ'
          )}
        </>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'center',
      key: 'phone',
      render: value => <div>{formatPhone(value)}</div>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (values: number) => statusColumns(values),
    },
    {
      key: 'action',
      align: 'right',
      render: (_: any, record: any) => actionColumns(record),
    },
  ]

  const filterField: FilterFieldsType[] = useMemo(() => {
    return [
      {
        filterType: 'normal',
        type: 'searchText',
        searchKey: 'name',
        placeholder: 'Tìm kiếm',
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'status',
        placeholder: 'Loại trạng thái',
        options: statusOptions,
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterSelection',
        searchKey: 'systemRoles.id',
        placeholder: 'Loại quyền',
        options:
          !roleOps || roleOps?.length <= 0
            ? [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả quyền',
                  isSelected: true,
                },
              ]
            : [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả quyền',
                  isSelected: true,
                },
                ...roleOps?.map(
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
    ]
  }, [statusOptions, roleOps])

  const [deleteStaff] = useDeleteStaffMutation()
  const handleDeleteStaff = async (id: number) => {
    try {
      const response = await deleteStaff({
        id: id,
      })
      if ('data' in response) {
        toast.success('Xoá tài khoản thành công!')
      }
      if ('error' in response) {
        toast.error('Xoá tài khoản có lỗi. Vui lòng kiểm tra lại!')
      }
      setOpenConfirmModal(false)
    } catch (error) {
      toast.error('Xoá tài khoản có lỗi. Vui lòng kiểm tra lại!')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ TÀI KHOẢN</Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới tài khoản" placement="topRight">
              <Link to="/quan-ly-tai-khoan/tai-khoan/them-moi">
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
        rtk={{ useGetQuery: useGetStaffQuery }}
        rowKey="id"
        columnsMobile={columnsMobile}
        refetchTable={true}
      />
      <ConfirmModal
        setIsModalOpen={(type: boolean) => setOpenConfirmModal(type)}
        isModalOpen={openConfirmModal}
        onSubmit={() => handleDeleteStaff(selectedStaff)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá tài khoản nhân viên"
        message="Bạn có chắc chắn muốn xoá tài khoản hiện tại?"
      />
    </>
  )
}

export default StaffAccountList

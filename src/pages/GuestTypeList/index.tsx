import { Button, Tooltip, Typography } from 'antd'
import React, { useMemo } from 'react'
import CRUD from '@/components/CRUD'
import { ColumnsType } from 'antd/lib/table'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { GuestTypeType } from '@/services/guestTypeApi/types'
import {
  useDeleteGuestTypeMutation,
  useGetGuestTypeListQuery,
} from '@/services/guestTypeApi'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/modals/ConfirmModal'
import EditGuestModal from './components/EditGuestType'
import AddGuestModal from './components/AddGuestType'
import { MdAddCircle } from 'react-icons/md'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { get } from 'lodash'

const GUEST_NEW_ID = 1

const GuestTypeList = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.guestType,
        'create',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.guestType,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.guestType,
        'delete',
      ),
    }
  }, [adminInfo])

  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = React.useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false)

  const [deleteGuestType] = useDeleteGuestTypeMutation()
  const [selectedType, setSelectedType] = React.useState<GuestTypeType | null>(
    null,
  )

  const columns: ColumnsType<GuestTypeType> = [
    {
      title: 'Loại khách hàng',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      render: value => <div>{value}</div>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      align: 'right',
      render: (_, record) => {
        return (
          <>
            {authorizeStatus.canEdit && (
              <Tooltip title="Chỉnh sửa thông tin" placement="topRight">
                <Button
                  icon={<AiFillEdit />}
                  type="text"
                  onClick={() => handleSelectEdit(record)}
                  disabled={record.id === GUEST_NEW_ID}
                />
              </Tooltip>
            )}
            {authorizeStatus.canDelete && (
              <Tooltip title="Xoá loại khách hàng" placement="topRight">
                <Button
                  icon={<AiFillDelete />}
                  type="text"
                  onClick={() => handleSelectDelete(record)}
                  disabled={record.id === GUEST_NEW_ID}
                />
              </Tooltip>
            )}
          </>
        )
      },
    },
  ]
  const filterFields: FilterFieldsType[] = useMemo(
    () => [
      {
        filterType: 'normal',
        type: 'searchText',
        searchKey: 'name',
        placeholder: 'Tìm kiếm',
        width: 1,
      },
    ],
    [],
  )
  const handleSelectEdit = (item: GuestTypeType) => {
    setSelectedType(item)
    setOpenEditModal(true)
  }
  const handleSelectDelete = (item: GuestTypeType) => {
    setSelectedType(item)
    setOpenConfirmModal(true)
  }
  const handleDeleteType = async () => {
    try {
      const deleteRes = await deleteGuestType({
        id: selectedType?.id,
      })
      if ('data' in deleteRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpenConfirmModal(false)
      }
      if ('error' in deleteRes) {
        toast.error(
          get(deleteRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          QUẢN LÝ LOẠI KHÁCH HÀNG
        </Typography>
        {authorizeStatus.canCreate && (
          <div className="flex items-center">
            <Tooltip title="Thêm mới chuyến hàng" placement="topRight">
              <Button
                type="text"
                icon={<MdAddCircle className="text-2xl text-primary" />}
                onClick={() => {
                  setOpenCreateModal(true)
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <CRUD
        columns={columns}
        filterFields={filterFields}
        rtk={{ useGetQuery: useGetGuestTypeListQuery }}
        rowKey="id"
      />
      <EditGuestModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        initialVal={selectedType?.name}
        editId={selectedType?.id}
      />
      <AddGuestModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <ConfirmModal
        isModalOpen={openConfirmModal}
        setIsModalOpen={setOpenConfirmModal}
        onSubmit={handleDeleteType}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xoá loại khách hàng"
        message={`Bạn đang xoá loại khách hàng ${selectedType?.name}. Bạn có muốn tiếp tục?`}
      />
    </>
  )
}

export default GuestTypeList

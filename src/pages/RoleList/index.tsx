import Icon from '@ant-design/icons'
import { Button, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import CRUD from '@/components/CRUD'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import AddNewRole from './components/AddNewRole'
import EditRole from './components/EditRole'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { Link } from 'react-router-dom'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { ColumnsType } from 'antd/lib/table'
import { useDeleteRoleMutation, useGetRolesQuery } from '@/services/roleApi'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { RoleT } from '@/services/roleApi/type'
import { get } from 'lodash'
import useGetPermission from '@/hooks/useGetPermission'

const RoleList = () => {
  //handle Authorize
  const { createPermission, editPermission, deletePermission } =
    useGetPermission(SYSTEM_ROLE_KEY.role)

  const columns: ColumnsType<RoleT> = [
    {
      title: 'Quyền',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => <Typography>{record?.name}</Typography>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      fixed: 'right',
      align: 'right',
      width: 100,
      render: (_, record) => {
        return (
          <div className={`${record.name === 'Admin' ? 'hidden' : ''}`}>
            {editPermission && (
              <Tooltip
                title="Xem và chỉnh sửa thông tin tài khoản"
                placement="topRight"
              >
                <Button
                  type="text"
                  icon={
                    <Icon
                      component={AiFillEdit}
                      style={{ fontSize: '18px', color: 'primary' }}
                    />
                  }
                  onClick={() => {
                    setSelectedRole(record)
                    setIsSetInit(true)
                    showEditModal()
                  }}
                />
              </Tooltip>
            )}
            {deletePermission && (
              <Tooltip title="Xoá thông tin tài khoản" placement="topRight">
                <Button
                  type="text"
                  icon={
                    <Icon
                      component={AiFillDelete}
                      style={{ fontSize: '18px' }}
                    />
                  }
                  onClick={() => {
                    setSelectedRole(record)
                    setIsConfirmModalOpen(true)
                  }}
                />
              </Tooltip>
            )}
          </div>
        )
      },
    },
  ]

  const filterField: FilterFieldsType[] = [
    {
      filterType: 'normal',
      type: 'searchText',
      searchKey: 'name',
      placeholder: 'Tìm kiếm',
      width: 1,
    },
  ]

  //add new role / edit role modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const [selectedRole, setSelectedRole] = React.useState<any>({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const showEditModal = () => {
    setIsEditModalOpen(true)
  }

  //delete confirm modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation()
  const handleDeleteRole = async () => {
    const response = await deleteRole({
      id: selectedRole.id,
    })
    if ('data' in response) {
      toast.success(MESSAGES.CALL_API_DELETE_SUCCESS)
      setIsConfirmModalOpen(false)
    }
    if ('error' in response) {
      toast.error(
        get(response.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
      )
    }
  }

  //set init val for edit modal
  const [isSetInit, setIsSetInit] = useState<boolean>(false)

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ QUYỀN</Typography>
        {createPermission && (
          <div>
            <Tooltip title="Thêm mới quyền" placement="topRight">
              <Button
                type="text"
                icon={
                  <Icon
                    component={MdAddCircle}
                    style={{ fontSize: '24px', color: '#FF0000' }}
                  />
                }
                onClick={() => {
                  showModal()
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-8">
        <Link to="/quan-ly-tai-khoan/phan-quyen">
          <Button type="primary">Phân quyền</Button>
        </Link>
      </div>
      <CRUD
        columns={columns}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetRolesQuery }}
        hiddenTotal
        initialSort={{ sort: 'asc', sortBy: 'id' }}
        rowKey="id"
      />
      <AddNewRole
        isModalOpen={isModalOpen}
        setIsModalOpen={(type: boolean) => setIsModalOpen(type)}
      />
      <EditRole
        isModalOpen={isEditModalOpen}
        setIsModalOpen={(type: boolean) => setIsEditModalOpen(type)}
        selectedItem={selectedRole}
        setInit={setIsSetInit}
        isInit={isSetInit}
      />
      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        setIsModalOpen={(type: boolean) => setIsConfirmModalOpen(type)}
        onSubmit={handleDeleteRole}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xoá quyền"
        message={`Bạn đang xoá quyền ${selectedRole.name}. Bạn có muốn tiếp tục?`}
        isDeleting={isDeleting}
      />
    </>
  )
}

export default RoleList

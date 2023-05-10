import { Button, Col, Input, Row, Tooltip, Typography } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {
  useDeleteVehicleCategoryByIdMutation,
  useGetVehicleCategoryQuery,
} from '@/services/vehicleCategoryApi/vehicleCategory'
import Table, { ColumnsType } from 'antd/lib/table'
import { VehicleCategoryType } from '@/services/vehicleCategoryApi/types'
import { debounce } from 'lodash'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { toast } from 'react-toastify'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const VehicleCategoryList = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicleCategory,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicleCategory,
        'delete',
      ),
    }
  }, [adminInfo])

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [nameCategorySearch, setNameCategorySearch] = useState('')
  const [isConfirmModal, setIsConfirmModal] = useState<{
    isOpen: boolean
    id: number
  }>({
    isOpen: false,
    id: 0,
  })
  const [deleteVehicleCategory, { isLoading: isDeletingVehicleCategory }] =
    useDeleteVehicleCategoryByIdMutation()
  const columns: ColumnsType<VehicleCategoryType> = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record) => (
        <Link to={`/quan-ly-xe/loai-xe/chi-tiet?id=${record.id}`}>
          <Typography className="font-bold">{record.name}</Typography>
          <Typography className="font-[0.625rem]">
            Dài {record.length}, Rộng {record.width}, Cao {record.height}, Thể
            tích {record.volumn} (m3)
          </Typography>
        </Link>
      ),
    },
    {
      key: 'active',
      align: 'right',
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip
              title="Xem và chỉnh sửa thông tin loại xe"
              placement="topRight"
            >
              <Link to={`/quan-ly-xe/loai-xe/chi-tiet?id=${record.id}`}>
                <Button
                  type="text"
                  icon={<AiFillEdit className="text-grayColor text-xl" />}
                />
              </Link>
            </Tooltip>
            {authorizeStatus.canDelete && (
              <Tooltip title="Xoá loại xe" placement="topRight">
                <Button
                  type="text"
                  icon={<AiFillDelete className="text-grayColor text-xl" />}
                  onClick={() => {
                    setIsConfirmModal({ isOpen: true, id: record?.id })
                  }}
                />
              </Tooltip>
            )}
          </>
        )
      },
    },
  ]

  const queryVehicleCategory = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''
    if (nameCategorySearch) queryEncode += `name:ilike:%${nameCategorySearch}%`

    return query + encodeURIComponent(queryEncode)
  }, [nameCategorySearch, page, rowsPerPage])

  const { data: vehicleCategory, isLoading: loading } =
    useGetVehicleCategoryQuery({
      query: queryVehicleCategory,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchVehicleCategory = useCallback(
    debounce(value => setNameCategorySearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  const handleDeleteVehicleCategory = async (id: number) => {
    try {
      const deleteResponse = await deleteVehicleCategory({ id: id })
      if ('data' in deleteResponse) toast.success('Xóa loại xe thành công!')
      if ('error' in deleteResponse) toast.error('Xóa loại xe thất bại!')
      setIsConfirmModal({ ...isConfirmModal, isOpen: false })
      if (
        vehicleCategory?.data &&
        vehicleCategory?.data?.length <= 1 &&
        page > 1
      ) {
        setPage(page - 1)
      }
    } catch (error) {
      toast.error('Xóa loại xe thất bại!')
    }
  }

  return (
    <div className="font-sans">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ LOẠI XE</Typography>
        {authorizeStatus.canCreate && (
          <div className="flex items-center">
            <Tooltip title="Thêm mới loại xe" placement="topRight">
              <Link to="/quan-ly-xe/loai-xe/them-moi">
                <Button
                  type="text"
                  icon={<MdAddCircle className="text-2xl text-primary" />}
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <Row
        gutter={16}
        className="my-4 border border-solid border-grayBorder py-4 px-2"
      >
        <Col className="rounded" xs={24} sm={24} md={8}>
          <Input
            allowClear
            placeholder="Tìm kiếm"
            onChange={(values: any) => {
              setPage(initPage)
              debounceSearchVehicleCategory(values?.target?.value)
            }}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={vehicleCategory?.data}
        loading={loading}
        pagination={{
          current: page,
          total: vehicleCategory?.total,
          pageSizeOptions: [10, 20, 50, 100],
          defaultPageSize: 10,
          showSizeChanger: true,
          onChange(page, pageSize) {
            handleChangePage(page, pageSize)
          },
        }}
        showHeader={false}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setIsConfirmModal({ ...isConfirmModal, isOpen: isOpen })
        }
        isModalOpen={isConfirmModal.isOpen}
        onSubmit={() => handleDeleteVehicleCategory(isConfirmModal.id)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá loại xe"
        message="Bạn có chắc chắn muốn xoá loại xe hiện tại?"
        isDeleting={isDeletingVehicleCategory}
      />
    </div>
  )
}

export default VehicleCategoryList

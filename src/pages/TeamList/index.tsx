import { Button, Col, Input, Row, Select, Tooltip, Typography } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {
  useDeleteVehicleGroupMutation,
  useGetVehicleGroupListQuery,
} from '@/services/vehicleGroup'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { debounce } from 'lodash'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { toast } from 'react-toastify'
import TableResponsive from '@/components/Table'
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
console.log('test')
const TeamList = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.driverTeam,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.driverTeam,
        'delete',
      ),
    }
  }, [adminInfo])

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [nameSearch, setNameSearch] = useState<string>('')
  const [workingAreaIdSearch, setWorkingAreaIdSearch] = useState<number>()
  const [vehicleCategoryIdSearch, setVehicleCategoryIdSearch] =
    useState<number>()

  const [isConfirmModal, setIsConfirmModal] = useState<{
    isOpen: boolean
    id: number
  }>({
    isOpen: false,
    id: 0,
  })
  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchVehicleGroup = useCallback(
    debounce(value => setNameSearch(value), DEBOUNCE_TIME),
    [],
  )
  const searchQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''
    if (workingAreaIdSearch)
      queryEncode += `workingAreaId:=:${workingAreaIdSearch};`
    if (nameSearch) queryEncode += `name:ilike:%${nameSearch}%;`
    if (vehicleCategoryIdSearch)
      queryEncode += `categoryId:=:${vehicleCategoryIdSearch};`

    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [
    nameSearch,
    page,
    rowsPerPage,
    workingAreaIdSearch,
    vehicleCategoryIdSearch,
  ])

  const { data: dataVehicleGroup, isLoading: loading } =
    useGetVehicleGroupListQuery({
      query: searchQuery,
    })
  const [deleteVehicleGroup, { isLoading: isDeleting }] =
    useDeleteVehicleGroupMutation()

  const actionColumns = (record: any) => {
    return (
      <>
        <Tooltip title="Xem chi tiết đội xe" placement="topRight">
          <Link to={`/quan-ly-xe/doi-xe/chi-tiet?id=${record.id}`}>
            <Button type="text" icon={<AiFillEdit className="text-xl" />} />
          </Link>
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá thông tin đội xe" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-xl" />}
              onClick={() => {
                setIsConfirmModal({ isOpen: true, id: record?.id })
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }

  const columnsMobile = [
    {
      key: 'id',
      render: (_: unknown, record: any) => {
        return (
          <>
            <p className="font-bold">Đội xe: {record?.name}</p>
            <p>Đội trưởng: {record?.captain?.name}</p>
            <p>Khu vực hoạt động: {record?.workingArea?.name}</p>
            <p>Số lượng xe: {record?.count}</p>
          </>
        )
      },
    },
    {
      key: 'active',
      render: (_: any, record: any) => actionColumns(record),
    },
  ]

  const columns = [
    {
      title: 'Đội xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đội trưởng',
      key: 'captainId',
      render: (record: any) => <p>{record?.captain?.name}</p>,
    },
    {
      title: 'Khu vực hoạt động',
      key: 'workingAreaId',
      align: 'center',
      render: (record: any) => <p>{record?.workingArea?.name}</p>,
    },
    {
      title: 'Số lượng xe',
      dataIndex: 'count',
      key: 'count',
      align: 'center',
    },
    {
      key: 'active',
      align: 'right',
      render: (_: any, record: any) => actionColumns(record),
    },
  ]

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  const handleDeleteVehicleGroup = async (id: number) => {
    try {
      const deleteResponse = await deleteVehicleGroup({ id: id })
      if ('data' in deleteResponse) toast.success('Xóa đội xe thành công!')
      if ('error' in deleteResponse) toast.error('Xóa đội xe thất bại!')
      setIsConfirmModal({ ...isConfirmModal, isOpen: false })
    } catch (error) {
      toast.error('Xóa đội xe thất bại!')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ ĐỘI XE</Typography>
        {authorizeStatus.canCreate && (
          <Link to="/quan-ly-xe/doi-xe/them-moi">
            <Button
              type="text"
              icon={<MdAddCircle className="text-2xl text-primary" />}
            />
          </Link>
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
            className="mb-2"
            onChange={(values: any) => {
              setPage(initPage)
              debouncSearchVehicleGroup(values?.target?.value)
            }}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Select
            options={vietnamCityOps}
            className="w-full"
            placeholder="Tất cả khu vực"
            allowClear
            onChange={(value: any) => {
              setPage(initPage)
              setWorkingAreaIdSearch(value)
            }}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <DebounceSelect
            optionQuery={useGetVehicleCategoryOpsQuery}
            convertQueryString={searchString =>
              searchString
                ? '?search=' +
                  encodeURIComponent(`name:ilike:%${searchString}%`)
                : ''
            }
            onChange={(value: any) => {
              setPage(initPage)
              setVehicleCategoryIdSearch(value)
            }}
            placeholder="Chọn loại xe"
            className="w-full"
            allowClear
          />
        </Col>
      </Row>
      <TableResponsive
        columns={columns}
        dataSource={dataVehicleGroup?.data}
        loading={loading}
        totalData={dataVehicleGroup?.total}
        handleChangePage={handleChangePage}
        columnsMobile={columnsMobile}
        currentPage={page}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setIsConfirmModal({ ...isConfirmModal, isOpen: isOpen })
        }
        isModalOpen={isConfirmModal.isOpen}
        onSubmit={() => handleDeleteVehicleGroup(isConfirmModal.id)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá đội xe"
        message="Bạn có chắc chắn muốn xoá đội xe hiện tại?"
        isDeleting={isDeleting}
      />
    </>
  )
}

export default TeamList

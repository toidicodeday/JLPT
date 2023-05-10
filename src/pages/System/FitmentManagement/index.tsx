import { Col, Input, Menu, Row, Select, Space, Typography } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Tooltip, Button } from 'antd'
import {
  FileExcelOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ModalAdd from './component/ModalAdd'
import ModalEdit from './component/ModalEdit'
import {
  useDeleteFitmentItemMutation,
  useGetFitmentGroupAdminOpsQuery,
  useGetFitmentItemQuery,
  useGetOneFitmentGroupQuery,
  useUploadFitmentItemExcelMutation,
} from '@/services/fitmentApi'
import { debounce } from 'lodash'
import TableResponsive from '@/components/Table'
import { numberWithComma } from '@/utils/helpers/convert.helper'
import { saveAs } from 'file-saver'
import fileEx from '@/assets/file/thanh_hung_import_fitment.xlsx'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import ConfirmModal from '@/components/modals/ConfirmModal'
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
const FitmentManagement = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.fitment,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.fitment,
        'delete',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.fitment,
        'edit',
      ),
    }
  }, [adminInfo])

  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [isOpenModalEdit, setIsOpenMadalEdit] = useState<{
    isOpen: boolean
    id: number
  }>({
    isOpen: false,
    id: 0,
  })
  const [isOpenModalDel, setIsOpenModalDel] = useState<{
    isOpen: boolean
    id: number
  }>({
    isOpen: false,
    id: 0,
  })

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [nameSearch, setNameSearch] = useState('')
  const [fitmentGroupSelected, setFitmentGroupSelected] = useState('')
  const { data: fitmentGroupOps } = useGetFitmentGroupAdminOpsQuery({
    query: '',
  })

  useEffect(() => {
    if (fitmentGroupOps) {
      setFitmentGroupSelected(fitmentGroupOps[0]?.key?.toString() || '')
    }
  }, [fitmentGroupOps])

  const query = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''

    if (fitmentGroupSelected)
      queryEncode += `fitmentGroupId:=:${fitmentGroupSelected};`
    if (nameSearch) queryEncode += `name:ilike:%${nameSearch}%;`

    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [fitmentGroupSelected, nameSearch, page, rowsPerPage])

  const {
    data: fitementItem,
    isLoading,
    isFetching,
  } = useGetFitmentItemQuery(
    {
      query: query,
    },
    { skip: !fitmentGroupSelected },
  )

  const { data: detailFitmentGr } = useGetOneFitmentGroupQuery(
    {
      id: Number(fitmentGroupSelected),
    },
    { skip: !fitmentGroupSelected },
  )
  const [uploadFileExcel] = useUploadFitmentItemExcelMutation()
  const [deleteFitmentItem] = useDeleteFitmentItemMutation()

  const actionColumn = (record: any) => {
    return (
      <Space>
        {authorizeStatus.canEdit && (
          <Tooltip title="Chỉnh sửa" placement="topRight">
            <Button
              type="text"
              icon={<FaEdit className="text-[#116476]" />}
              onClick={() => {
                setIsOpenMadalEdit({ isOpen: true, id: record?.id })
              }}
            />
          </Tooltip>
        )}
        {authorizeStatus.canDelete && (
          <Tooltip title="Xóa đồ đạc" placement="topRight">
            <Button
              type="text"
              icon={<RiDeleteBin6Line className="text-grayBorder" />}
              onClick={() => {
                setIsOpenModalDel({ isOpen: true, id: record?.id })
              }}
            />
          </Tooltip>
        )}
      </Space>
    )
  }
  const columnsMobile = [
    {
      key: 'id',
      render: (record: any) => {
        return (
          <>
            <p>Tên: {record?.name}</p>
            <p>Đơn vị tính: {record?.calculation_unit}</p>
            <p>Kích thước: {record?.size}</p>
            <p>Đơn giá: {numberWithComma(Number(record?.cost))}</p>
          </>
        )
      },
    },
    {
      key: 'action',
      title: 'Thao tác',
      width: 100,
      render: (record: any) => actionColumn(record),
    },
  ]
  const goodsListColumn = [
    {
      key: 'name',
      title: 'Tên tài sản/ công cụ/ dụng cụ/ thiết bị',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: 'Đơn vị tính',
      key: 'calculation_unit',
      dataIndex: 'calculation_unit',
      width: 200,
    },
    {
      title: 'Kích thước',
      key: 'size',
      dataIndex: 'size',
      width: 200,
    },
    {
      title: 'Đơn giá',
      key: 'cost',
      width: 200,
      render: (record: any) => numberWithComma(Number(record?.cost)),
    },
    {
      key: 'action',
      title: `${
        authorizeStatus.canEdit || authorizeStatus.canDelete ? 'Thao tác' : ''
      }`,
      width: 100,
      render: (record: any) => actionColumn(record),
    },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchVehicleString = useCallback(
    debounce(value => setNameSearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  const downloadFileExample = () => {
    saveAs(fileEx, 'Example Fitment')
  }

  const uploadFileFitment = (id: number, event: any) => {
    const file = get(event.target, 'files.[0]')
    uploadFileExcel({ id, file: file }).then(response => {
      if ('error' in response) {
        toast.error('Tải lên danh sách đồ đạc thất bại!')
      } else {
        toast.success('Tải lên danh sách đồ đạc thành công!')
      }
    })
  }

  const removeFitmentItem = async (id: number) => {
    try {
      const deleteResponse = await deleteFitmentItem({ id: id })
      if ('data' in deleteResponse) {
        toast.success('Xóa đồ đạc thành công!')
        if (fitementItem?.data && fitementItem?.data?.length <= 1 && page > 1) {
          setPage(page - 1)
        }
      }
      if ('error' in deleteResponse) toast.error('Xóa đồ đạc thất bại!')
      setIsOpenModalDel({ ...isOpenModalDel, isOpen: false })
    } catch (error) {
      toast.error('Xóa đồ đạc thất bại!')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-6">
        <Typography className="text-lg font-bold">
          QUẢN LÝ LOẠI HÀNG HÓA
        </Typography>
      </div>
      <Row gutter={16}>
        <Col xs={0} sm={0} md={5}>
          <p className="font-base text-black">NHÓM ĐỒ ĐẠC</p>
          <Menu
            items={fitmentGroupOps}
            selectedKeys={fitmentGroupSelected ? [fitmentGroupSelected] : []}
            onClick={(event: any) => {
              setFitmentGroupSelected(event?.key)
              setPage(initPage)
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={19}>
          <div className="flex justify-between flex-col md:flex-row">
            <p className="font-base text-black mb-2">
              DANH SÁCH ĐỒ ĐẠC THUỘC NHÓM
            </p>
            <div className="flex gap-3 flex-wrap">
              <Select
                options={fitmentGroupOps}
                className="w-1/2 block md:hidden"
                value={Number(fitmentGroupSelected)}
                onChange={event => setFitmentGroupSelected(event.toString())}
              />
              <Button
                icon={<FileExcelOutlined className="text-gray-700" />}
                onClick={downloadFileExample}
              >
                Tải file mẫu
              </Button>
              {authorizeStatus.canCreate && (
                <label>
                  <div className="border border-solid border-grayDivider rounded-md h-8 px-2 py-1 flex gap-2 justify-center items-center w-full">
                    <UploadOutlined />
                    Tải lên danh sách
                  </div>
                  <input
                    id="fileSelect"
                    type="file"
                    value=""
                    className="hidden"
                    onChange={(event: any) =>
                      uploadFileFitment(Number(fitmentGroupSelected), event)
                    }
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </label>
              )}
              {authorizeStatus.canCreate && (
                <Button onClick={() => setIsOpenModalAdd(true)} type="primary">
                  Tạo đồ đạc
                </Button>
              )}
            </div>
          </div>
          <Row className="w-full py-3">
            <Col xs={24} sm={24} md={12}>
              <Input
                className="w-full"
                addonBefore={<SearchOutlined />}
                placeholder="Tìm kiếm"
                allowClear
                onChange={event => {
                  setPage(initPage)
                  debouncSearchVehicleString(event.target.value)
                }}
              />
            </Col>
          </Row>
          <TableResponsive
            rowKey="id"
            columns={goodsListColumn}
            dataSource={fitementItem?.data}
            loading={isLoading || isFetching}
            totalData={fitementItem?.total}
            handleChangePage={handleChangePage}
            columnsMobile={columnsMobile}
            currentPage={page}
          />
        </Col>
      </Row>
      <ModalAdd
        isOpenModal={isOpenModalAdd}
        setIsOpenModal={setIsOpenModalAdd}
        fitmentGroupValue={detailFitmentGr?.data?.name}
        fitmentGroupId={Number(fitmentGroupSelected)}
      />
      <ModalEdit
        isOpenModal={isOpenModalEdit?.isOpen}
        setIsOpenModal={setIsOpenMadalEdit}
        fitmentGroupValue={detailFitmentGr?.data?.name}
        fitmentGroupId={Number(fitmentGroupSelected)}
        fitmentItemId={isOpenModalEdit?.id}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setIsOpenModalDel({ ...isOpenModalDel, isOpen: isOpen })
        }
        isModalOpen={isOpenModalDel.isOpen}
        onSubmit={() => removeFitmentItem(isOpenModalDel.id)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá đồ đạc"
        message="Bạn có chắc chắn muốn xoá đồ đạc hiện tại?"
      />
    </>
  )
}
export default FitmentManagement

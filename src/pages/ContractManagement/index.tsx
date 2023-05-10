import ConfirmModal from '@/components/modals/ConfirmModal'
import TableResponsive from '@/components/Table'
import { AdminMeType } from '@/services/accountApi/types'
import {
  useDeleteContractMutation,
  useGetContractQuery,
} from '@/services/contractApi'
import { ContractT } from '@/services/contractApi/types'
import { selectUserMe } from '@/store/authSlice/selector'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { Button, Col, Input, Row, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { debounce } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const ContractManagement = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.contract,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.contract,
        'delete',
      ),
    }
  }, [adminInfo])

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [idContract, setIdContract] = useState<number>()
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [nameSearch, setNameSearch] = useState<string>('')

  const query = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''
    if (nameSearch) queryEncode += `name:ilike:%${nameSearch}%`
    return query + encodeURIComponent(queryEncode)
  }, [nameSearch, page, rowsPerPage])

  const { data: listContract, isFetching } = useGetContractQuery({
    query: query,
  })

  const [deleteContract] = useDeleteContractMutation()

  const handleDeleteContract = async (id: number) => {
    try {
      const deleteResponse = await deleteContract({ id })
      if ('data' in deleteResponse)
        toast.success('Xóa loại hợp đồng thành công!')
      if ('error' in deleteResponse)
        toast.success('Xóa loại hợp đồng thất bại!')
      setIsOpenConfirmModal(false)
    } catch (error) {
      toast.success('Xóa loại hợp đồng thất bại!')
    }
  }

  const actionColumns = (record: any) => {
    return (
      <>
        <Tooltip title="Xem và chỉnh sửa hợp đồng" placement="topRight">
          <Link to={`/quan-ly-he-thong/hop-dong/chi-tiet?id=${record.id}`}>
            <Button
              type="text"
              icon={<AiFillEdit className="text-lg text-navyButton" />}
            />
          </Link>
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá hợp đồng" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-lg" />}
              onClick={() => {
                setIdContract(record?.id)
                setIsOpenConfirmModal(true)
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }
  const columnsMobile: ColumnsType<ContractT> = [
    {
      key: 'id',
      render: (record: any) => {
        return (
          <>
            <p className="font-bold">Loại hợp đồng: {record?.name}</p>
            <p>Giá trị thời hạn: {record?.termValue} tháng</p>
          </>
        )
      },
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => actionColumns(record),
    },
  ]

  const columns: ColumnsType<ContractT> = [
    {
      title: 'Loại hợp đồng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá trị thời hạn',
      key: 'termValue',
      render: (record: any) => `${record.termValue} tháng`,
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => actionColumns(record),
    },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchString = useCallback(
    debounce(value => setNameSearch(value), DEBOUNCE_TIME),
    [],
  )
  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-5">
        <Typography className="text-lg font-bold">
          QUẢN LÝ LOẠI HỢP ĐỒNG
        </Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới" placement="topRight">
              <Link to="/quan-ly-he-thong/hop-dong/them-moi">
                <Button
                  type="text"
                  icon={<MdAddCircle className="text-2xl text-primary" />}
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="my-4 border border-solid border-grayBorder py-4 px-2">
        <Row gutter={16}>
          <Col className="rounded mr-2.5" lg={5} md={8} sm={24} xs={24}>
            <Input
              allowClear
              placeholder="Tìm kiếm"
              onChange={event => {
                setPage(initPage)
                debouncSearchString(event.target.value)
              }}
            />
          </Col>
        </Row>
      </div>
      <TableResponsive
        columns={columns}
        dataSource={listContract?.data}
        rowKey="id"
        loading={isFetching}
        columnsMobile={columnsMobile}
        handleChangePage={handleChangePage}
        totalData={listContract?.total}
        currentPage={page}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) => setIsOpenConfirmModal(isOpen)}
        isModalOpen={isOpenConfirmModal}
        onSubmit={() => idContract && handleDeleteContract(idContract)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá loại hợp đồng"
        message="Bạn có chắc chắn muốn xoá loại hợp đồng hiện tại?"
      />
    </>
  )
}

export default ContractManagement

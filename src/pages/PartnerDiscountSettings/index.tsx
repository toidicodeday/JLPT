import React, { useMemo, useState } from 'react'
import {
  Button,
  Col,
  Empty,
  Pagination,
  Row,
  Spin,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import { CloseCircleOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { toast } from 'react-toastify'
import StatusUI from './StatusUI'
import {
  useGetDiscountQuery,
  useUpdateStatusDiscountMutation,
} from '@/services/discountApi'
import { formatDate } from '@/utils/helpers/convert.helper'
import { STATUS_DISCOUNT, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'

const initPage = 1
const initPageSize = 5

const PartnerDiscountSettings = () => {
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [isConfirmModalStatus, setIsConfirmModalStatus] = useState<{
    isOpen: boolean
    status: string
    id: number
  }>({
    isOpen: false,
    status: '',
    id: 0,
  })

  const [selectedProgDiscount, setSelectedProgDiscount] = useState<number>(0)

  const { data: listDiscount, isLoading } = useGetDiscountQuery({
    query: `?page=${page}&limit=${rowsPerPage}&order=createdAt:desc`,
  })

  const [updateStatus] = useUpdateStatusDiscountMutation()

  const cancelDiscount = async (id: number) => {
    const body = {
      discountStatus: 'C', // change into cancel
    }
    updateStatus({ id, body }).then(response => {
      if ('data' in response) {
        toast.success('Chỉnh sửa thành công!')
        setIsOpenConfirmModal(false)
      } else if ('error' in response) {
        toast.error('Chỉnh sửa thất bại!')
      }
    })
  }
  const handleChangePage = (pageNumber: number, pageSize: number) => {
    setPage(pageNumber)
    setRowsPerPage(pageSize)
  }

  const handleChangeStatusDiscount = (id: number, statusDiscount: string) => {
    let statusValue = ''
    if (statusDiscount === STATUS_DISCOUNT.PENDING) statusValue = 'A' // pending -> active
    if (statusDiscount === STATUS_DISCOUNT.ACTIVE) statusValue = 'P' // active => pending
    const body = {
      discountStatus: statusValue,
    }
    updateStatus({ id, body }).then(response => {
      if ('data' in response) {
        toast.success('Chỉnh sửa thành công!')
        setIsConfirmModalStatus({ ...isConfirmModalStatus, isOpen: false })
      } else if ('error' in response) {
        toast.error('Chỉnh sửa thất bại!')
      }
    })
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.partnerDiscount,
        'create',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.partnerDiscount,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.partnerDiscount,
        'delete',
      ),
    }
  }, [adminInfo])
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-5">
        <Typography className="text-lg font-bold">
          CÀI ĐẶT CHIẾT KHẤU ĐỐI TÁC
        </Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới tài khoản" placement="topRight">
              <Link to="/quan-ly-he-thong/chiet-khau-doi-tac/them-moi">
                <Button
                  type="text"
                  icon={<MdAddCircle className="text-2xl text-primary" />}
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <Spin spinning={isLoading}>
        {listDiscount?.data?.map(item => (
          <Row
            gutter={16}
            className="border border-solid border-grayBorder rounded-lg mb-5"
            key={item.id}
          >
            <Col
              xs={24}
              sm={24}
              md={4}
              className="flex justify-center items-center text-center text-base font-bold mt-2"
            >
              {item?.workingArea ? item?.workingArea?.name : 'Tất cả khu vực'}
            </Col>
            <Col
              xs={0}
              sm={0}
              md={1}
              className="border-r border-l-0 border-y-0 border-solid border-grayBorder rounded-lg text-black text-base font-bold"
            ></Col>
            <Col xs={24} sm={24} md={8}>
              <div className="p-5 pb-0 text-black">
                <p className="text-base font-bold my-0">{item?.name}</p>
                <p className="text-[#585858]">
                  {' '}
                  {`Tạo bởi ${item?.createdAccount?.name} lúc 
              ${formatDate(item?.createdAt, 'hh:mm aaa dd/MM/yyyy')} `}
                </p>
                <p className="text-sm mb-2 mt-5">
                  Áp dụng từ ngày: {formatDate(item.applyFrom)} -{' '}
                  {formatDate(item.applyTo)}
                </p>
                <p className="text-sm mb-1">
                  Đối tượng áp dụng:{' '}
                  {item.contract ? item.contract?.name : 'Tất cả đối tượng'}
                </p>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              className="flex pl-5 py-5 items-center md:justify-center "
            >
              <StatusUI status={item.discountStatus} />
            </Col>
            <Col
              xs={12}
              sm={12}
              md={3}
              className="flex justify-end items-center gap-3"
            >
              <>
                {(item.discountStatus === STATUS_DISCOUNT.NEW ||
                  item.discountStatus === STATUS_DISCOUNT.ACTIVE ||
                  item.discountStatus === STATUS_DISCOUNT.PENDING) &&
                  authorizeStatus.canEdit && (
                    <Tooltip
                      title="Hủy chương trình triết khấu"
                      placement="topRight"
                    >
                      <Button
                        type="text"
                        icon={<CloseCircleOutlined className="text-lg" />}
                        onClick={() => {
                          setSelectedProgDiscount(item.id)
                          setIsOpenConfirmModal(true)
                        }}
                      />
                    </Tooltip>
                  )}
                {(item.discountStatus === STATUS_DISCOUNT.ACTIVE ||
                  item.discountStatus === STATUS_DISCOUNT.PENDING) &&
                  authorizeStatus.canEdit && (
                    <Tooltip
                      title="Tạm dừng chương trình chiết khấu"
                      placement="topRight"
                    >
                      <Switch
                        checked={item.discountStatus === STATUS_DISCOUNT.ACTIVE}
                        onClick={() => {
                          setIsConfirmModalStatus({
                            isOpen: true,
                            id: item?.id,
                            status: item.discountStatus,
                          })
                        }}
                      />
                    </Tooltip>
                  )}
                {(item.discountStatus === STATUS_DISCOUNT.NEW ||
                  item.discountStatus === STATUS_DISCOUNT.ACTIVE ||
                  item.discountStatus === STATUS_DISCOUNT.PENDING) && (
                  <Tooltip
                    title="Xem và chỉnh sửa chương trình chiết khấu"
                    placement="topRight"
                  >
                    <Link
                      to={`/quan-ly-he-thong/chiet-khau-doi-tac/chi-tiet?id=${item.id}`}
                    >
                      <Button
                        type="text"
                        icon={
                          <AiFillEdit className="text-lg text-navyButton" />
                        }
                      />
                    </Link>
                  </Tooltip>
                )}
              </>
              {(item?.discountStatus === STATUS_DISCOUNT.CANCEL ||
                item?.discountStatus === STATUS_DISCOUNT.EXPIRED) && (
                <Tooltip
                  title="Xem chương trình chiết khấu"
                  placement="topRight"
                >
                  <Link
                    to={`/quan-ly-he-thong/chiet-khau-doi-tac/chi-tiet?id=${item.id}`}
                  >
                    <Button
                      type="text"
                      icon={<EyeOutlined className="text-lg text-navyButton" />}
                    />
                  </Link>
                </Tooltip>
              )}
            </Col>
          </Row>
        ))}
        {listDiscount && listDiscount?.total > 0 ? (
          <div className="flex justify-end">
            <Pagination
              total={listDiscount?.total}
              current={page}
              pageSize={rowsPerPage}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              defaultPageSize={rowsPerPage}
              showSizeChanger={true}
              onChange={handleChangePage}
              className="pb-3"
            />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
      {/* modal cancel */}
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) => setIsOpenConfirmModal(isOpen)}
        isModalOpen={isOpenConfirmModal}
        onSubmit={() => cancelDiscount(selectedProgDiscount)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận hủy chương trình chiết khấu"
        message="Bạn chắc chắn hủy chương trình chiết khấu này không? Dữ liệu sau khi hủy sẽ không khôi phục lại được."
      />
      {/* modal change status active -> pending and pending -> active */}
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setIsConfirmModalStatus({ ...isConfirmModalStatus, isOpen: isOpen })
        }
        isModalOpen={isConfirmModalStatus.isOpen}
        onSubmit={() =>
          handleChangeStatusDiscount(
            isConfirmModalStatus.id,
            isConfirmModalStatus?.status,
          )
        }
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle={
          isConfirmModalStatus?.status === STATUS_DISCOUNT.PENDING
            ? 'Xác nhận mở lại chương trình chiết khấu'
            : 'Xác nhận tạm dừng chương trình chiết khấu'
        }
        message={
          isConfirmModalStatus?.status === STATUS_DISCOUNT.PENDING
            ? 'Bạn chắc chắn mở lại chương trình chiết khấu này không?'
            : 'Bạn chắc chắn tạm dừng chương trình chiết khấu này không? Chương trình không áp dụng cho đến khi mở lại.'
        }
      />
    </>
  )
}
export default PartnerDiscountSettings

import ConfirmModal from '@/components/modals/ConfirmModal'
import TableResponsive from '@/components/Table'
import { AdminMeType } from '@/services/accountApi/types'
import {
  useDeleteAdvertismentMutation,
  useGetAdvertisementQuery,
  useUpdateAdvertismentMutation,
} from '@/services/advertismentApi'
import { AdvertisementType } from '@/services/advertismentApi/type'
import { selectUserMe } from '@/store/authSlice/selector'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { formatDate } from '@/utils/helpers/convert.helper'
import { GlobalOutlined, LockOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Image,
  Input,
  Row,
  Tooltip,
  Typography,
  Checkbox,
  message,
  Spin,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { isBefore, startOfDay } from 'date-fns'
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

const AdvertismentManagement = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.advertisement,
        'create',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.advertisement,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.advertisement,
        'delete',
      ),
    }
  }, [adminInfo])

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [idSelected, setIdSelected] = useState<number>()
  const [nameSearch, setNameSearch] = useState<string>()
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [idUpdateDisplay, setIdUpdateDisplay] = useState<number>()

  const query = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''
    if (nameSearch) queryEncode += `name:ilike:%${nameSearch}%`
    return query + encodeURIComponent(queryEncode)
  }, [nameSearch, page, rowsPerPage])

  const { data: listAdvertisment, isLoading } = useGetAdvertisementQuery({
    query: query,
  })

  const [updateAds] = useUpdateAdvertismentMutation()

  const [deleteAdvertisment] = useDeleteAdvertismentMutation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchString = useCallback(
    debounce(value => setNameSearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }
  const onChangeDisplayAdvertisement = useCallback(
    (checked: boolean, record: any) => {
      setIdUpdateDisplay(record.id)
      updateAds({
        id: record.id,
        body: {
          ...record,
          displayWhenOpenApp: checked,
        },
      })
        .then(response => {
          if ('data' in response) message.success('Cập nhật thành công')
          if ('error' in response) message.error('Cập nhật không thành công')
        })
        .finally(() => setIdUpdateDisplay(undefined))
    },
    [updateAds],
  )
  const actionColumns = (record: any) => {
    return (
      <div className="flex justify-center items-center flex-col md:flex-row">
        <Tooltip
          title={
            record?.displayInApp
              ? 'Sẽ hiển thị trên ứng dụng'
              : 'Không hiển thị trên ứng dụng'
          }
          placement="topRight"
          className="text-lg"
        >
          {record?.displayInApp ? (
            <GlobalOutlined className="text-lg w-8" />
          ) : (
            <LockOutlined className="text-lg  w-8" />
          )}
        </Tooltip>
        <Tooltip title="Xem và chỉnh sửa quảng cáo" placement="topRight">
          <Link to={`/quan-ly-dich-vu/quang-cao/chi-tiet?id=${record.id}`}>
            <Button
              type="text"
              icon={<AiFillEdit className="text-lg text-navyButton" />}
            />
          </Link>
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá quảng cáo" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-lg" />}
              onClick={() => {
                setIdSelected(record?.id)
                setIsOpenConfirmModal(true)
              }}
            />
          </Tooltip>
        )}
      </div>
    )
  }
  const columns: ColumnsType<AdvertisementType> = [
    {
      title: 'Chương trình quảng cáo',
      key: 'id',
      dataIndex: 'name',
      render: (value, record) => {
        return (
          <>
            <Image src={record?.imageDisplay} width={128} />
            <p className="font-bold mt-2">{value}</p>
          </>
        )
      },
    },
    {
      title: 'Thời gian hiển thị',
      key: 'date',
      render: (values, record) => (
        <p>
          {formatDate(record.startTime, 'dd/MM/yyyy')} -{' '}
          {formatDate(record.endTime, 'dd/MM/yyyy')}
        </p>
      ),
    },
    {
      title: 'Hiển thị khi mở app',
      key: 'statusOpen',
      dataIndex: 'displayWhenOpenApp',
      align: 'center',
      render: (v, record: any) =>
        idUpdateDisplay === record.id ? (
          <Spin spinning />
        ) : !isBefore(
            startOfDay(new Date(record.endTime)),
            startOfDay(new Date()),
          ) ? (
          <Checkbox
            checked={v}
            disabled={
              idUpdateDisplay !== undefined ||
              !authorizeStatus.canEdit ||
              isBefore(
                startOfDay(new Date(record.endTime)),
                startOfDay(new Date()),
              )
            }
            onChange={e =>
              onChangeDisplayAdvertisement(e.target.checked, record)
            }
          />
        ) : (
          'Quảng cáo hết hạn'
        ),
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => actionColumns(record),
    },
  ]

  const columnsMobile: ColumnsType<AdvertisementType> = [
    {
      key: 'id',
      dataIndex: 'name',
      render: (value, record) => {
        return (
          <>
            <Image src={record.imageDisplay} width={128} />
            <p className="font-bold mt-2">Chúc mừng năm mới Quý mão</p>
            <p>
              Thời gian: {formatDate(record.startTime, 'dd/MM/yyyy')} -
              {formatDate(record.endTime, 'dd/MM/yyyy')}
            </p>
            <p>
              Hiển thị khi mở áp:
              <Checkbox checked={record.displayWhenOpenApp} className="ml-3" />
            </p>
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

  const removeAdvertisement = async (id: number) => {
    try {
      const response = await deleteAdvertisment({ id: id })
      if ('data' in response) toast.success('Xóa quảng cáo thành công!')
      if ('error' in response) toast.error('Xóa quảng cáo thất bại!')
      setIsOpenConfirmModal(false)
    } catch (error) {
      toast.success('Xóa quảng cáo thất bại!')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-5">
        <Typography className="text-lg font-bold">QUẢNG CÁO</Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới" placement="topRight">
              <Link to="/quan-ly-dich-vu/quang-cao/them-moi">
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
        gutter={24}
        className="border border-solid border-grayBorder py-4 px-2"
      >
        <Col className="rounded mb-2" span={24} lg={{ span: 8 }}>
          <Input
            allowClear
            placeholder="Tìm kiếm"
            onChange={event => {
              setPage(initPage)
              debounceSearchString(event.target.value)
            }}
          />
        </Col>
      </Row>
      <TableResponsive
        columns={columns}
        dataSource={listAdvertisment?.data}
        rowKey="id"
        loading={isLoading}
        columnsMobile={columnsMobile}
        handleChangePage={handleChangePage}
        totalData={10}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) => setIsOpenConfirmModal(isOpen)}
        isModalOpen={isOpenConfirmModal}
        onSubmit={() => idSelected && removeAdvertisement(Number(idSelected))}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá quảng cáo"
        message="Bạn có chắc chắn muốn xoá quảng cáo hiện tại?"
      />
    </div>
  )
}

export default AdvertismentManagement

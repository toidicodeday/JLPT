import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon, {
  GlobalOutlined,
  LockOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Col, Input, Row, Select, Tooltip, Typography } from 'antd'
import { MdAddCircle, MdAutorenew, MdNewReleases } from 'react-icons/md'
import DatePicker from '@/components/inputs/DatePicker'
import { ColumnsType } from 'antd/lib/table'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'
import ConfirmModal from '@/components/modals/ConfirmModal'
import {
  useDeletePromotionMutation,
  useGetPromoListQuery,
} from '@/services/feeApi/fee'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { debounce } from 'lodash'
import { formatDate, numberWithComma } from '@/utils/helpers/convert.helper'
import { PromoType } from '@/services/feeApi/types'
import { querySearch } from '@/utils/helpers/search.helper'
import TableResponsive from '@/components/Table'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const { RangePicker } = DatePicker

const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const listFilterTabs = [
  {
    active: 'PUBLISH',
    icon: MdAutorenew,
    label: 'Chương trình đang chạy',
  },
  {
    active: 'NOTYET',
    icon: MdNewReleases,
    label: 'Chương trình chưa diễn ra',
  },
  {
    active: 'STOP',
    icon: StopOutlined,
    label: 'Chương trình đã kết thúc',
  },
]

const PromotionManagement = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.promotion,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.promotion,
        'delete',
      ),
    }
  }, [adminInfo])

  const [activeStatus, setActiveStatus] = useState('PUBLISH')
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [idSelectedProgPromotion, setIdSelectedProgPromotion] =
    useState<number>(0)

  const [workingAreaIdSearch, setWorkingAreaIdSearch] = useState<number>()
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [nameSearch, setNameSearch] = useState<string>('')
  const [dateStart, setDateStart] = useState<string>()
  const [dateEnd, setDateEnd] = useState<string>()

  const genFilterTabSearch = useCallback(() => {
    const today = formatDate(Date(), 'yyyy-MM-dd')
    if (activeStatus === 'PUBLISH') {
      return querySearch.or([
        querySearch.and([`applyFrom:<=:${today}`, `applyTo:>=:${today}`]),
        querySearch.and([`applyFrom:=:null`, `applyTo:=:null`]),
      ])
    }
    if (activeStatus === 'NOTYET') {
      return `applyFrom:>:${today}`
    }
    if (activeStatus === 'STOP') {
      return `applyTo:<:${today}`
    }
  }, [activeStatus])

  const query = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    const tabSearch = genFilterTabSearch()
    let dateRange = ''
    if (dateStart && dateEnd) {
      dateRange = querySearch.rangePicker(
        ['applyFrom', 'applyTo'],
        [dateStart, dateEnd],
      )
    }
    let queryWorkingArea = ''
    if (workingAreaIdSearch) {
      queryWorkingArea = `[workingAreaId:IN:${workingAreaIdSearch},NULL]`
    }
    let queryEncode = ''
    queryEncode += querySearch.and([
      tabSearch,
      querySearch.textInput(['name', 'code'], nameSearch),
      queryWorkingArea,
      dateRange,
    ])

    return query + encodeURIComponent(queryEncode)
  }, [
    page,
    rowsPerPage,
    genFilterTabSearch,
    nameSearch,
    workingAreaIdSearch,
    dateStart,
    dateEnd,
  ])

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: voucherList, isFetching } = useGetPromoListQuery({
    query: query,
  })

  const [deletePromotion] = useDeletePromotionMutation()
  const handleDeleteProgPromotion = async (id: number) => {
    try {
      const response = await deletePromotion({ id: id })
      if ('data' in response)
        toast.success('Xóa chương trình khuyến mãi thành công!')
      if ('error' in response)
        toast.error('Xóa chương trình khuyến mại thất bại!')
      setIsOpenConfirmModal(false)
    } catch (error) {
      toast.success('Xóa chương trình khuyến mại thất bại!')
    }
  }

  const statusColumns = (status: any) => {
    if (status === 'PUBLISH')
      return <div className="text-greenButton font-bold">Đang chạy</div>
    if (status === 'NOTYET')
      return <div className="text-blueColor font-bold">Chưa diễn ra</div>
    if (status === 'STOP')
      return <div className="text-orangeButton font-bold">Hết hạn</div>
  }

  const actionColumns = (record: any) => {
    return (
      <div className="flex justify-center items-center flex-col md:flex-row">
        <Tooltip title="Trạng thái" placement="topRight" className="text-lg">
          {record?.status === 'PUBLISH' ? <GlobalOutlined /> : <LockOutlined />}
        </Tooltip>
        <Tooltip
          title="Xem và chỉnh sửa chương trình khuyến mãi"
          placement="topRight"
        >
          <Link to={`/quan-ly-dich-vu/khuyen-mai/chi-tiet?id=${record.id}`}>
            <Button
              type="text"
              icon={<AiFillEdit className="text-lg text-navyButton" />}
            />
          </Link>
        </Tooltip>
        {authorizeStatus.canDelete && (
          <Tooltip title="Xoá chương trình khuyến mãi" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-lg" />}
              onClick={() => {
                setIdSelectedProgPromotion(record?.id)
                setIsOpenConfirmModal(true)
              }}
            />
          </Tooltip>
        )}
      </div>
    )
  }

  const columnsMobile: ColumnsType<PromoType> = [
    {
      key: 'id',
      render: (value: any, record: any) => {
        return (
          <>
            <div>
              <span className="text-primary text-base">{record?.code}</span> -{' '}
              <span className="font-bold">{record?.name}</span>
            </div>
            <p>
              {`Giảm ${numberWithComma(record?.discount)} ${
                record?.discountType === 'VND' ? 'VND' : '%'
              }. Tối đa ${numberWithComma(record?.maxDiscount)} VND`}
            </p>
            {!record.applyFrom && !record?.applyTo && (
              <p>Áp dụng: Vô thời hạn</p>
            )}
            {record.applyFrom && record?.applyTo && (
              <p>
                Áp dụng: {formatDate(record?.applyFrom)} -{' '}
                {formatDate(record?.applyTo)}
              </p>
            )}
            {statusColumns(activeStatus)}
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

  const columns: ColumnsType<PromoType> = [
    {
      title: 'Mã chương trình',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tiêu đề chương trình',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (value: any, record: any) =>
        `${numberWithComma(value)} ${
          record?.discountType === 'VND' ? 'VND' : '%'
        }`,
    },
    {
      title: 'Tối đa',
      dataIndex: 'maxDiscount',
      key: 'maxDiscount',
      render: v => numberWithComma(v),
    },
    {
      title: 'Thời gian áp dụng',
      key: 'date',
      render: (record: any) => {
        if (!record.applyFrom && !record?.applyTo) return <p>Vô thời hạn</p>
        else
          return (
            <p>
              {formatDate(record?.applyFrom)} - {formatDate(record?.applyTo)}
            </p>
          )
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: any) => statusColumns(activeStatus),
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
          CHƯƠNG TRÌNH KHUYẾN MẠI
        </Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới" placement="topRight">
              <Link to="/quan-ly-dich-vu/khuyen-mai/them-moi">
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
            placeholder="Tìm kiếm tên chương trình"
            onChange={event => {
              setPage(initPage)
              debouncSearchString(event.target.value)
            }}
          />
        </Col>
        <Col span={24} lg={{ span: 8 }} className="mb-2">
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
        <Col span={24} lg={{ span: 8 }}>
          <RangePicker
            className="w-full"
            format="yyyy-MM-dd"
            onChange={(value: any) => {
              if (value) {
                setDateStart(formatDate(value[0], 'yyyy-MM-dd'))
                setDateEnd(formatDate(value[1], 'yyyy-MM-dd'))
              } else {
                setDateStart('')
                setDateEnd('')
              }
              setPage(initPage)
            }}
          />
        </Col>
      </Row>
      <div className="my-4 flex w-full overflow-auto">
        {listFilterTabs?.map((item: any, index: any) => {
          return (
            <Button
              key={index}
              className={`${
                item?.active === activeStatus
                  ? 'bg-primary text-white'
                  : 'bg-grayButton text-black'
              } rounded-none border-none `}
              type="primary"
              onClick={() => {
                setPage(initPage)
                setActiveStatus(item.active)
              }}
            >
              <Icon component={item?.icon} />
              {item?.label}
            </Button>
          )
        })}
      </div>
      <TableResponsive
        columns={columns}
        dataSource={voucherList?.data}
        rowKey="id"
        loading={isFetching}
        columnsMobile={columnsMobile}
        handleChangePage={handleChangePage}
        totalData={voucherList?.total}
        currentPage={page}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) => setIsOpenConfirmModal(isOpen)}
        isModalOpen={isOpenConfirmModal}
        onSubmit={() => handleDeleteProgPromotion(idSelectedProgPromotion)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá chương trình khuyến mãi"
        message="Bạn có chắc chắn muốn xoá chương trình khuyến mãi hiện tại?"
      />
    </>
  )
}

export default PromotionManagement

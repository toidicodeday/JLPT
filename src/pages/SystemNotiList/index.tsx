import { HouseIcon, NotifyIcon, TruckIcon } from '@/assets/img'
import TableResponsive from '@/components/Table'
import {
  useGetAccountNotifyQuery,
  useUpdateStatusSeenAllNotifyMutation,
  useUpdateStatusSeenNotifyMutation,
} from '@/services/notificationApi'
import { ContentNotiType } from '@/services/notificationApi/types'
import {
  CN_ORDER_STATUS,
  STATUS_ORDER,
  STATUS_READ_MESSAGE,
  TYPE_SERVICE_ORDER,
} from '@/utils/constant/constant'
import { formatDate } from '@/utils/helpers/convert.helper'
import {
  Col,
  DatePicker,
  Input,
  message,
  Modal,
  Row,
  Tag,
  Typography,
} from 'antd'
import { debounce } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdWarning, MdCancel } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const STATUS_WARNING_NOT_DRIVER = 11
const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const { RangePicker } = DatePicker

const SystemNotificationList = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [textSearch, setTextSearch] = useState<string>('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const [updateStatusSeenNotify] = useUpdateStatusSeenNotifyMutation()
  const [updateStatusSeenAllNotify] = useUpdateStatusSeenAllNotifyMutation()

  const searchMessageQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&order=id:desc&search=`
    let queryEncode = ''
    if (textSearch)
      queryEncode += `[title:ilike:%${textSearch}%|content:->>'code' ilike :%${textSearch}%];`
    if (dateStart) queryEncode += `createdAt:>=:${dateStart};`
    if (dateEnd) queryEncode += `createdAt:<=:${dateEnd};`
    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [dateEnd, dateStart, textSearch, page, rowsPerPage])

  const { data: listMessage, isLoading } = useGetAccountNotifyQuery({
    query: searchMessageQuery,
  })

  const columns = [
    {
      key: 'id',
      render: (_: any, row: any) => {
        return {
          props: {
            style: {
              backgroundColor:
                row?.status === STATUS_READ_MESSAGE.NOTREAD
                  ? '#EEF3F4'
                  : '#FAFAFA',
              borderBottom: '1px solid #fff',
            },
          },
          children: (
            <button
              onClick={() => {
                row?.status === STATUS_READ_MESSAGE.NOTREAD
                  ? handleChangeStatusAndPage(row?.id, row?.content, row?.title)
                  : handleChangePage(row?.content, row?.title)
              }}
              className={`text-left border-0 w-full ${
                row?.status === STATUS_READ_MESSAGE.NOTREAD
                  ? 'bg-[#EEF3F4]'
                  : 'bg-[#FAFAFA]'
              }`}
            >
              <div className="flex gap-4 hover:cursor-pointer">
                {renderStatusOrder(
                  row?.content?.orderStatus,
                  row?.content?.serviceType,
                )}
                <div>
                  <p className="font-bold text-black truncate whitespace-pre-wrap">
                    {row?.content?.code && <Tag>{row?.content?.code}</Tag>}
                    {row?.title}
                  </p>
                  <p className="font-sans text-xs text-grayBorder mt-1">
                    {row?.createdAt
                      ? formatDate(row.createdAt, 'dd/MM HH:mm')
                      : ''}
                  </p>
                </div>
              </div>
            </button>
          ),
        }
      },
    },
  ]

  const infoNoti = (content: ContentNotiType, title: string) => {
    Modal.info({
      title: title,
      content: (
        <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
      ),
      onOk() {},
    })
  }

  const handleChangePage = useCallback(
    (content: ContentNotiType, title: string) => {
      if (content?.serviceType === TYPE_SERVICE_ORDER.TAXI_TRUCK) {
        navigate(`/chuyen-hang/taxi-tai/chi-tiet?orderCode=${content?.code}`)
      } else if (content?.serviceType === TYPE_SERVICE_ORDER.MOVING_OFFICE) {
        navigate(`/chuyen-hang/chuyen-nha/chi-tiet?orderCode=${content?.code}`)
      } else if (content.type === 'PRM') {
        navigate(`/quan-ly-dich-vu/khuyen-mai/chi-tiet?id=${content.id}`)
      } else if (content.type === 'NOTIFICATION') {
        infoNoti(content, title)
      } else if (content.driverId && content.vehicleId) {
        navigate(
          `/doi-tac/chi-tiet?driverId=${content.driverId}&vehicleId=${content.vehicleId}`,
        )
      }
    },
    [navigate],
  )

  const handleChangeStatusAndPage = (
    id: number,
    content: ContentNotiType,
    title: string,
  ) => {
    updateStatusSeenNotify({ id: id }).then((response: any) => {
      if ('error' in response) toast.error('Có lỗi xảy ra!')
      else {
        handleChangePage(content, title)
      }
    })
  }

  const renderStatusOrder = (type: number, serviceType: any) => {
    switch (type) {
      case STATUS_ORDER.NEW:
        return (
          <div>
            <img src={TruckIcon} alt="Truck" />
          </div>
        )
      case CN_ORDER_STATUS.WAITING_ACCEPT:
      case CN_ORDER_STATUS.WAITING_QUOTATION:
      case CN_ORDER_STATUS.WAITING_SURVEY:
        return (
          <div>
            <img src={HouseIcon} alt="House" />
          </div>
        )
      case STATUS_WARNING_NOT_DRIVER:
        return <MdWarning className="text-lg text-[#ff9966]" />
      case STATUS_ORDER.COMPLETE:
      case CN_ORDER_STATUS.MOVED:
        return <FaCheckCircle className="text-lg text-[#0fa80f]" />
      case STATUS_ORDER.CANCEL:
        return <MdCancel className="text-lg text-[#ff0000]" />
      default:
        return (
          <div>
            <img src={NotifyIcon} alt="Notify" />
          </div>
        )
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchVehicleGroup = useCallback(
    debounce(value => setTextSearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePageTable = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  const handleChangeStatusSeenAllNotify = () => {
    updateStatusSeenAllNotify({}).then((response: any) => {
      if ('error' in response)
        message.error('Đánh dấu đã đọc tất cả thông báo thất bại!')
      else {
        message.success('Đánh dấu đã đọc tất cả thông báo thành công!')
      }
    })
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">THÔNG BÁO</Typography>
      </div>
      <Row
        gutter={16}
        className="my-4 border border-solid border-grayBorder py-4 px-2"
      >
        <Col className="rounded" xs={24} sm={24} md={18}>
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
        <Col xs={24} sm={24} md={6}>
          <RangePicker
            className="w-full"
            format="YYYY-MM-DD"
            onChange={(value: any) => {
              if (value) {
                setDateStart(formatDate(value[0], 'yyyy-MM-dd'))
                setDateEnd(formatDate(value[1], 'yyyy-MM-dd'))
                setPage(initPage)
              } else {
                setDateStart('')
                setDateEnd('')
                setPage(initPage)
              }
            }}
          />
        </Col>
      </Row>
      <div className="flex justify-end">
        <button
          onClick={() => handleChangeStatusSeenAllNotify()}
          className="border-none bg-white text-blue-500 mb-2"
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>
      <TableResponsive
        columns={columns}
        dataSource={listMessage?.data}
        loading={isLoading}
        totalData={listMessage?.total}
        handleChangePage={handleChangePageTable}
        currentPage={page}
        showHeader={false}
      />
    </>
  )
}

export default SystemNotificationList

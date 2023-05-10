import {
  useGetAccountNotifyQuery,
  useGetCountAccountNotifyNotSeenQuery,
  useUpdateStatusSeenAllNotifyMutation,
  useUpdateStatusSeenNotifyMutation,
} from '@/services/notificationApi'
import {
  CN_ORDER_STATUS,
  STATUS_ORDER,
  STATUS_READ_MESSAGE,
  TYPE_SERVICE_ORDER,
} from '@/utils/constant/constant'
import { formatDate } from '@/utils/helpers/convert.helper'
import { message, Modal, Table, Tag, Typography } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HouseIcon, NotifyIcon, TruckIcon } from '@/assets/img'
import { MdCancel, MdWarning } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { ContentNotiType } from '@/services/notificationApi/types'

interface Props {
  closePopover: () => void
  isOpen?: boolean
}
const STATUS_WARNING_NOT_DRIVER = 11

const NotiModal = ({ closePopover, isOpen }: Props) => {
  const navigate = useNavigate()

  const { data: countMessageNotSeen } = useGetCountAccountNotifyNotSeenQuery({
    query: '',
  })

  const { data: listNotify, refetch: refetchListNotify } =
    useGetAccountNotifyQuery({
      query: '?order=id:desc&page=1&limit=50',
    })

  useEffect(() => {
    if (isOpen) refetchListNotify()
  }, [isOpen, refetchListNotify])

  const [updateStatusSeenNotify] = useUpdateStatusSeenNotifyMutation()
  const [updateStatusSeenAllNotify] = useUpdateStatusSeenAllNotifyMutation()

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
                      ? formatDate(row.createdAt, 'dd/MM hh:mm')
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
        closePopover()
      } else if (content?.serviceType === TYPE_SERVICE_ORDER.MOVING_OFFICE) {
        navigate(`/chuyen-hang/chuyen-nha/chi-tiet?orderCode=${content?.code}`)
        closePopover()
      } else if (content.type === 'PRM') {
        navigate(`/quan-ly-dich-vu/khuyen-mai/chi-tiet?id=${content.id}`)
        closePopover()
      } else if (content.type === 'NOTIFICATION') {
        closePopover()
        infoNoti(content, title)
      } else if (content.driverId && content.vehicleId) {
        closePopover()
        navigate(
          `/doi-tac/chi-tiet?driverId=${content.driverId}&vehicleId=${content.vehicleId}`,
        )
      }
    },
    [closePopover, navigate],
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

  const handleChangeStatusSeenAllNotify = () => {
    updateStatusSeenAllNotify({}).then((response: any) => {
      if ('error' in response)
        message.error('Đánh dấu đã đọc tất cả thông báo thất bại!')
      else {
        message.success('Đánh dấu đã đọc tất cả thông báo thành công!')
        closePopover()
      }
    })
  }

  return (
    <div className="sm:w-[20rem] md:w-[30rem] sm:h-[40rem] md:h-[50rem] overflow-auto">
      <div className="flex justify-between">
        <Typography className="pb-3 text-black font-bold">
          Bạn có {countMessageNotSeen?.data?.count} thông báo mới
        </Typography>
        <button
          onClick={() => handleChangeStatusSeenAllNotify()}
          className="border-none bg-white text-blue-500"
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>
      <Table
        dataSource={listNotify?.data}
        columns={columns}
        showHeader={false}
        pagination={false}
      />
      <div className="pt-3 text-center">
        <Link
          to="/thong-bao-he-thong"
          className="hover:underline"
          onClick={() => closePopover()}
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  )
}

export default NotiModal

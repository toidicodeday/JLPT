import AudioPlayer from '@/components/Order/AudioPlayer'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import TableResponsive from '@/components/Table'
import useCreateChat from '@/hooks/useCreateChat'
import { useGetRecordListQuery } from '@/services/audioRecordApi'
import { useGetOrderHistoryQuery } from '@/services/orderApi/order'
import { OrderDetailsType, OrderHistoryType } from '@/services/orderApi/types'
import { STATUS_ORDER } from '@/utils/constant/constant'
import {
  formatDateTimeRequest,
  getHistoryLabel,
} from '@/utils/helpers/convert.helper'
import Icon from '@ant-design/icons'
import { Button, Col, message, Row, Spin, Tag, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { FaFacebookMessenger, FaPhoneAlt } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'

interface Props {
  data?: OrderDetailsType
  isLoadingDetails: boolean
  refetchOrder: () => void
}

const ActivityLogs = ({ data, isLoadingDetails, refetchOrder }: Props) => {
  const { currentUser } = useSbCurrentUser()
  const { openOrderChat } = useCreateChat()
  const [loadPlayer, setLoadPlayer] = React.useState<boolean>(false)
  const {
    data: historyInfo,
    refetch: refetchHistory,
    isFetching: isFetchingHistory,
  } = useGetOrderHistoryQuery(
    {
      query: `?order=updatedAt%3Adesc&search=${encodeURIComponent(
        `orderCode:=:${data?.code};orderStatus:!=:0`,
      )}`,
    },
    { skip: !data?.code },
  )
  const {
    data: locationHistoryInfo,
    refetch: refetchLocationHistory,
    isFetching: isFetchingLocationHistory,
  } = useGetOrderHistoryQuery(
    {
      query: `?order=updatedAt%3Adesc&search=${encodeURIComponent(
        `orderStatus:=:null;orderCode:=:${data?.code}`,
      )}`,
    },
    { skip: !data?.code },
  )
  const {
    data: orderRecordList,
    refetch: refetchRecord,
    isFetching: isFetchingRecord,
  } = useGetRecordListQuery(
    {
      query: `?order=createdAt:desc&search=${encodeURIComponent(
        `orderCode:=:${data?.code}`,
      )}`,
    },
    { skip: !data?.code },
  )

  const activityColumns: ColumnsType<OrderHistoryType> = [
    {
      title: '',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (value, row) => {
        return (
          <Row gutter={16}>
            <Col span={12}>
              <Typography>{getHistoryLabel(value)}</Typography>
            </Col>
            <Col span={12}>
              <Typography>{formatDateTimeRequest(row.updatedAt)}</Typography>
            </Col>
          </Row>
        )
      },
    },
  ]

  const activityColumnsMobile: ColumnsType<OrderHistoryType> = [
    {
      title: '',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (value, row) => {
        return (
          <>
            <div>
              <Tag color="blue">{formatDateTimeRequest(row.updatedAt)}</Tag>
            </div>
            <div className="mt-2">{getHistoryLabel(value)}</div>
          </>
        )
      },
    },
  ]

  const locationColumns: ColumnsType<OrderHistoryType> = [
    {
      title: '',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (_, row) => {
        return (
          <Row gutter={16}>
            <Col span={12}>
              <span>{`Chuyển địa điểm giao hàng từ: `}</span>
              <span className="text-blueColor">{row.content.location.old}</span>
              <span>{` đến: `}</span>
              <span className="text-blueColor">{row.content.location.new}</span>
            </Col>
            <Col span={12}>
              <Typography>{formatDateTimeRequest(row.updatedAt)}</Typography>
            </Col>
          </Row>
        )
      },
    },
  ]

  const locationColumnsMobile: ColumnsType<OrderHistoryType> = [
    {
      title: '',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (_, row) => {
        return (
          <>
            <div>
              <Tag color="blue">{formatDateTimeRequest(row.updatedAt)}</Tag>
            </div>
            <div className="mt-2">
              <span>{`Chuyển địa điểm giao hàng từ: `}</span>
              <span className="text-blueColor">{row.content.location.old}</span>
              <span>{` đến: `}</span>
              <span className="text-blueColor">{row.content.location.new}</span>
            </div>
          </>
        )
      },
    },
  ]

  const openChat = async (order: any) => {
    const channelUrl = order.code
    if (channelUrl) {
      openOrderChat({
        adminSenbirdId: currentUser?.userId || '',
        orderCode: channelUrl,
        isReadOnly: [
          STATUS_ORDER.CANCEL,
          STATUS_ORDER.COMPLETE,
          STATUS_ORDER.FAILURE,
        ].includes(order.status),
      })
    } else {
      message.error('Có lỗi xảy ra')
    }
  }

  return (
    <Spin
      spinning={
        isLoadingDetails ||
        isFetchingHistory ||
        isFetchingRecord ||
        isFetchingLocationHistory
      }
    >
      <div className="flex items-center justify-between">
        <Typography className="font-bold">Lịch sử chuyến hàng</Typography>
        <Tooltip title="Làm mới" placement="topRight">
          <Button
            icon={<MdRefresh className="text-xl" />}
            className="flex items-center justify-center ml-2"
            onClick={() => {
              refetchHistory()
              refetchOrder()
              refetchRecord()
              refetchLocationHistory()
              setLoadPlayer(true)
            }}
            loading={
              isLoadingDetails ||
              isFetchingHistory ||
              isFetchingRecord ||
              isFetchingLocationHistory
            }
          />
        </Tooltip>
      </div>
      <div className="mt-2 p-4 border border-solid border-grayButton rounded-md">
        <TableResponsive
          rowKey="id"
          dataSource={historyInfo || []}
          columns={activityColumns}
          columnsMobile={activityColumnsMobile || activityColumns}
          showHeader={false}
          pagination={false}
        />
      </div>
      {locationHistoryInfo && locationHistoryInfo?.length > 0 && (
        <Typography className="font-bold mt-4">
          Lịch sử thay đổi địa chỉ giao hàng
        </Typography>
      )}
      {locationHistoryInfo && locationHistoryInfo?.length > 0 && (
        <div className="mt-2 p-4 border border-solid border-grayButton rounded-md">
          <TableResponsive
            rowKey="id"
            dataSource={locationHistoryInfo || []}
            columns={locationColumns}
            columnsMobile={locationColumnsMobile || locationColumns}
            showHeader={false}
            pagination={false}
          />
        </div>
      )}
      <Typography className="font-bold mt-4">
        Lịch sử nhắn tin và cuộc gọi
      </Typography>
      <div className="p-4 border border-solid border-grayButton rounded-md mt-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <FaFacebookMessenger className="text-base text-[#59AFFF]" />
            <Typography className="ml-4">
              <span className="font-bold mr-4">Khách hàng và tài xế</span>
            </Typography>
          </div>
          <Button type="text" onClick={() => openChat(data)}>
            <Typography className="text-[#59AFFF]">Xem</Typography>
          </Button>
        </div>
      </div>
      <div className="p-4 border border-solid border-grayButton rounded-md mt-4">
        {orderRecordList &&
        orderRecordList?.data &&
        orderRecordList.data?.length > 0 ? (
          <div>
            {orderRecordList.data.map(item => (
              <div className="flex items-center justify-between">
                <div>
                  <Icon component={FaPhoneAlt} className="text-[#D32F2F]" />
                  <span className="ml-3">
                    {formatDateTimeRequest(item.createdAt)}
                  </span>
                </div>
                <AudioPlayer
                  audioSrc={item.url}
                  isFetchingRecord={isFetchingRecord}
                  loadPlayer={loadPlayer}
                  setLoadPlayer={setLoadPlayer}
                />
              </div>
            ))}
          </div>
        ) : (
          <Typography>Chưa có cuộc gọi nào</Typography>
        )}
      </div>
    </Spin>
  )
}

export default ActivityLogs

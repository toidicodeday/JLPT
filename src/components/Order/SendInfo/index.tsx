import { OrderLocationType } from '@/services/orderApi/types'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { Button, Col, Row, Skeleton } from 'antd'
import { format } from 'date-fns'
import React from 'react'
import SendInfoInputModal from '../SendInfoInputModal'

interface Props {
  initialValues: OrderLocationType | undefined
  initialPickupType: number | null | undefined
  initialPickupDate: string | null | undefined
  orderCode?: string
  orderType: 'cn' | 'tx'
  isLoadingOrderDetails: boolean
}

const SendInfo = (props: Props) => {
  const [openLocationInputModal, setOpenLocationInputModal] =
    React.useState<boolean>(false)

  return (
    <>
      <div className="p-2 border border-solid border-grayButton rounded-md mt-2 bg-[#f5f5f58a]">
        {props?.isLoadingOrderDetails && <Skeleton paragraph={{ rows: 3 }} />}
        {!props?.isLoadingOrderDetails && !props.initialValues && (
          <div className="py-2">
            <div>Chưa có thông tin điểm đến</div>
            <Button
              onClick={() => setOpenLocationInputModal(true)}
              className="mt-2"
            >
              Thêm điểm đến
            </Button>
          </div>
        )}
        {!props?.isLoadingOrderDetails && props.initialValues && (
          <div className="flex items-start p-3 bg-white border border-solid border-grayButton rounded-md">
            <div className="flex-1">
              <Row gutter={[4, 4]}>
                <Col className="gutter-row" span={6}>
                  Điểm nhận hàng
                </Col>
                <Col className="gutter-row" span={18}>
                  {props.initialValues.location}
                </Col>
                <Col className="gutter-row" span={6}>
                  Người liên hệ
                </Col>
                <Col className="gutter-row" span={18}>
                  {props.initialValues.contact
                    ? props.initialValues.contact
                    : 'Chưa có thông tin'}
                </Col>
                <Col className="gutter-row" span={6}>
                  Số điện thoại
                </Col>
                <Col className="gutter-row" span={18}>
                  {props.initialValues.phone
                    ? formatPhone(props?.initialValues?.phone)
                    : 'Chưa có thông tin'}
                </Col>
                <Col className="gutter-row" span={6}>
                  Ghi chú chi tiết địa chỉ
                </Col>
                <Col className="gutter-row" span={18}>
                  {props.initialValues.note
                    ? props.initialValues.note
                    : 'Chưa có thông tin'}
                </Col>
                <Col className="gutter-row" span={6}>
                  Giờ hẹn chuyển hàng
                </Col>
                <Col className="gutter-row" span={18}>
                  {props.initialPickupType === 1 &&
                  props.initialPickupDate &&
                  props.initialPickupDate !== null
                    ? format(
                        new Date(props?.initialPickupDate),
                        'HH:mm dd/MM/yyyy',
                      )
                    : 'Ngay bây giờ'}
                </Col>
              </Row>
            </div>
            <Button onClick={() => setOpenLocationInputModal(true)}>
              Cập nhật
            </Button>
          </div>
        )}
      </div>
      <SendInfoInputModal
        open={openLocationInputModal}
        setOpen={setOpenLocationInputModal}
        title="Thêm thông tin điểm lấy hàng"
        type={0}
        sort={1}
        orderCode={props.orderCode}
        initialValue={props.initialValues}
        initialPickupDate={props.initialPickupDate}
        initialPickupType={props.initialPickupType}
        orderType={props?.orderType}
      />
    </>
  )
}

export default SendInfo

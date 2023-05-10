import { useDeleteOrderLocationMutation } from '@/services/orderApi/order'
import { OrderDetailsType, OrderLocationType } from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { Button, Col, Row, Skeleton } from 'antd'
import { get } from 'lodash'
import React from 'react'
import { toast } from 'react-toastify'
import ReceiveInfoInputModal from '../ReceiveInfoInputModal'

interface Props {
  orderCode?: string
  initialValues: OrderLocationType[] | undefined
  isLoadingOrderDetails: boolean
  orderDetails?: OrderDetailsType
}

const ReceiveInfo = ({
  orderCode,
  initialValues,
  isLoadingOrderDetails,
  orderDetails,
}: Props) => {
  const [openLocationInputModal, setOpenLocationInputModal] =
    React.useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = React.useState<
    OrderLocationType | undefined
  >(undefined)
  const [deleteOrderLocation, { isLoading: isDeleting }] =
    useDeleteOrderLocationMutation()

  const handleDeleteLocation = async (id: number) => {
    try {
      const deleteResponse = await deleteOrderLocation({
        id: id,
      })
      if ('data' in deleteResponse) {
        toast.success(MESSAGES.CALL_API_DELETE_SUCCESS)
      }
      if ('error' in deleteResponse)
        toast.error(
          get(deleteResponse.error, 'data.error.message') ||
            MESSAGES.CALL_API_ERROR,
        )
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <>
      <div className="p-2 border border-solid border-grayButton rounded-md mt-2 bg-[#f5f5f58a]">
        {isLoadingOrderDetails && <Skeleton paragraph={{ rows: 3 }} />}
        {!isLoadingOrderDetails && !initialValues && (
          <div className="py-2">
            <div>Chưa có thông tin điểm đến</div>
          </div>
        )}
        {!isLoadingOrderDetails &&
          initialValues &&
          initialValues?.length > 0 &&
          initialValues.map((item: OrderLocationType, index: number) => (
            <div key={item?.id}>
              <div className="font-bold">
                Thông tin điểm trả hàng số {index + 1}
              </div>
              <div
                className="flex items-start p-3 bg-white border border-solid border-grayButton rounded-md mt-2"
                key={item.id}
              >
                <div className="flex-1">
                  <Row gutter={[4, 4]}>
                    <Col className="gutter-row" span={6}>
                      Điểm trả hàng
                    </Col>
                    <Col className="gutter-row" span={18}>
                      {item.location}
                    </Col>
                    <Col className="gutter-row" span={6}>
                      Người liên hệ
                    </Col>
                    <Col className="gutter-row" span={18}>
                      {item.contact ? item.contact : 'Chưa có thông tin'}
                    </Col>
                    <Col className="gutter-row" span={6}>
                      Số điện thoại
                    </Col>
                    <Col className="gutter-row" span={18}>
                      {item.phone
                        ? formatPhone(item.phone)
                        : 'Chưa có thông tin'}
                    </Col>
                    <Col className="gutter-row" span={6}>
                      Ghi chú chi tiết địa chỉ
                    </Col>
                    <Col className="gutter-row" span={18}>
                      {item.note ? item.note : 'Chưa có thông tin'}
                    </Col>
                  </Row>
                </div>
                <div>
                  <div>
                    <Button
                      onClick={() => {
                        setSelectedLocation(item)
                        setOpenLocationInputModal(true)
                      }}
                      block
                    >
                      Cập nhật
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Button
                      onClick={() => handleDeleteLocation(item.id)}
                      block
                      loading={isDeleting}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <Button
          onClick={() => {
            setSelectedLocation(undefined)
            setOpenLocationInputModal(true)
          }}
          className={`${
            initialValues && initialValues?.length > 0 ? 'mt-2' : ''
          }`}
        >
          Thêm điểm trả hàng
        </Button>
      </div>
      <ReceiveInfoInputModal
        open={openLocationInputModal}
        setOpen={setOpenLocationInputModal}
        title="Thêm thông tin điểm trả hàng"
        type={1}
        sort={
          initialValues && initialValues?.length > 0
            ? initialValues[initialValues?.length - 1]?.sort + 1
            : 2
        }
        orderCode={orderCode}
        initialValue={selectedLocation}
        orderDetails={orderDetails}
      />
    </>
  )
}

export default ReceiveInfo

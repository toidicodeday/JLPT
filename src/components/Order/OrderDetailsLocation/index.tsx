import DatePicker from '@/components/inputs/DatePicker'
import { useUpdateOrderDetailsMutation } from '@/services/orderApi/order'
import { OrderDetailsType, OrderLocationType } from '@/services/orderApi/types'
import {
  ADMIN_ACC_FUNC,
  CN_ORDER_STATUS,
  DRIVER_LOCATION_STATUS,
  PICK_UP_TYPE,
  STATUS_ORDER,
} from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import {
  formatDateTimeRequest,
  formatPhone,
} from '@/utils/helpers/convert.helper'
import { EditOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Modal, Tag, Typography } from 'antd'
import { endOfMinute, isFuture, isPast } from 'date-fns'
import { get, isNumber, isString } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { toast } from 'react-toastify'
import ReceiveInfoInputModal from '../ReceiveInfoInputModal'

interface Props {
  type: 'sender' | 'receiver'
  hasDivider: boolean
  orderCode?: string
  orderDetails?: OrderDetailsType
  editPermission: boolean
  locationDetails?: OrderLocationType
  pickupType?: number | null
  pickupDate?: string | null
  adminSystemRole?: {
    isAdmin: boolean
    functionName:
      | ADMIN_ACC_FUNC.SURVEY_STAFF
      | ADMIN_ACC_FUNC.OPERATING_STAFF
      | ADMIN_ACC_FUNC.LEADER
      | null
  }
}

const OrderDetailsLocation = ({
  type,
  hasDivider,
  orderCode,
  orderDetails,
  editPermission,
  locationDetails,
  pickupType,
  pickupDate,
  adminSystemRole,
}: Props) => {
  const [form] = Form.useForm()
  const [openPickupDate, setOpenPickupDate] = useState<boolean>(false)
  const [openEditLocation, setOpenEditLocation] = useState<boolean>(false)
  const [updateOrderDetails, { isLoading: isUpdating }] =
    useUpdateOrderDetailsMutation()
  const editLocationPermission = useMemo(() => {
    return orderDetails?.service?.type === 'tx'
      ? editPermission &&
          orderDetails?.status !== STATUS_ORDER.COMPLETE &&
          orderDetails?.status !== STATUS_ORDER.FAILURE &&
          orderDetails?.status !== STATUS_ORDER.CANCEL
      : editPermission &&
          orderDetails?.status !== CN_ORDER_STATUS.CANCEL &&
          orderDetails?.status !== CN_ORDER_STATUS.MOVED &&
          orderDetails?.status !== CN_ORDER_STATUS.RATED
  }, [editPermission, orderDetails?.service?.type, orderDetails?.status])
  const editPickupDatePermission = useMemo(() => {
    return orderDetails?.service?.type === 'tx'
      ? editPermission &&
          (orderDetails?.status === STATUS_ORDER.NEW ||
            orderDetails?.status === STATUS_ORDER.RECEIVED ||
            orderDetails?.status === STATUS_ORDER.ARRIVING)
      : editPermission &&
          orderDetails?.status !== CN_ORDER_STATUS.CANCEL &&
          orderDetails?.status !== CN_ORDER_STATUS.MOVED &&
          orderDetails?.status !== CN_ORDER_STATUS.RATED &&
          orderDetails?.status !== CN_ORDER_STATUS.MOVING
  }, [editPermission, orderDetails?.service?.type, orderDetails?.status])
  useEffect(() => {
    if (pickupDate) {
      form.setFieldValue('pickupDate', new Date(pickupDate))
    }
  }, [form, pickupDate])
  const handleUpdatePickupDate = async (values: any) => {
    try {
      const updateRes = await updateOrderDetails({
        id: orderCode,
        body: {
          pickupDate: values.pickupDate,
          pickupType: PICK_UP_TYPE.SCHEDULE,
        },
      })
      if ('data' in updateRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpenPickupDate(false)
      }
      if ('error' in updateRes) {
        toast.error(
          get(updateRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (err) {
      toast.error(get(err, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <MdAccountCircle className="text-xl" />
          <div className="ml-2">
            <div className="flex items-center">
              <Typography className="font-bold mr-2">
                {locationDetails?.contact}
              </Typography>
              <Tag color={`${type === 'sender' ? '#FF6659' : '#59AFFF'}`}>
                {type === 'sender' ? 'Người gửi' : 'Người nhận'}
              </Tag>
            </div>
            <Typography className="mt-1">
              {locationDetails?.phone
                ? formatPhone(locationDetails?.phone)
                : 'Chưa rõ'}
            </Typography>
            <div className="flex items-center">
              <Typography className="mt-1">
                {locationDetails?.location}
              </Typography>
              {type === 'receiver' &&
                editLocationPermission &&
                locationDetails?.status ===
                  DRIVER_LOCATION_STATUS.NOT_ARRIVED_LOCATION_YET &&
                (adminSystemRole?.isAdmin ||
                  adminSystemRole?.functionName ===
                    ADMIN_ACC_FUNC.SURVEY_STAFF ||
                  adminSystemRole?.functionName ||
                  ADMIN_ACC_FUNC.OPERATING_STAFF ||
                  adminSystemRole?.functionName === ADMIN_ACC_FUNC.LEADER) && (
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => setOpenEditLocation(true)}
                  />
                )}
            </div>
            {type === 'sender' && (
              <Typography className="mt-1 italic flex items-center">
                <div>
                  {isNumber(pickupType) && pickupType === PICK_UP_TYPE.NOW
                    ? 'Ngay bây giờ'
                    : 'Thời gian vận chuyển dự kiến:'}
                </div>
                <React.Fragment>
                  {isNumber(pickupType) &&
                    isString(pickupDate) &&
                    pickupType === PICK_UP_TYPE.SCHEDULE && (
                      <div className="ml-2">
                        {formatDateTimeRequest(pickupDate) || 'Không rõ'}
                      </div>
                    )}
                  {editPickupDatePermission && (
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => setOpenPickupDate(true)}
                    />
                  )}
                </React.Fragment>
              </Typography>
            )}
          </div>
        </div>
      </div>
      {hasDivider && <Divider />}
      <Modal
        open={openPickupDate}
        title="Chỉnh sửa thông tin đơn hàng"
        onCancel={() => setOpenPickupDate(false)}
        footer={false}
      >
        <Form layout="vertical" form={form} onFinish={handleUpdatePickupDate}>
          <Form.Item
            label="Thời gian vận chuyển dự kiến"
            name="pickupDate"
            rules={[
              { required: true, message: MESSAGES.REQUIRED_ERROR },
              () => ({
                validator(_, value) {
                  if (isFuture(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Hãy chọn ngày giờ chuyển hàng trong tương lai!'),
                  )
                },
              }),
            ]}
          >
            <DatePicker
              className="w-full"
              format="dd-MM-yyyy HH:mm"
              showTime
              allowClear={false}
              disabledDate={currentDate =>
                isPast(endOfMinute(new Date(currentDate)))
              }
            />
          </Form.Item>
          <Divider />
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>
      <ReceiveInfoInputModal
        open={openEditLocation}
        setOpen={setOpenEditLocation}
        title="Chỉnh sửa điểm trả hàng"
        type={locationDetails?.type || 1}
        sort={locationDetails?.sort}
        orderCode={orderCode}
        initialValue={locationDetails}
        orderDetails={orderDetails}
      />
    </div>
  )
}

export default OrderDetailsLocation

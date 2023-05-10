import { useLazyGetOneCustomerQuery } from '@/services/customerApi'
import {
  useCopyOrderDetailsMutation,
  useLazyGetOrderDetailsQuery,
} from '@/services/orderApi/order'
import { OrderDetailsType, OrderLocationType } from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { Button, Form, Input, Space, Spin, Tag } from 'antd'
import { get, orderBy } from 'lodash'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'

interface PreviousGuestType {
  name?: string
  phone?: string
}
interface Props {
  orderDetails?: OrderDetailsType
  refetchOrderDetails: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AutoFillLocation = ({
  orderDetails,
  refetchOrderDetails,
  setOpen,
}: Props) => {
  const [autoLocationForm] = Form.useForm()
  const [previousOrderDetails, setPreviousOrderDetails] = React.useState<
    OrderDetailsType | undefined
  >(undefined)
  const [previousGuestDetails, setPreviousGuestDetails] = React.useState<
    PreviousGuestType | undefined
  >(undefined)
  const previousOrderCode = Form.useWatch('previousCode', autoLocationForm)
  const [getPreviousDetails, { isLoading: isGettingPreviousDetails }] =
    useLazyGetOrderDetailsQuery()
  const [getGuestDetails, { isLoading: isGettingGuestDetails }] =
    useLazyGetOneCustomerQuery()
  const previousSendAddress: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(
      previousOrderDetails?.orderLocations,
      'sort',
      'asc',
    )
    return sortedLocations.slice(0, 1) || []
  }, [previousOrderDetails])
  const previousReceiveAddress: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(
      previousOrderDetails?.orderLocations,
      'sort',
      'asc',
    )
    return sortedLocations.slice(1) || []
  }, [previousOrderDetails])
  const [copyOrderDetails, { isLoading: isCopyingDetails }] =
    useCopyOrderDetailsMutation()

  const handleGetPreviousDetails = async (values: { previousCode: string }) => {
    setPreviousGuestDetails(undefined)
    setPreviousOrderDetails(undefined)
    const response = await getPreviousDetails({
      code: values.previousCode,
    })
    if ('data' in response) {
      setPreviousOrderDetails(response.data?.data)
      if (response.data?.data?.guestId) {
        const guestRes = await getGuestDetails({
          id: response?.data.data.guestId,
        })
        if ('data' in guestRes) {
          setPreviousGuestDetails({
            name: guestRes.data?.name,
            phone: guestRes.data?.phone,
          })
        }
        if ('error' in guestRes) {
          setPreviousGuestDetails(undefined)
        }
      }
    }
    if ('error' in response) {
      toast.error(
        get(response.error, 'data.error.message') ||
          'Tìm kiếm đơn hàng có lỗi.',
      )
      setPreviousGuestDetails(undefined)
      setPreviousOrderDetails(undefined)
    }
    autoLocationForm.resetFields()
  }
  const handleResetPreviousData = () => {
    setPreviousGuestDetails(undefined)
    setPreviousOrderDetails(undefined)
  }
  const handleSetCopiedDetails = async () => {
    try {
      const response = await copyOrderDetails({
        oldOrderCode: previousOrderDetails?.code,
        newOrderCode: orderDetails?.code,
      })
      if ('data' in response) {
        refetchOrderDetails()
        handleResetPreviousData()
        setOpen(false)
      }
      if ('error' in response) {
        toast.error(
          get(response.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <Form form={autoLocationForm} onFinish={handleGetPreviousDetails}>
      <div className="flex items-center">
        <Space.Compact block>
          <Form.Item
            className="my-0 flex-1"
            name="previousCode"
            rules={[{ required: true, message: MESSAGES.REQUIRED_ERROR }]}
          >
            <Input placeholder="Nhập mã đơn hàng" />
          </Form.Item>
          <Form.Item className="my-0">
            <Button
              type="primary"
              disabled={
                !previousOrderCode ||
                (previousOrderCode && previousOrderCode === '')
              }
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Space.Compact>
      </div>
      <Spin spinning={isGettingPreviousDetails || isGettingGuestDetails}>
        {previousOrderDetails && (
          <div className="mt-4 max-w-[350px]">
            <div>
              <span className="font-bold">Mã đơn hàng:</span>
              <Tag color="red" className="ml-2">
                {previousOrderDetails?.code}
              </Tag>
            </div>
            <div className="font-bold">Thông tin khách hàng:</div>
            <ul>
              <li>{`ID: ${
                previousOrderDetails?.guestId
                  ? previousOrderDetails?.guestId
                  : 'Chưa rõ'
              }`}</li>
              <li>{`Tên khách hàng: ${previousGuestDetails?.name}`}</li>
              <li>{`Số điện thoại: ${
                previousGuestDetails?.phone
                  ? formatPhone(previousGuestDetails?.phone)
                  : 'Chưa rõ'
              }`}</li>
            </ul>
            <div className="font-bold">Thông tin điểm nhận hàng:</div>
            <ul>
              <li>{`Địa chỉ: ${
                previousSendAddress?.[0]?.location
                  ? previousSendAddress?.[0]?.location
                  : 'Chưa rõ'
              }`}</li>
              <li>{`Người liên hệ: ${
                previousSendAddress?.[0]?.contact
                  ? previousSendAddress?.[0]?.contact
                  : 'Chưa rõ'
              }`}</li>
              <li>{`SĐT liên hệ: ${
                previousSendAddress?.[0]?.phone
                  ? formatPhone(previousSendAddress?.[0]?.phone)
                  : 'Chưa rõ'
              }`}</li>
            </ul>
            {previousReceiveAddress &&
              previousReceiveAddress?.map((i, idx) => (
                <>
                  <div className="font-bold">{`Thông tin điểm trả hàng${
                    previousReceiveAddress?.length > 1 ? ` số ${idx + 1}` : ''
                  }:`}</div>
                  <ul>
                    <li>{`Địa chỉ: ${
                      i?.location ? i?.location : 'Chưa rõ'
                    }`}</li>
                    <li>{`Người liên hệ: ${
                      i?.contact ? i?.contact : 'Chưa rõ'
                    }`}</li>
                    <li>{`SĐT liên hệ: ${
                      i?.phone ? formatPhone(i?.phone) : 'Chưa rõ'
                    }`}</li>
                  </ul>
                </>
              ))}

            <Button
              type="primary"
              block
              onClick={handleSetCopiedDetails}
              disabled={!previousOrderDetails}
              loading={isCopyingDetails}
            >
              Sao chép thông tin
            </Button>
          </div>
        )}
      </Spin>
    </Form>
  )
}

export default AutoFillLocation

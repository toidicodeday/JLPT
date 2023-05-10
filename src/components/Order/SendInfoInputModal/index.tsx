import DatePicker from '@/components/inputs/DatePicker'
import {
  useCreateOrderLocationMutation,
  useModifiedOrderLocationMutation,
  useUpdateOrderDetailsMutation,
} from '@/services/orderApi/order'
import { OrderLocationType } from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Divider, Form, Input, Modal, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { endOfMinute, isFuture, isPast } from 'date-fns'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import GoogleAutocomplete from '../LocationGoogleAutocomplete'

const { Option } = Select

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  type: number
  sort: number
  orderCode?: string
  initialValue: OrderLocationType | undefined
  initialPickupDate?: string | null | undefined
  initialPickupType?: number | null | undefined
  orderType: 'cn' | 'tx'
}

const SendInfoInputModal = ({
  open,
  setOpen,
  title,
  type,
  sort,
  orderCode,
  initialValue,
  initialPickupDate,
  initialPickupType,
  orderType,
}: Props) => {
  const [form] = Form.useForm()
  const [isSettingTime, setIsSettingTime] = React.useState<any>(false)
  const [createOrderLocation, { isLoading: isCreatingLoc }] =
    useCreateOrderLocationMutation()
  const [modifyOrderLocation, { isLoading: isUpdatingLoc }] =
    useModifiedOrderLocationMutation()
  const [updateOrderDetails, { isLoading: isUpdatingOrd }] =
    useUpdateOrderDetailsMutation()
  const handleCreateLocation = async (values: any) => {
    try {
      const locationInfo = {
        orderCode: orderCode,
        type: type,
        sort: sort,
        placeId: values['sendAddress'].place_id,
        location: values['sendAddress'].locationDetails,
        locationDetail: values['sendAddress'].location,
        contact: values['sendName'],
        phone: values['sendPhone'] ? `+84${values['sendPhone']}` : null,
        note: values['sendNote'],
        status: 0,
        latitude: Number(values['sendAddress'].latitude),
        longitude: Number(values['sendAddress'].longitude),
      }
      if (!initialValue) {
        const response = await createOrderLocation(locationInfo)
        if ('data' in response) {
          const updateOrderResponse = await updateOrderDetails({
            id: orderCode,
            body: {
              pickupType: orderType === 'tx' ? values['sendTime'] : 1,
              pickupDate: values['chosenSendTime']
                ? values['chosenSendTime']
                : null,
            },
          })
          if ('data' in updateOrderResponse) {
            toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
            handleCancel()
          }
          if ('error' in updateOrderResponse) {
            toast.error(
              get(updateOrderResponse.error, 'data.error.message') ||
                MESSAGES.CALL_API_ERROR,
            )
          }
        }
        if ('error' in response) {
          toast.error(
            get(response.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      } else {
        const modifyResponse = await modifyOrderLocation({
          id: initialValue.id,
          body: locationInfo,
        })
        if ('data' in modifyResponse) {
          const updateOrderResponse = await updateOrderDetails({
            id: orderCode,
            body: {
              pickupType: orderType === 'tx' ? values['sendTime'] : 1,
              pickupDate: values['chosenSendTime']
                ? values['chosenSendTime']
                : null,
            },
          })
          if ('data' in updateOrderResponse) {
            toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
            setOpen(() => false)
          }
          if ('error' in updateOrderResponse) {
            toast.error(
              get(updateOrderResponse.error, 'data.error.message') ||
                MESSAGES.CALL_API_ERROR,
            )
          }
        }
        if ('error' in modifyResponse) {
          toast.error(
            get(modifyResponse.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const handleCancel = () => {
    form.resetFields()
    setOpen(() => false)
  }

  useEffect(() => {
    if (initialValue && open) {
      form.setFieldValue('sendAddress', {
        key: initialValue.placeId,
        value: initialValue.location,
        place_id: initialValue.placeId,
        location: initialValue.location,
        locationDetails: initialValue.locationDetail,
        latitude: initialValue.latitude,
        longitude: initialValue.longitude,
      })
    }
  }, [form, initialValue, open])
  useEffect(() => {
    if (initialPickupType) {
      form.setFieldValue('sendTime', initialPickupType)
    }
  }, [initialPickupType, form])
  useEffect(() => {
    if (initialPickupDate) {
      setIsSettingTime(true)
      form.setFieldValue('chosenSendTime', new Date(initialPickupDate))
    }
  }, [initialPickupDate, form])

  return (
    <Modal title={title} open={open} onCancel={handleCancel} footer={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateLocation}
        validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
      >
        <GoogleAutocomplete
          formRef={form}
          propName="sendAddress"
          label="Địa chỉ lấy hàng"
        />
        <Form.Item
          label="Người liên hệ"
          name="sendName"
          initialValue={initialValue ? initialValue.contact : undefined}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sendPhone"
          rules={[
            {
              validator(_, value) {
                const regexString = new RegExp(/([3|5|7|8|9])+([0-9]{8})\b/g)
                if (regexString.test(value) || !value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Số điện thoại chưa đúng định dạng'),
                )
              },
            },
          ]}
          initialValue={
            initialValue && initialValue?.phone
              ? initialValue.phone.replace('+84', '')
              : undefined
          }
        >
          <Input prefix="+84" maxLength={9} />
        </Form.Item>
        <Form.Item
          label="Ghi chú chi tiết địa chỉ"
          name="sendNote"
          initialValue={initialValue ? initialValue.note : undefined}
        >
          <TextArea rows={3} />
        </Form.Item>
        {orderType === 'tx' && (
          <>
            <Form.Item
              label="Giờ hẹn chuyển hàng"
              name="sendTime"
              initialValue={initialPickupType ? initialPickupType : 0}
              rules={[{ required: true }]}
            >
              <Select
                onChange={(values: number) => {
                  if (values === 1) {
                    setIsSettingTime(true)
                  } else {
                    setIsSettingTime(false)
                  }
                }}
              >
                <Option value={0}>Ngay bây giờ</Option>
                <Option value={1}>Chọn ngày lấy hàng</Option>
              </Select>
            </Form.Item>
            {isSettingTime && (
              <Form.Item
                label="Giờ hẹn chuyển hàng"
                name="chosenSendTime"
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (isFuture(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          'Hãy chọn ngày giờ chuyển hàng trong tương lai!',
                        ),
                      )
                    },
                  }),
                ]}
                initialValue={
                  initialPickupDate ? new Date(initialPickupDate) : undefined
                }
              >
                <DatePicker
                  format="dd-MM-yyyy HH:mm"
                  showTime
                  className="w-full"
                  disabledDate={currentDate =>
                    isPast(endOfMinute(new Date(currentDate)))
                  }
                />
              </Form.Item>
            )}
          </>
        )}
        {orderType === 'cn' && (
          <Form.Item
            label="Giờ hẹn chuyển hàng"
            name="chosenSendTime"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
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
            initialValue={
              initialPickupDate ? new Date(initialPickupDate) : undefined
            }
          >
            <DatePicker
              format="dd-MM-yyyy HH:mm"
              showTime
              className="w-full"
              disabledDate={currentDate =>
                isPast(endOfMinute(new Date(currentDate)))
              }
            />
          </Form.Item>
        )}
        <Divider />
        <Button onClick={handleCancel}>Hủy</Button>
        <Button
          type="primary"
          htmlType="submit"
          className="ml-2"
          loading={isCreatingLoc || isUpdatingLoc || isUpdatingOrd}
        >
          Lưu thông tin
        </Button>
      </Form>
    </Modal>
  )
}

export default SendInfoInputModal

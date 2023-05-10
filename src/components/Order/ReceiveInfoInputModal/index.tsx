import {
  useCreateOrderLocationMutation,
  useModifiedOrderLocationMutation,
} from '@/services/orderApi/order'
import { OrderDetailsType, OrderLocationType } from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Divider, Form, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import GoogleAutocomplete from '../LocationGoogleAutocomplete'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  type: number
  sort?: number | null
  orderCode?: string
  initialValue: OrderLocationType | undefined
  orderDetails?: OrderDetailsType
}

const ReceiveInfoInputModal = ({
  open,
  setOpen,
  title,
  type,
  sort,
  orderCode,
  initialValue,
  orderDetails,
}: Props) => {
  const [form] = Form.useForm()
  const [createOrderLocation, { isLoading: isCreatingLoc }] =
    useCreateOrderLocationMutation()
  const [modifyOrderLocation, { isLoading: isUpdatingLoc }] =
    useModifiedOrderLocationMutation()
  const handleCreateLocation = async (values: any) => {
    try {
      const locationInfo = {
        orderCode: orderCode,
        type: type,
        sort: initialValue ? initialValue.sort : sort,
        placeId: values[`receiveAddress`].place_id,
        location: values[`receiveAddress`].locationDetails,
        locationDetail: values[`receiveAddress`].location,
        contact: values[`receiveName`],
        phone: values['receivePhone'] ? `+84${values[`receivePhone`]}` : null,
        note: values[`receiveNote`],
        status: 0,
        latitude: Number(values[`receiveAddress`].latitude),
        longitude: Number(values[`receiveAddress`].longitude),
      }
      if (!initialValue) {
        const response = await createOrderLocation(locationInfo)
        if ('data' in response) {
          toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
          handleCancel()
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
          form.resetFields()
          toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
          setOpen(() => false)
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
      form.setFieldValue(`receiveAddress`, {
        key: initialValue.placeId,
        value: initialValue.location,
        place_id: initialValue.placeId,
        location: initialValue.location,
        locationDetails: initialValue.locationDetail,
        latitude: initialValue.latitude,
        longitude: initialValue.longitude,
      })
      form.setFieldValue('receiveName', initialValue.contact)
      form.setFieldValue('receivePhone', initialValue.phone.replace('+84', ''))
      form.setFieldValue('receiveNote', initialValue.note)
    }
    return () => {
      form.resetFields()
    }
  }, [initialValue, form, open])

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
          propName="receiveAddress"
          label="Địa chỉ trả hàng"
        />
        <Form.Item label="Người liên hệ" name={`receiveName`}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={`receivePhone`}
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
        >
          <Input prefix="+84" maxLength={9} />
        </Form.Item>
        <Form.Item label="Ghi chú chi tiết địa chỉ" name={`receiveNote`}>
          <TextArea rows={3} />
        </Form.Item>
        <Divider />
        <Button onClick={handleCancel}>Hủy</Button>
        <Button
          type="primary"
          htmlType="submit"
          className="ml-2"
          loading={isCreatingLoc || isUpdatingLoc}
        >
          Lưu thông tin
        </Button>
      </Form>
    </Modal>
  )
}

export default ReceiveInfoInputModal

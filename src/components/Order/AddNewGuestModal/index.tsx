import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useCreateNewCustomerMutation } from '@/services/customerApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import {
  convertPhoneToSearchStr,
  convertToPhone84,
} from '@/utils/helpers/convert.helper'
import { Form, Input, Modal, Select, Divider, Button } from 'antd'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setGuestInfo: React.Dispatch<
    React.SetStateAction<{
      id: number
      name: string
      phone: string
    } | null>
  >
  initValue?: string
}

export const generatePassword = () => {
  const length = 6
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

const AddNewGuestModal = ({
  open,
  setOpen,
  setGuestInfo,
  initValue,
}: Props) => {
  const { data: locationOps } = useGetAreaOpsQuery({
    query: `?search=${encodeURIComponent(`parentId:=:0`)}`,
  })

  const [form] = Form.useForm()
  const [createNewGuest, { isLoading: isCreatingNew }] =
    useCreateNewCustomerMutation()

  useEffect(() => {
    if (initValue) {
      form.setFieldsValue({
        phone: convertPhoneToSearchStr(initValue),
      })
    }
  }, [form, initValue])

  const handleAddNewGuest = async (values: any) => {
    const newGuestInfo = {
      email: '',
      name: values.name,
      phone: convertToPhone84(values.phone),
      addressId: values.addressId,
      password: generatePassword(),
    }
    try {
      const addNewRes = await createNewGuest(newGuestInfo)
      if ('data' in addNewRes) {
        setGuestInfo({
          id: addNewRes?.data?.account?.id,
          name: addNewRes?.data?.account?.name,
          phone: addNewRes?.data?.account?.phone,
        })
        handleCancel()
      }
      if ('error' in addNewRes) {
        toast.error(
          get(addNewRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (err) {
      toast.error(get(err, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const handleCancel = () => {
    form.resetFields()
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      title="Khách hàng mới"
      footer={false}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleAddNewGuest} form={form}>
        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true },
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
        <Form.Item name="addressId" label="Khu vực hoạt động">
          <Select options={locationOps} />
        </Form.Item>
        <Divider />
        <div className="text-right">
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            className="ml-2"
            type="primary"
            htmlType="submit"
            loading={isCreatingNew}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddNewGuestModal

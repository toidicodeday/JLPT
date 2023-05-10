import { useCreateGuestTypeMutation } from '@/services/guestTypeApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Divider, Form, Input, Modal } from 'antd'
import { get } from 'lodash'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddGuestModal = ({ open, setOpen }: Props) => {
  const [form] = Form.useForm()
  const [createGuestType, { isLoading: isCreating }] =
    useCreateGuestTypeMutation()
  const handleCancel = () => {
    form.resetFields()
    setOpen(() => false)
  }
  const handleCreateType = async (value: { guestType: string }) => {
    try {
      const createRes = await createGuestType({
        name: value.guestType,
      })
      if ('data' in createRes) {
        toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
        setOpen(() => false)
      }
      if ('error' in createRes) {
        toast.error(
          get(createRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  return (
    <Modal
      open={open}
      title="Thêm mới loại khách hàng"
      footer={false}
      onCancel={() => setOpen(() => false)}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateType}
        validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
      >
        <Form.Item
          name="guestType"
          label="Tên loại khách hàng"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Divider className="my-2" />
        <div className="text-right">
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            className="ml-2"
            type="primary"
            htmlType="submit"
            loading={isCreating}
          >
            Thêm mới
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddGuestModal

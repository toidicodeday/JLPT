import { useUpdateGuestTypeMutation } from '@/services/guestTypeApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Divider, Form, Input, Modal } from 'antd'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  initialVal?: string
  editId?: number
}

const EditGuestModal = ({ open, setOpen, initialVal, editId }: Props) => {
  const [form] = Form.useForm()
  const [updateGuestType, { isLoading: isUpdating }] =
    useUpdateGuestTypeMutation()
  const handleCancel = () => {
    form.resetFields()
    setOpen(() => false)
  }
  const handleUpdateType = async (value: { guestType: string }) => {
    try {
      const updateRes = await updateGuestType({
        id: editId,
        body: {
          name: value.guestType,
        },
      })
      if ('data' in updateRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpen(() => false)
      }
      if ('error' in updateRes) {
        toast.error(
          get(updateRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      guestType: initialVal,
    })
  }, [form, initialVal])
  return (
    <Modal
      open={open}
      title="Sửa chữa chi tiết loại khách hàng"
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateType}
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
            loading={isUpdating}
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditGuestModal

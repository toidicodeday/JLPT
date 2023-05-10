import { useUpdateRoleNameMutation } from '@/services/roleApi'
import { ADMIN_ACC_FUNC, ADMIN_ACC_FUNC_OPS } from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Form, Input, Modal, Radio, Space } from 'antd'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  setIsModalOpen: (type: boolean) => void
  isModalOpen: boolean
  selectedItem: any
  setInit: React.Dispatch<React.SetStateAction<boolean>>
  isInit: boolean
}

interface Values {
  role: string
  functionName:
    | ADMIN_ACC_FUNC.SURVEY_STAFF
    | ADMIN_ACC_FUNC.OPERATING_STAFF
    | ADMIN_ACC_FUNC.LEADER
    | null
}

const EditRole = ({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setInit,
  isInit,
}: Props) => {
  const [form] = Form.useForm()
  const [updateRole, { isLoading: isLoadingEdit }] = useUpdateRoleNameMutation()

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const onFinish = async (values: Values) => {
    const response = await updateRole({
      id: selectedItem?.id,
      body: {
        name: values.role,
        functionName: values.functionName,
      },
    })
    if ('data' in response) {
      form.resetFields()
      setIsModalOpen(false)
    }
    if ('error' in response) {
      toast.error(
        get(response.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
      )
    }
  }

  useEffect(() => {
    if (isInit) {
      form.setFieldValue('role', selectedItem?.name)
      form.setFieldValue('functionName', selectedItem?.functionName)
      setInit(false)
    }
  }, [form, isInit, selectedItem, setInit])

  return (
    <>
      <Modal
        title="Chỉnh sửa quyền"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={form.submit}
        okButtonProps={{ loading: isLoadingEdit }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinish}
        >
          <Form.Item
            name="role"
            label="Tên quyền"
            rules={[{ required: true, message: 'Hãy nhập tên quyền!' }]}
            initialValue={selectedItem?.name}
          >
            <Input />
          </Form.Item>
          <div className="flex items-center justify-between pb-2">
            <div className="text-[#000000D9]">Chức năng</div>
            <Button
              type="dashed"
              onClick={() => form.setFieldValue('functionName', null)}
              size="small"
            >
              Bỏ chọn
            </Button>
          </div>
          <Form.Item name="functionName">
            <Radio.Group>
              <Space direction="vertical">
                {ADMIN_ACC_FUNC_OPS.map(item => (
                  <Radio value={item.value}>{item.label}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditRole

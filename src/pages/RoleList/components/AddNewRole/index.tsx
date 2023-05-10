import { useCreateRoleMutation } from '@/services/roleApi'
import { ADMIN_ACC_FUNC, ADMIN_ACC_FUNC_OPS } from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Form, Input, message, Modal, Radio, Space } from 'antd'
import { get } from 'lodash'
import React from 'react'

interface Props {
  setIsModalOpen: (type: boolean) => void
  isModalOpen: boolean
}

interface Values {
  role: string
  functionName:
    | ADMIN_ACC_FUNC.SURVEY_STAFF
    | ADMIN_ACC_FUNC.OPERATING_STAFF
    | ADMIN_ACC_FUNC.LEADER
    | null
}

const AddNewRole = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [form] = Form.useForm()
  const [createRole, { isLoading: isLoadingCreate }] = useCreateRoleMutation()

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const onFinsih = (values: Values) => {
    createRole({ name: values.role, functionName: values.functionName }).then(
      response => {
        if ('data' in response) {
          form.resetFields()
          setIsModalOpen(false)
        }
        if ('error' in response) {
          message.error(
            get(response?.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      },
    )
  }

  return (
    <React.Fragment>
      <Modal
        title="Thêm mới quyền"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={form.submit}
        okButtonProps={{ loading: isLoadingCreate }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onFinsih}
        >
          <Form.Item
            name="role"
            label="Tên quyền"
            rules={[{ required: true, message: 'Hãy nhập tên quyền!' }]}
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
    </React.Fragment>
  )
}

export default AddNewRole

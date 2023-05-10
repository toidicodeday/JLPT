import UploadImage from '@/components/inputs/UploadImg'
import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'

interface Props {
  setIsModalOpen: (type: boolean) => void
  isModalOpen: boolean
  onCreate: (values: Values) => void
}

interface Values {
  role: string
}

const AddNewService = (props: Props) => {
  const [form] = Form.useForm()
  const [resetFileList, setResetFileList] = useState(false)

  const handleCancel = () => {
    form.resetFields()
    setResetFileList(true)
    props.setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title="Thêm mới dịch vụ"
        open={props.isModalOpen}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Huỷ"
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields()
              props.onCreate(values)
              form.resetFields()
              setResetFileList(true)
              props.setIsModalOpen(false)
            })
            .catch(error => {
              console.log(error)
            })
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <UploadImage
            label="Ảnh đại diện"
            name="avatar"
            errorMess="Hãy upload ảnh đại diện!"
            resetFileList={resetFileList}
            setResetFileList={() => setResetFileList(false)}
            required
          />
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddNewService

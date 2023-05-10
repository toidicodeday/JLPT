import { UploadImage } from '@/components/inputs'
import { useCreateNewsMutation } from '@/services/newsApi'
import { Button, Divider, Form, Input, Modal } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
}

const AddNewsModal = (props: Props) => {
  const [form] = Form.useForm()

  const [createNews, { isLoading }] = useCreateNewsMutation()

  const handleFinish = (values: any) => {
    try {
      const body = {
        title: values?.title,
        link: values?.link,
        url: values?.avatar && values?.avatar[0]?.response?.url,
      }
      createNews(body).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới tin tức thành công!')
          props.setOpen(false)
          form.resetFields()
        } else if ('error' in response) {
          toast.error('Thêm mới tin tức thất bại!!')
        }
      })
    } catch (error) {
      toast.error('Thêm mới tin tức thất bại!')
    }
  }
  const handleCancel = () => {
    form.resetFields()
    props.setOpen(false)
  }
  return (
    <Modal
      title="Thêm tin tức"
      open={props.open}
      footer={false}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Hãy nhập tiêu đề tin tức' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Đường dẫn link bài viết"
          name="link"
          rules={[{ required: true, message: 'Hãy nhập link bài viết' }]}
        >
          <Input />
        </Form.Item>
        <UploadImage label="Ảnh đại diện" name="avatar" required={true} />
        <Divider />
        <div className="flex justify-end">
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            type="primary"
            className="ml-2"
            htmlType="submit"
            loading={isLoading}
          >
            Thêm tin tức
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddNewsModal

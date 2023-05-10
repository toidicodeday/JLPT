import { UploadImage } from '@/components/inputs'
import { useUpdateNewsMutation } from '@/services/newsApi'
import { Button, Divider, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
  initialVal: any
}

const EditNewsModal = (props: Props) => {
  const [form] = Form.useForm()
  const [updateNews, { isLoading }] = useUpdateNewsMutation()

  useEffect(() => {
    form.setFieldsValue({
      avatar: [{ url: props?.initialVal?.url }],
    })
  }, [form, props.initialVal.url])

  const handleFinish = (values: any) => {
    try {
      const body = {
        title: values?.title,
        link: values?.link,
        url: values?.avatar[0]?.response?.url,
      }
      updateNews({ id: props.initialVal?.id, body }).then(response => {
        if ('data' in response) {
          toast.success('Chỉnh sửa tin tức thành công!')
          props.setOpen(false)
        } else if ('error' in response) {
          toast.error('Chỉnh sửa tin tức thất bại!')
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa tin tức thất bại!')
    }
  }
  const handleCancel = () => {
    props.setOpen(false)
  }
  return (
    <Modal
      title="Sửa tin tức"
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
          initialValue={props.initialVal.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Đường dẫn link bài viết"
          name="link"
          rules={[{ required: true, message: 'Hãy nhập link bài viết' }]}
          initialValue={props.initialVal.link}
        >
          <Input />
        </Form.Item>
        <UploadImage
          label="Ảnh đại diện"
          name="avatar"
          errorMess="Hãy upload ảnh đại diện!"
          required={true}
        />
        <Divider />
        <div className="flex justify-end">
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            type="primary"
            className="ml-2"
            htmlType="submit"
            loading={isLoading}
          >
            Sửa tin tức
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditNewsModal

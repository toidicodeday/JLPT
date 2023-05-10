import { useUploadDocumentMutation } from '@/services/documentApi'
import { useCreateVideoConfigMutation } from '@/services/systemApi/system'
import { Button, Divider, Form, Input, Modal, Select, Spin, Upload } from 'antd'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { MdUpload } from 'react-icons/md'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
}

const uploadVideoOps = [
  { label: 'Upload video', value: 'video' },
  { label: 'Upload link video', value: 'link' },
]

const AddVideoModal = (props: Props) => {
  const [form] = Form.useForm()

  const [useTypeUpload, setUseTypeUpload] = useState<string>('video')
  const [uploadDoc, { isLoading: upLoadingDoc }] = useUploadDocumentMutation({})
  const [uploadVideo, { isLoading: upLoadingVideo }] =
    useCreateVideoConfigMutation()

  const handleUpload = ({ file, onSuccess, onError }: any) => {
    uploadDoc(file).then(response => {
      if ('data' in response) {
        onSuccess({
          url: response.data.uploadedLink?.[0]?.downloadLink,
          docId: response.data.createdDocs?.[0]?.id,
        })
      }
      if ('error' in response) {
        onError()
      }
    })
  }

  const handleCancel = () => {
    form.resetFields()
    props.setOpen(false)
    setUseTypeUpload('video')
  }

  const onChangeType = (value: string) => {
    if (value === 'video') setUseTypeUpload('video')
    else setUseTypeUpload('link')
  }

  const handleChangeVideo: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info?.file?.status === 'error') {
      toast.error('Upload video thất bại!')
    } else if (info?.file?.status === 'done') {
      const body = {
        url: info?.file?.response?.url,
      }
      uploadVideo(body).then(response => {
        if ('data' in response) {
          toast.success('Upload video thành công!')
          handleCancel()
        } else toast.error('Upload video thất bại!')
      })
    }
  }

  const handleFinish = (values: any) => {
    const body = {
      url: values?.link,
    }
    uploadVideo(body).then(response => {
      if ('data' in response) {
        toast.success('Upload link video thành công!')
        handleCancel()
      } else toast.error('Upload link video thất bại!')
    })
  }
  return (
    <Modal
      title="Thêm video trang chủ"
      open={props.open}
      footer={false}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleFinish} form={form}>
        <Spin spinning={upLoadingDoc || upLoadingVideo}>
          <Form.Item label="Loại upload video" name="type" initialValue="video">
            <Select options={uploadVideoOps} onChange={onChangeType} />
          </Form.Item>

          {useTypeUpload === 'link' && (
            <Form.Item
              label="Đường dẫn link video"
              name="link"
              rules={[{ required: true, message: 'Hãy nhập link video' }]}
            >
              <Input />
            </Form.Item>
          )}
          {useTypeUpload === 'video' && (
            <Upload
              customRequest={handleUpload}
              onChange={handleChangeVideo}
              showUploadList={false}
            >
              <Button type="primary" icon={<MdUpload className="text-base" />}>
                Upload video
              </Button>
            </Upload>
          )}
          <Divider />
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleCancel}
              disabled={upLoadingDoc || upLoadingVideo}
            >
              Huỷ
            </Button>
            {useTypeUpload === 'link' && (
              <Button
                type="primary"
                htmlType="submit"
                loading={upLoadingDoc || upLoadingVideo}
              >
                Thêm link video
              </Button>
            )}
          </div>
        </Spin>
      </Form>
    </Modal>
  )
}

export default AddVideoModal

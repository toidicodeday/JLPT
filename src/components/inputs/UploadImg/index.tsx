import { PlusOutlined } from '@ant-design/icons'
import { Form, Modal, Spin, Upload } from 'antd'
import React, { useState } from 'react'
import { useUploadDocumentMutation } from '@/services/documentApi'
import { toast } from 'react-toastify'

interface Props {
  label: string
  name: string
  errorMess?: string
  fileList?: any[]
  resetFileList?: boolean
  setResetFileList?: () => void
  required: boolean
}

const UploadImage = ({ name, required, label, errorMess }: Props) => {
  const [previewVisible, setPreviewVisible] = useState('')
  const [uploadDoc, { isLoading }] = useUploadDocumentMutation({})
  const form = Form.useFormInstance()

  const handleUpload = ({ file, onSuccess, onError }: any) => {
    uploadDoc(file).then(response => {
      if ('data' in response) {
        onSuccess({
          url: response.data.uploadedLink?.[0]?.downloadLink,
          docId: response.data.createdDocs?.[0]?.id,
        })
      }
      if ('error' in response) {
        form.setFieldValue(name, [])
        onError()
        toast.error('Thêm mới ảnh thất bại!')
      }
    })
  }

  return (
    <div className="w-30 overflow-hidden">
      <Form.Item
        noStyle
        shouldUpdate={(prev, next) => prev[name] !== next[name]}
      >
        {({ getFieldValue }) => {
          const fileList = getFieldValue(name)
          return (
            <Spin spinning={isLoading}>
              <Form.Item
                label={label}
                name={name}
                rules={[{ required: required, message: errorMess }]}
                valuePropName="fileList"
                getValueFromEvent={e => {
                  if (Array.isArray(e)) return e
                  return e?.fileList
                }}
              >
                <Upload
                  accept="image/png, image/jpeg"
                  customRequest={handleUpload}
                  listType="picture-card"
                  maxCount={1}
                  className="w-28 h-28 overflow-hidden"
                  onRemove={() => form.setFieldValue(name, [])}
                  onPreview={file => {
                    setPreviewVisible(file.url || file.response?.url || '')
                  }}
                >
                  {(!fileList || fileList?.length < 1) && (
                    <div>
                      <PlusOutlined />
                      <div className="mt-2">Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Spin>
          )
        }}
      </Form.Item>
      <Modal
        open={Boolean(previewVisible)}
        title={label || ''}
        footer={null}
        onCancel={() => setPreviewVisible('')}
      >
        <img className="w-full" src={previewVisible} alt="preview" />
      </Modal>
    </div>
  )
}

export default UploadImage

import FormInputText from '@/components/inputs/InputText'
import { useUploadDocumentMutation } from '@/services/documentApi'
import { Button, Col, Form, InputNumber, Row, Typography } from 'antd'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useCreateContractMutation } from '@/services/contractApi'

const ContractAddNew = () => {
  const navigate = useNavigate()
  const [attachedFiles, setAttachedFiles] = React.useState<{
    fileName: string
    url: string
  } | null>(null)

  const [uploadDocument, { isLoading: isUpdatingContract }] =
    useUploadDocumentMutation()
  const [createContract, { isLoading: isCreating }] =
    useCreateContractMutation()

  const handleUploadContract = async (e: any) => {
    const file = get(e.target, 'files.[0]')
    uploadDocument(file).then(response => {
      if ('data' in response) {
        setAttachedFiles({
          fileName: response?.data?.uploadedLink[0]?.originalFile,
          url: response?.data?.uploadedLink[0]?.downloadLink,
        })
        toast.success('Upload file thành công!')
      }
      if ('error' in response) {
        toast.error(
          get(response.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    })
  }

  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.name,
        termValue: values?.term,
        fileUrl: attachedFiles?.url,
      }
      if (attachedFiles?.url)
        createContract(body).then((response: any) => {
          if ('data' in response) {
            toast.success('Thêm mới loại hợp đồng thành công !')
            navigate('/quan-ly-he-thong/hop-dong/')
          } else if ('error' in response) {
            toast.error('Thêm mới loại hợp đồng thất bại!')
          }
        })
      else {
        toast.error('Yêu cầu thêm mới file đính kèm!')
      }
    } catch (error) {
      toast.error('Thêm mới loại hợp đồng thất bại!')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-4">
        <Link to="/quan-ly-he-thong/hop-dong">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              TẠO LOẠI HỢP ĐỒNG
            </Typography>
          </div>
        </Link>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col lg={11} md={11} xs={24} sm={12}>
            <FormInputText name="name" lable="Tên loại hợp đồng" required />
          </Col>
          <Col
            lg={{ span: 11, offset: 2 }}
            md={{ span: 11, offset: 2 }}
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Giá trị thời hạn"
              name="term"
              rules={[
                {
                  required: true,
                  message: 'Trường này không được để trống!',
                },
              ]}
            >
              <InputNumber addonAfter="Tháng" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <span className="text-primary mr-1">*</span> File đính kèm
          </Col>
          <Col>
            <label>
              <div
                className={`${
                  attachedFiles?.url ? 'border-grayButton' : 'border-primary'
                } w-full h-[50px] border border-solid rounded flex items-center justify-center gap-3 p-2`}
              >
                <div className="text-center">
                  <AiOutlineCloudUpload className="text-primary text-xl" />
                </div>
                <div className="font-bold">Tải lên file hợp đồng</div>
              </div>
              <input
                type="file"
                accept="application/pdf"
                value=""
                onChange={handleUploadContract}
                className="hidden"
              />
            </label>
          </Col>
          <Col className="flex justify-center items-center">
            <a href={attachedFiles?.url} target="_blank" rel="noreferrer">
              {attachedFiles?.fileName}
            </a>
          </Col>
        </Row>
        <div className="pb-4 flex justify-end gap-4 mt-32">
          <Button
            onClick={() => navigate('/quan-ly-he-thong/hop-dong/')}
            disabled={isCreating || isUpdatingContract}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdatingContract}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ContractAddNew

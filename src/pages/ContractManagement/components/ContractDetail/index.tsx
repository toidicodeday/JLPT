import FormInputText from '@/components/inputs/InputText'
import {
  useGetOneContractQuery,
  useUpdateContractMutation,
} from '@/services/contractApi'
import { useUploadDocumentMutation } from '@/services/documentApi'
import { Button, Col, Form, InputNumber, Row, Spin, Typography } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const ContractDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()

  const [attachedFiles, setAttachedFiles] = React.useState<{
    fileName: string
    url: string
  } | null>(null)
  const idContract = new URLSearchParams(location.search).get('id')
  const { data: detailContract, isLoading } = useGetOneContractQuery(
    { id: idContract },
    { skip: !idContract },
  )
  const [uploadDocument, { isLoading: isUpdatingContract }] =
    useUploadDocumentMutation()
  const [updateContract, { isLoading: isUpdating }] =
    useUpdateContractMutation()

  const splitUrl = (str: string) => {
    if (str.length > 0) {
      let substr = str.replace('https://minio.2soft.top/thanhhung/', '')
      return substr.slice(Number(substr.indexOf('-')) + 1)
    }
    return ''
  }
  useEffect(() => {
    form.setFieldsValue({
      name: detailContract?.name,
      term: detailContract?.termValue,
    })
    setAttachedFiles({
      fileName: detailContract?.fileUrl && splitUrl(detailContract?.fileUrl),
      url: detailContract?.fileUrl,
    })
  }, [form, detailContract])

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
        updateContract({ id: idContract, body }).then((response: any) => {
          if ('data' in response) {
            toast.success('Chỉnh sửa loại hợp đồng thành công !')
            navigate('/quan-ly-he-thong/hop-dong/')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa loại hợp đồng thất bại!')
          }
        })
      else {
        toast.error('Yêu cầu thêm mới file đính kèm!')
      }
    } catch (error) {
      toast.error('Chỉnh sửa loại hợp đồng thất bại!')
    }
  }
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.contract,
        'edit',
      ),
    }
  }, [adminInfo])
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-4">
        <Link to="/quan-ly-he-thong/hop-dong">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT HỢP ĐỒNG
            </Typography>
          </div>
        </Link>
      </div>
      <Spin spinning={isLoading}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          disabled={!authorizeStatus.canEdit}
        >
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
                <InputNumber addonAfter="Tháng" className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <span className="text-primary">*</span> File đính kèm
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
                  disabled={!authorizeStatus.canEdit}
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
              disabled={isUpdating || isUpdatingContract}
            >
              Huỷ
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating || isUpdatingContract}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </Spin>
    </>
  )
}

export default ContractDetail

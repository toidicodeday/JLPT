import { UploadImage } from '@/components/inputs'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import FormInputText from '@/components/inputs/InputText'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Row,
  Spin,
  Switch,
  Typography,
} from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Editor } from '@tinymce/tinymce-react'
import {
  useGetOneAdvertismentQuery,
  useUpdateAdvertismentMutation,
} from '@/services/advertismentApi'
import DatePicker from '@/components/inputs/DatePicker'
import { useSelector } from 'react-redux'
import { AdminMeType } from '@/services/accountApi/types'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const { RangePicker } = DatePicker

const AdvertismentManagementDetail = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()

  const [isDisplayInApp, setIsDisplayInApp] = useState(true)
  const [isDisplayWhenOpen, setIsDisplayWhenOpen] = useState(false)
  const [content, setContent] = useState<string>()
  const editorRef = useRef<any>()
  const idAdvertisement = new URLSearchParams(location.search).get('id')

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: detailAdvertisment, isLoading } = useGetOneAdvertismentQuery(
    { id: Number(idAdvertisement) },
    { skip: !idAdvertisement },
  )
  const [updateAdvertisment, { isLoading: isUpdating }] =
    useUpdateAdvertismentMutation()

  useEffect(() => {
    if (detailAdvertisment?.data) {
      const data = detailAdvertisment.data
      form.setFieldsValue({
        name: data?.name,
        timeRange: [
          new Date(`${data?.startTime}`),
          new Date(`${data?.endTime}`),
        ],
        bannerUrl: [{ url: data?.imageDisplay }],
        workingAreaId: data?.workingAreaId,
      })
      setIsDisplayInApp(Boolean(data?.displayInApp))
      setIsDisplayWhenOpen(Boolean(data?.displayWhenOpenApp))
      setContent(data?.content)
    }
  }, [detailAdvertisment?.data, form])
  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.name,
        startTime: values?.timeRange && values?.timeRange[0],
        endTime: values?.timeRange && values?.timeRange[1],
        imageDisplay:
          values?.bannerUrl &&
          (values?.bannerUrl[0]?.response?.url || values?.bannerUrl[0]?.url),
        displayInApp: isDisplayInApp,
        displayWhenOpenApp: isDisplayWhenOpen,
        workingAreaId: values?.workingAreaId,
        content: editorRef?.current?.getContent(),
      }
      updateAdvertisment({ id: Number(idAdvertisement), body }).then(
        response => {
          if ('data' in response) {
            toast.success('Chỉnh sửa quảng cáo thành công!')
            navigate('/quan-ly-dich-vu/quang-cao/')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa quảng cáo thất bại')
          }
        },
      )
    } catch (error) {
      toast.error('Chỉnh sửa quảng cáo thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.advertisement,
        'edit',
      ),
    }
  }, [adminInfo])
  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-4">
        <Link to="/quan-ly-dich-vu/quang-cao">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHỈNH SỬA QUẢNG CÁO
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
            <Col xs={24} sm={24} md={11}>
              <FormInputText name="name" lable="Tên chương trình" required />
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <Form.Item name="timeRange" label="Thời gian áp dụng (từ - đến)">
                <RangePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <UploadImage
                label="Ảnh banner"
                name="bannerUrl"
                errorMess="Hãy upload ảnh hiển thị!"
                required={false}
              />
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <p>Trạng thái</p>
              <div className="flex flex-col md:flex-row justify-between mt-3">
                <div>
                  <Switch
                    checked={isDisplayInApp}
                    onChange={() => setIsDisplayInApp(s => !s)}
                    className="mr-2 mb-3"
                  />
                  <span>Hiển thị trên ứng dụng</span>
                </div>
                <Checkbox
                  onClick={() => setIsDisplayWhenOpen(s => !s)}
                  checked={isDisplayWhenOpen}
                >
                  Hiển thị khi mở app
                </Checkbox>
              </div>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <FormInputSelect
                lable="Khu vực áp dụng"
                options={vietnamCityOps}
                name="workingAreaId"
                placeholder="Tất cả khu vực"
              />
            </Col>
          </Row>

          <p>Nội dung chương trình quảng cáo </p>
          <Editor
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            disabled={!authorizeStatus.canEdit}
          />
          <div className="py-4 flex justify-end gap-4">
            <Button
              onClick={() => navigate('/quan-ly-dich-vu/quang-cao/')}
              disabled={isUpdating}
            >
              Huỷ
            </Button>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Lưu
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
}

export default AdvertismentManagementDetail

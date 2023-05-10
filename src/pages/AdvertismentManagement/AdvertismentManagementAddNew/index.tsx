import { UploadImage } from '@/components/inputs'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import FormInputText from '@/components/inputs/InputText'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  Button,
  Checkbox,
  Col,
  Form,
  message,
  Row,
  Switch,
  Typography,
} from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Editor } from '@tinymce/tinymce-react'
import { useCreateNewAdvertismentMutation } from '@/services/advertismentApi'
import DatePicker from '@/components/inputs/DatePicker'

const { RangePicker } = DatePicker
const opsAllValue = 'all'

const AdvertismentManagementAddNew = () => {
  const navigate = useNavigate()

  const [isDisplayInApp, setIdDisplayInApp] = useState(true)
  const [isDisplayWhenOpen, setDisplayWhenOpen] = useState(false)
  const editorRef = useRef<any>()

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const convertedCityOps = useMemo(() => {
    const optionAll = { label: 'Tất cả khu vực', value: opsAllValue }
    if (vietnamCityOps) return [optionAll, ...vietnamCityOps]
    return [optionAll]
  }, [vietnamCityOps])

  const [createAdvertisment, { isLoading: isCreating }] =
    useCreateNewAdvertismentMutation()
  const onFinish = (values: any) => {
    const bannelUrl = values?.bannerUrl && values?.bannerUrl[0]?.response?.url
    if (!bannelUrl) {
      return message.warn('Ảnh banner không được trống')
    }
    try {
      const body = {
        name: values?.name,
        startTime: values?.timeRange && values?.timeRange[0],
        endTime: values?.timeRange && values?.timeRange[1],
        imageDisplay: bannelUrl,
        displayInApp: isDisplayInApp,
        displayWhenOpenApp: isDisplayWhenOpen,
        workingAreaId:
          values?.workingAreaId === opsAllValue ? null : values?.workingAreaId,
        content: editorRef?.current?.getContent(),
      }
      createAdvertisment(body).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới quảng cáo thành công!')
          navigate('/quan-ly-dich-vu/quang-cao/')
        } else if ('error' in response) {
          toast.error('Thêm mới quảng cáo thất bại')
        }
      })
    } catch (error) {
      toast.error('Thêm mới quảng cáo thất bại!')
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-4">
        <Link to="/quan-ly-dich-vu/quang-cao">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              TẠO QUẢNG CÁO
            </Typography>
          </div>
        </Link>
      </div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ workingAreaId: opsAllValue }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={11}>
            <FormInputText name="name" lable="Tên chương trình" required />
          </Col>
          <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
            <Form.Item
              name="timeRange"
              label="Thời gian áp dụng (từ - đến)"
              rules={[
                { required: true, message: 'Trường này không được để trống' },
              ]}
            >
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
                  onChange={() => setIdDisplayInApp(s => !s)}
                  className="mr-2 mb-3"
                />
                <span>Hiển thị trên ứng dụng</span>
              </div>
              <Checkbox
                onClick={() => setDisplayWhenOpen(s => !s)}
                checked={isDisplayWhenOpen}
              >
                Hiển thị khi mở app
              </Checkbox>
            </div>
          </Col>
          <Col xs={24} sm={24} md={11}>
            <FormInputSelect
              lable="Khu vực áp dụng"
              options={convertedCityOps}
              name="workingAreaId"
              placeholder="Tất cả khu vực"
              required
            />
          </Col>
        </Row>

        <p>Nội dung chương trình quảng cáo </p>
        <Editor
          apiKey="your-api-key"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
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
        />
        <div className="py-4 flex justify-end gap-4">
          <Button
            onClick={() => navigate('/quan-ly-dich-vu/quang-cao/')}
            disabled={isCreating}
          >
            Huỷ
          </Button>
          <Button type="primary" htmlType="submit" loading={isCreating}>
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AdvertismentManagementAddNew

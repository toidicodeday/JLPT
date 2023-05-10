import { RedoOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Spin,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import DatePicker from '@/components/inputs/DatePicker'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { toast } from 'react-toastify'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import FormInputText from '@/components/inputs/InputText'
import { generateRandomString } from '@/core/helpers/menu.helper'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetGuestTypeOpsQuery } from '@/services/guestTypeApi'
import { useGetProductOpsQuery } from '@/services/serviceApi/service'
import {
  useGetOnePromotionQuery,
  useUpdatePromotionMutation,
} from '@/services/feeApi/fee'
import { UploadImage } from '@/components/inputs'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { zonedTimeToUtc } from 'date-fns-tz'

const { RangePicker } = DatePicker

const selectUnitOps = [
  {
    label: 'vnd',
    value: 'VND',
  },
  {
    label: '%',
    value: 'RATE',
  },
]

const messageRequire = [
  {
    required: true,
    message: 'Trường này không được để trống!',
  },
]

function PromotionDetail() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()

  const [isStatus, setIsStatus] = useState(true)
  const [isMessage, setIsMessage] = useState(false)
  const [selectUnit, setSelectUnit] = useState('')
  const idPromotion = new URLSearchParams(location.search).get('id')

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })
  const { data: typeGuestOps } = useGetGuestTypeOpsQuery()
  const { data: productOps } = useGetProductOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: detailPromotion, isLoading } = useGetOnePromotionQuery(
    { id: idPromotion },
    { skip: !idPromotion },
  )
  const [updatePromotion, { isLoading: isUpdating }] =
    useUpdatePromotionMutation()

  useEffect(() => {
    form.setFieldsValue({
      name: detailPromotion?.name,
      code: detailPromotion?.code,
      discount: detailPromotion?.discount,
      maxDiscount: detailPromotion?.maxDiscount,
      timeRange: detailPromotion?.applyFrom &&
        detailPromotion?.applyTo && [
          new Date(`${detailPromotion?.applyFrom}`),
          new Date(`${detailPromotion?.applyTo}`),
        ],
      quantity: detailPromotion?.quantity,
      workingAreaId: detailPromotion?.workingAreaId,
      products: detailPromotion?.products?.map((i: any) => i.id),
      guestTypes: detailPromotion?.guestTypes?.map((i: any) => i.id),
      minPrice: detailPromotion?.minPrice,
      bannerUrl: [{ url: detailPromotion?.bannerUrl }],
    })
    setSelectUnit(detailPromotion?.discountType)
    setIsStatus(detailPromotion?.status === 'PUBLISH' ? true : false)
    // setIsMessage(detailPromotion?.notify)
  }, [form, idPromotion, detailPromotion])

  const onFinish = async (values: any) => {
    try {
      const body = {
        name: values?.name,
        code: values?.code,
        discount: Number(values?.discount),
        maxDiscount: Number(values?.maxDiscount),
        applyFrom:
          values?.timeRange &&
          zonedTimeToUtc(
            new Date(
              values?.timeRange[0].getFullYear(),
              values?.timeRange[0].getMonth(),
              values?.timeRange[0]?.getDate(),
              0,
              0,
              0,
              0,
            ),
            'Asia/Bangkok',
          ).toISOString(),
        applyTo:
          values?.timeRange &&
          zonedTimeToUtc(
            new Date(
              values?.timeRange[1].getFullYear(),
              values?.timeRange[1].getMonth(),
              values?.timeRange[1]?.getDate(),
              23,
              59,
              59,
              999,
            ),
            'Asia/Bangkok',
          ).toISOString(),
        quantity: Number(values?.quantity),
        workingAreaId: values?.workingAreaId,
        status: isStatus ? 'PUBLISH' : 'UNPUBLISH',
        notify: isMessage,
        products: values?.products?.map((item: any) => {
          return { id: item }
        }),
        guestTypes: values?.guestTypes?.map((item: any) => {
          return { id: item }
        }),
        minPrice: Number(values?.minPrice),
        discountType: selectUnit,
        bannerUrl: values?.bannerUrl && values?.bannerUrl[0]?.response?.url,
      }
      updatePromotion({ id: idPromotion, body: body }).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới chương trình khuyến mãi thành công!')
          navigate('/quan-ly-dich-vu/khuyen-mai/')
        } else if ('error' in response) {
          toast.error(
            get(response?.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa chương trình thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.promotion,
        'edit',
      ),
    }
  }, [adminInfo])

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-4">
        <Link to="/quan-ly-dich-vu/khuyen-mai">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHỈNH SỬA CHƯƠNG TRÌNH KHUYẾN MẠI
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
          <UploadImage
            label="Ảnh banner"
            name="bannerUrl"
            errorMess="Hãy upload ảnh hiển thị!"
            required={false}
          />
          <Row gutter={16}>
            <Col xs={24} sm={24} md={11}>
              <FormInputText name="name" lable="Tên chương trình" required />
            </Col>
            <Col xs={20} sm={20} md={{ span: 9, offset: 2 }}>
              <FormInputText
                name="code"
                lable="Mã khuyến mãi"
                required
                maxLength={8}
              />
            </Col>
            <Col span={2} className="flex items-center mt-1">
              <Tooltip title="Sinh tự động" placement="topRight">
                <Button
                  onClick={() => {
                    const result = generateRandomString(8)
                    form.setFieldsValue({
                      code: result,
                    })
                  }}
                  className="text-blueColor"
                >
                  <RedoOutlined />
                </Button>
              </Tooltip>
            </Col>
            <Col xs={12} sm={12} md={5}>
              <Form.Item
                label="Giảm giá"
                name="discount"
                rules={messageRequire}
              >
                <InputNumberFormatMoney
                  addonAfter={
                    <Select
                      options={selectUnitOps}
                      onChange={value => setSelectUnit(value)}
                      value={selectUnit}
                    />
                  }
                  className="rounded-md w-full"
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={{ span: 5, offset: 1 }}>
              <Form.Item
                label="Tối đa"
                name="maxDiscount"
                rules={messageRequire}
              >
                <InputNumberFormatMoney addonAfterText="vnd" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <Form.Item name="timeRange" label="Thời gian áp dụng (từ - đến)">
                <RangePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <Form.Item
                label="Số lượng mã(không điền là không giới hạn)"
                name="quantity"
              >
                <InputNumber className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <FormInputSelect
                lable="Khu vực áp dụng"
                options={vietnamCityOps}
                name="workingAreaId"
                required={false}
                placeholder="Tất cả khu vực"
              />
            </Col>
            <Col span={11}>
              <Switch
                checked={isStatus}
                onChange={() => setIsStatus(!isStatus)}
                className="mr-2"
              />
              <span>Công khai</span>
            </Col>
            {/* <Col span={11} offset={2}>
              <Checkbox
                onClick={() => setIsMessage(!isMessage)}
                checked={isMessage}
              >
                Gửi thông báo đến khách hàng
              </Checkbox>
            </Col> */}
          </Row>
          <hr className="border-b border-t-0 border-x-0 border-solid border-grayDivider pt-3" />
          <h3 className="my-5 font-medium text-sm text-black">
            ĐIỀU KIỆN ÁP DỤNG
          </h3>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={11}>
              <FormInputSelect
                lable="Chọn dịch vụ áp dụng"
                options={productOps}
                name="products"
                required={false}
                mode="multiple"
                placeholder="Tất cả dịch vụ"
              />
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <FormInputSelect
                lable="Loại khách hàng được áp dụng"
                options={typeGuestOps}
                name="guestTypes"
                required={false}
                mode="multiple"
                placeholder="Tất cả khách hàng"
              />
            </Col>
            <Col xs={24} sm={24} md={11}>
              <Form.Item label="Giá trị đơn hàng tối thiểu" name="minPrice">
                <InputNumberFormatMoney
                  addonAfter="vnd"
                  className="w-full rounded"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="pb-4 flex justify-end gap-4">
            <Button
              onClick={() => navigate('/quan-ly-dich-vu/khuyen-mai/')}
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
    </>
  )
}

export default PromotionDetail

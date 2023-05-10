import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import InputPercent from '@/components/inputs/InputPercent'
import { toast } from 'react-toastify'
import DatePicker from '@/components/inputs/DatePicker'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import { useGetContractOpsQuery } from '@/services/contractApi'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { debounce } from 'lodash'
import {
  useCalculateDiscountMutation,
  useGetOneDiscountQuery,
  useUpdateDiscountMutation,
} from '@/services/discountApi'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { numberWithComma } from '@/utils/helpers/convert.helper'
import { STATUS_DISCOUNT } from '@/utils/constant/constant'
import { isAfter, startOfDay } from 'date-fns'
import { endOfDay } from 'date-fns/esm'
import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'

const DEBOUNCE_TIME = 500

const DetailProgramDiscount = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const location = useLocation()

  const idProgDiscount = Number(new URLSearchParams(location.search).get('id'))

  const [usageFeeCal, setUsageFeeCal] = useState<number>()
  const [incomeTaxFeeCal, setIncomeTaxFeeCal] = useState<number>()
  const [driverIncomeCal, setDriverIncomeCal] = useState<number>()
  const [discountCal, setDiscountCal] = useState<number>()
  const [priceCal, setPriceCal] = useState<number>()
  const [applyFrom, setApplyFrom] = useState<Date>()
  const [applyTo, setApplyTo] = useState<Date>()

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: detailDiscount, isLoading } = useGetOneDiscountQuery(
    { id: idProgDiscount },
    { skip: !idProgDiscount },
  )

  const [calculateDiscount] = useCalculateDiscountMutation()
  const [updateDiscount, { isLoading: isUpdating }] =
    useUpdateDiscountMutation()

  useEffect(() => {
    form.setFieldsValue({
      name: detailDiscount?.name,
      applyFrom: new Date(detailDiscount?.applyFrom),
      applyTo: new Date(detailDiscount?.applyTo),
      contractId: detailDiscount?.contractId,
      workingAreaId: detailDiscount?.workingAreaId,
      incomeTaxFee: detailDiscount?.incomeTaxFee,
      usageFee: detailDiscount?.usageFee,
      vat: Number(detailDiscount?.vat),
    })
    setUsageFeeCal(detailDiscount?.usageFee)
    setIncomeTaxFeeCal(detailDiscount?.incomeTaxFee)
    setApplyFrom(new Date(detailDiscount?.applyFrom))
    setApplyTo(new Date(detailDiscount?.applyTo))
  }, [form, detailDiscount])

  const calculateFeeDiscount = (
    price: number,
    usageFee: number,
    incomeTaxFee: number,
  ) => {
    const body = {
      usageFee: Number(usageFee),
      incomeTaxFee: Number(incomeTaxFee),
      price: Number(price),
      vat: Number(detailDiscount?.vat),
    }
    if (usageFee && incomeTaxFee && price) {
      calculateDiscount({ body }).then(response => {
        if ('data' in response) {
          setDiscountCal(response?.data?.discount)
          setDriverIncomeCal(response?.data?.driverIncome)
        }
      })
    } else {
      setDiscountCal(0)
      setDriverIncomeCal(0)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCalculateFee = useCallback(
    debounce(value => {
      calculateFeeDiscount(value, Number(usageFeeCal), Number(incomeTaxFeeCal))
    }, DEBOUNCE_TIME),
    [usageFeeCal, incomeTaxFeeCal],
  )

  const onFormFinish = async (values: any) => {
    try {
      const body = {
        name: values.name,
        applyFrom: values?.applyFrom,
        applyTo: values?.applyTo,
        contractId: values.contractId,
        workingAreaId: values.workingAreaId,
        incomeTaxFee: Number(values.incomeTaxFee),
        usageFee: Number(values.usageFee),
        vat: Number(detailDiscount?.vat),
      }
      updateDiscount({ id: idProgDiscount, body: body }).then(response => {
        if ('data' in response) {
          toast.success('Chỉnh sửa chương trình chiết khấu thành công!')
          navigate('/quan-ly-he-thong/chiet-khau-doi-tac/')
        } else if ('error' in response) {
          toast.error('Chỉnh sửa chương trình thất bại!')
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
        SYSTEM_ROLE_KEY.partnerDiscount,
        'edit',
      ),
    }
  }, [adminInfo])

  const disabledDateApplyStart = (current: any, dateApplyEnd?: any) => {
    return !(
      !isAfter(startOfDay(new Date()), startOfDay(current)) &&
      isAfter(endOfDay(new Date(dateApplyEnd)), endOfDay(current))
    )
  }

  const disabledDateApplyEnd = (current: any, dateApplyStart?: any) => {
    return isAfter(startOfDay(new Date(dateApplyStart)), startOfDay(current))
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-he-thong/chiet-khau-doi-tac">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT CHƯƠNG TRÌNH CHIẾT KHẤU
            </Typography>
          </div>
        </Link>
      </div>
      <Spin spinning={isLoading}>
        <div className="mt-8 pr-5">
          <Form
            layout="vertical"
            onFinish={onFormFinish}
            form={form}
            disabled={
              detailDiscount?.discountStatus === 'C' ||
              detailDiscount?.discountStatus === 'E' ||
              !authorizeStatus.canEdit
            }
          >
            <h3 className="mb-7 font-medium text-sm text-black">
              THÔNG TIN CHUNG
            </h3>
            <Form.Item
              label="Tiêu đề"
              name="name"
              rules={[{ required: true, message: 'Hãy nhập tiêu đề!' }]}
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={5}>
                <Form.Item
                  name="applyFrom"
                  label="Thời gian áp dụng từ ngày"
                  rules={[
                    { required: true, message: 'Hãy nhập thời gian áp dụng!' },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    format="YYYY-MM-DD"
                    disabled={
                      detailDiscount?.discountStatus !== STATUS_DISCOUNT.NEW
                    }
                    disabledDate={current =>
                      disabledDateApplyStart(current, applyTo)
                    }
                    onChange={date => date && setApplyFrom(date)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={{ span: 5, offset: 1 }}>
                <Form.Item
                  name="applyTo"
                  label="Thời gian áp dụng đến ngày"
                  rules={[
                    { required: true, message: 'Hãy nhập thời gian áp dụng!' },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    format="YYYY-MM-DD"
                    disabledDate={current =>
                      disabledDateApplyEnd(current, applyFrom)
                    }
                    onChange={date => date && setApplyTo(date)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={11} md={{ span: 11, offset: 2 }}>
                <Form.Item label="Đối tượng áp dụng" name="contractId">
                  <DebounceSelect
                    optionQuery={useGetContractOpsQuery}
                    convertQueryString={searchString =>
                      searchString
                        ? '?search=' +
                          encodeURIComponent(`name:ilike:%${searchString}%`)
                        : ''
                    }
                    allowClear={true}
                    placeholder="Tất cả đối tượng"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={{ span: 11, offset: 2 }}
                md={{ span: 11, offset: 0 }}
              >
                <Form.Item label="Khu vực áp dụng" name="workingAreaId">
                  <Select
                    className="w-full"
                    options={vietnamCityOps}
                    placeholder="Tất cả khu vực"
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
            <hr className="border-b border-t-0 border-x-0 border-solid border-grayDivider" />
            <h3 className="my-5 font-medium text-sm text-black">
              CÀI ĐẶT CHIẾT KHẤU
            </h3>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={11}>
                <InputPercent
                  lable="Phí sử dụng ứng dụng"
                  name="usageFee"
                  errorMess="Hãy chọn phí sử dụng ứng dụng!"
                  precision={2}
                  onChange={values => {
                    setUsageFeeCal(values)
                    if (priceCal) {
                      calculateFeeDiscount(
                        priceCal,
                        values,
                        Number(incomeTaxFeeCal),
                      )
                    }
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
                <Form.Item label="Thuế giá trị gia tăng" name="vat">
                  <InputNumber addonAfter="%" className="w-full" disabled />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={11}>
                <InputPercent
                  lable="Thuế thu nhập cá nhân"
                  name="incomeTaxFee"
                  errorMess="Hãy chọn thuế thu nhập cá nhân!"
                  precision={2}
                  onChange={values => {
                    setIncomeTaxFeeCal(values)
                    if (priceCal) {
                      calculateFeeDiscount(
                        priceCal,
                        Number(usageFeeCal),
                        values,
                      )
                    }
                  }}
                />
              </Col>
            </Row>
            <p className="text-sm font-normal text-black">
              Nguyên tắc tính thu nhập ròng:....{' '}
            </p>
            <Row gutter={16}>
              <Col
                xs={24}
                sm={24}
                md={13}
                className="bg-yellowBackground px-5 pt-5"
              >
                <p>Ví dụ</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col
                xs={24}
                sm={24}
                md={4}
                className="bg-yellowBackground px-5 pb-5"
              >
                <p>Nhập giá trị chuyến xe</p>
                <InputNumberFormatMoney
                  onChange={(values: any) => {
                    debounceCalculateFee(values)
                    setPriceCal(Number(values))
                  }}
                  disabled={
                    !usageFeeCal || !incomeTaxFeeCal || !authorizeStatus.canEdit
                  }
                  className="w-full rounded"
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={4}
                className="bg-yellowBackground px-5 pb-5"
              >
                <p>Tiền chiết khấu</p>
                <p className="font-bold text-lg mb-0">
                  {discountCal ? numberWithComma(Math.round(discountCal)) : 0}{' '}
                  vnd
                </p>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={5}
                className="bg-yellowBackground px-5 pb-5"
              >
                <p>Giá trị ròng thực thu của đối tác</p>
                <p className="font-bold text-lg mb-0">
                  {driverIncomeCal
                    ? numberWithComma(Math.round(driverIncomeCal))
                    : 0}{' '}
                  vnd
                </p>
              </Col>
            </Row>
            <div className="pb-4 flex justify-end">
              <Button
                onClick={() =>
                  navigate('/quan-ly-he-thong/chiet-khau-doi-tac/')
                }
                disabled={isUpdating}
              >
                Huỷ
              </Button>
              <Button
                type="primary"
                className="ml-4"
                htmlType="submit"
                loading={isUpdating}
              >
                Lưu
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </>
  )
}
export default DetailProgramDiscount

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import InputPercent from '@/components/inputs/InputPercent'
import { toast } from 'react-toastify'
import DatePicker from '@/components/inputs/DatePicker'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  useCalculateDiscountMutation,
  useCreateDiscountMutation,
} from '@/services/discountApi'
import { useGetContractOpsQuery } from '@/services/contractApi'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import { useGetTaxAndFeeSettingQuery } from '@/services/feeApi/fee'
import { debounce } from 'lodash'
import { numberWithComma } from '@/utils/helpers/convert.helper'
import { isAfter, startOfDay } from 'date-fns'
import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'

const { RangePicker } = DatePicker

const DEBOUNCE_TIME = 500

const AddNewProgramDiscount = () => {
  const navigate = useNavigate()
  const [usageFeeCal, setUsageFeeCal] = useState<number>()
  const [incomeTaxFeeCal, setIncomeTaxFeeCal] = useState<number>()
  const [driverIncomeCal, setDriverIncomeCal] = useState<number>()
  const [priceCal, setPriceCal] = useState<number>()
  const [discountCal, setDiscountCal] = useState<number>()
  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: dataTaxAndFee } = useGetTaxAndFeeSettingQuery({})

  const [createDiscount, { isLoading: isCreating }] =
    useCreateDiscountMutation()
  const [calculateDiscount] = useCalculateDiscountMutation()

  const calculateFeeDiscount = (
    price: number,
    usageFee: number,
    incomeTaxFee: number,
  ) => {
    const body = {
      usageFee: Number(usageFee),
      incomeTaxFee: Number(incomeTaxFee),
      price: Number(price),
      vat: Number(dataTaxAndFee?.settings?.VAT),
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
        applyFrom: values?.timeRange && values?.timeRange[0],
        applyTo: values?.timeRange && values?.timeRange[1],
        contractId: values.contractId,
        workingAreaId: values.workingAreaId,
        incomeTaxFee: values.incomeTaxFee,
        usageFee: values.usageFee,
        vat: Number(dataTaxAndFee?.settings?.VAT),
      }
      createDiscount(body).then(response => {
        if ('data' in response) {
          toast.success('Tạo mới chương trình chiết khấu thành công!')
          navigate('/quan-ly-he-thong/chiet-khau-doi-tac/')
        } else if ('error' in response) {
          toast.error('Tạo mới chương trình thất bại!')
        }
      })
    } catch (error) {
      toast.error('Tạo mới chương trình thất bại!')
    }
  }
  const disabledDate = (current: any) => {
    return isAfter(startOfDay(new Date()), startOfDay(current))
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-he-thong/chiet-khau-doi-tac">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              TẠO CHƯƠNG TRÌNH CHIẾT KHẤU
            </Typography>
          </div>
        </Link>
      </div>
      <div className="mt-8 pr-5">
        <Form layout="vertical" onFinish={onFormFinish}>
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
            <Col xs={24} sm={24} md={11}>
              <Form.Item
                name="timeRange"
                label="Thời gian áp dụng (từ - đến)"
                rules={[
                  { required: true, message: 'Hãy nhập thời gian áp dụng!' },
                ]}
              >
                <RangePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
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
              <Form.Item label="Thuế giá trị gia tăng">
                <InputNumber
                  value={dataTaxAndFee?.settings?.VAT}
                  addonAfter="%"
                  className="w-full"
                  disabled
                />
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
                    calculateFeeDiscount(priceCal, Number(usageFeeCal), values)
                  }
                }}
              />
            </Col>
          </Row>
          <p className="text-sm font-normal text-black mb-2">
            Nguyên tắc tính thu nhập ròng: ....{' '}
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
                disabled={!usageFeeCal || !incomeTaxFeeCal}
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
                {discountCal ? numberWithComma(Math.round(discountCal)) : 0} vnd
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
              onClick={() => navigate('/quan-ly-he-thong/chiet-khau-doi-tac/')}
              disabled={isCreating}
            >
              Huỷ
            </Button>
            <Button
              type="primary"
              className="ml-4"
              htmlType="submit"
              loading={isCreating}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default AddNewProgramDiscount

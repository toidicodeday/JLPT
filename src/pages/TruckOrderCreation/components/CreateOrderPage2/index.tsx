import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Radio,
  AutoComplete,
} from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetExpectFeeMutation,
  useGetPromoListQuery,
} from '@/services/feeApi/fee'
import { useGetPaymentMethodQuery } from '@/services/systemApi/system'
import { PaymentMethodExpectType } from '@/services/systemApi/types'
import { useUpdateOrderDetailsMutation } from '@/services/orderApi/order'
import { OrderDetailsType } from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { getBillTotal } from '@/utils/helpers/convert.helper'
import { get } from 'lodash'
import { format } from 'date-fns'

const { Option } = Select

interface Props {
  handleSubmit: (value: any) => void
  setIsNextPage: (type: boolean) => void
  page1Data: any
  orderDetails?: OrderDetailsType
}

const TruckOrderCreatePage2 = (props: Props) => {
  const [selectedVoucher, setSelectedVoucher] = React.useState<string>('')
  const [isInitForm, setIsInitForm] = React.useState<boolean>(true)

  const { data: paymentMethodList } = useGetPaymentMethodQuery()
  const { data: voucherList } = useGetPromoListQuery({
    query: `?page=1&limit=10&search=${encodeURIComponent(
      `[[[applyFrom:<=:${format(new Date(), 'yyyy-MM-dd')};applyTo:>=:${format(
        new Date(),
        'yyyy-MM-dd',
      )}]|[applyFrom:=:null;applyTo:=:null]]]`,
    )}`,
  })

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [updateOrderDetails, { isLoading: isUpdating }] =
    useUpdateOrderDetailsMutation()
  const [getExpectFee, { isLoading: isGettingFee }] = useGetExpectFeeMutation()

  const exptBill = useMemo(() => {
    if (
      props?.orderDetails?.bills &&
      props?.orderDetails?.bills?.filter(i => i.type === 'EXPT') &&
      props?.orderDetails?.bills?.filter(i => i.type === 'EXPT').length > 0
    ) {
      return props?.orderDetails?.bills?.filter(i => i.type === 'EXPT')[0]
    } else return undefined
  }, [props?.orderDetails?.bills])
  const paymentMethodOps = useMemo(() => {
    return paymentMethodList?.filter(i => !i.label.includes('VNPAY'))
  }, [paymentMethodList])

  //handle submit
  const handleApplyPromo = async () => {
    try {
      if (exptBill) {
        const getExpectFeeRes = await getExpectFee({
          promoCode: selectedVoucher,
          orderCode: props?.orderDetails?.code,
          expectFee: [
            ...exptBill.billDetails
              ?.filter(item => item?.key !== 'PRM' && item?.key !== 'TAX')
              ?.map(item => ({
                key: item?.key,
                type: item?.type,
                name: item?.name,
                price: Number(item?.price),
                quantity: Number(item?.quantity),
              })),
          ],
        })
        if ('data' in getExpectFeeRes) {
          const updateOrderRes = await updateOrderDetails({
            id: props?.orderDetails?.code,
            body: {
              promoCode: selectedVoucher,
              price: getBillTotal(getExpectFeeRes?.data?.data),
              bill: {
                id: exptBill.id,
                note: exptBill ? 'Update expt bill' : 'Create expt bill',
                type: 'EXPT',
                billDetails: [
                  ...getExpectFeeRes?.data?.data?.filter(
                    (item: any) => item?.key !== 'TAX' && item?.key !== 'PRM',
                  ),
                  ...getExpectFeeRes?.data?.data
                    ?.filter(
                      (item: any) => item?.key === 'TAX' || item?.key === 'PRM',
                    )
                    ?.map((item: any) => ({
                      key: item?.key,
                      type: item?.key,
                      name: item?.name,
                      quantity: item?.quantity,
                      price: item?.price,
                    })),
                ],
              },
            },
          })
          if ('data' in updateOrderRes) {
            toast.success('Áp dụng mã khuyến mại thành công')
            setSelectedVoucher('')
          }
          if ('error' in updateOrderRes) {
            toast.error(
              get(updateOrderRes.error, 'data.error.message') ||
                'Áp dụng mã khuyến mại có lỗi',
            )
            setSelectedVoucher('')
          }
        }
        if ('error' in getExpectFeeRes) {
          const systemErrMess = get(getExpectFeeRes.error, 'data.error.message')
          toast.error(systemErrMess ? systemErrMess : MESSAGES.CALL_API_ERROR)
        }
      }
    } catch (error) {
      toast.error(
        get(error, 'data.error.message') || 'Áp mã khuyến mãi có lỗi!',
      )
    }
  }
  const handleSetInitValue = useCallback(() => {
    if (isInitForm) {
      if (props.orderDetails) {
        form.setFieldValue(
          'payType',
          props.orderDetails?.payType ? props.orderDetails.payType : undefined,
        )
        form.setFieldValue(
          'payDetailType',
          props.orderDetails?.payDetailType
            ? props.orderDetails.payDetailType
            : '',
        )
        setIsInitForm(false)
      }
    }
  }, [form, isInitForm, props.orderDetails])
  const onFinish = async (values: any) => {
    try {
      const updateOrderRes = await updateOrderDetails({
        id: props?.orderDetails?.code,
        body: {
          payType: values['paymentType'],
          payDetailType: values['payDetailType'],
          status: 1,
          driverFinding: props?.orderDetails?.pickupType === 0 ? true : false,
        },
      })
      if ('data' in updateOrderRes) {
        toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
        navigate('/chuyen-hang/taxi-tai')
      }
      if ('error' in updateOrderRes)
        toast.error(
          get(updateOrderRes.error, 'data.error.message') ||
            MESSAGES.CALL_API_ERROR,
        )
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const handleCancel = () => {
    navigate('/chuyen-hang/taxi-tai/')
  }

  useEffect(() => {
    handleSetInitValue()
  }, [handleSetInitValue])

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Typography className="font-bold mt-4">Hoá đơn</Typography>
          <div className="p-2 border border-solid border-grayButton rounded-md mt-2 bg-[#f5f5f58a]">
            <Row gutter={16}>
              <Col span={18}>
                <Typography className="font-bold">Phí giao hàng</Typography>
              </Col>
              <Col span={6}></Col>
            </Row>
            {exptBill && (
              <>
                {exptBill?.billDetails
                  ?.filter(i => i?.key !== 'PRM')
                  ?.map((item, index) => {
                    return (
                      <Row gutter={16} key={item?.id} className="mt-1">
                        <Col span={18}>
                          <Typography>
                            {item?.name}{' '}
                            {item.key === 'VC'
                              ? `${props.orderDetails?.distance} km`
                              : ''}
                          </Typography>
                        </Col>
                        <Col span={6}>
                          <Typography className="font-bold">
                            {Number(item?.price).toLocaleString('en-US')}
                          </Typography>
                        </Col>
                      </Row>
                    )
                  })}
                {exptBill &&
                  exptBill?.billDetails?.filter(i => i?.key === 'PRM') && (
                    <Row gutter={16} className="mt-1">
                      <Col span={18}>
                        <Typography>
                          {`Khuyến mãi ${
                            props.orderDetails?.promoCode
                              ? `[${props.orderDetails?.promoCode}]`
                              : ''
                          } `}
                        </Typography>
                      </Col>
                      <Col span={6}>
                        <Typography className="font-bold">
                          {Number(
                            exptBill?.billDetails?.filter(
                              i => i?.key === 'PRM',
                            )[0].price,
                          ).toLocaleString('en-US')}
                        </Typography>
                      </Col>
                    </Row>
                  )}
              </>
            )}
            <Divider className="my-2" />
            <Row gutter={16}>
              <Col span={18}>
                <Typography>Tổng</Typography>
              </Col>
              <Col span={6}>
                <Typography className="font-bold">
                  {props?.orderDetails?.price
                    ? Number(props?.orderDetails?.price).toLocaleString('en-US')
                    : ''}
                </Typography>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <Typography className="font-bold mt-4">
            Hình thức thanh toán
          </Typography>
          <Form.Item
            label=""
            name="paymentType"
            className="mt-2"
            rules={[
              {
                required: true,
                message: 'Hãy chọn hình thức thanh toán',
              },
            ]}
            initialValue={
              props.orderDetails?.payType
                ? props.orderDetails?.payType
                : undefined
            }
          >
            <Select placeholder="Chọn hình thức thanh toán">
              {paymentMethodOps?.map((item: PaymentMethodExpectType) => {
                return (
                  <Option value={item.value} key={item.id}>
                    {item.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="payDetailType"
            rules={[
              {
                required: true,
                message: 'Hãy chọn hình thức tính phí',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={0}>Trả phí theo app</Radio>
              <Radio value={1}>Trả phí theo đồng hồ taximét</Radio>
            </Radio.Group>
          </Form.Item>
          <Typography className="font-bold mt-4">Nhập mã khuyến mại</Typography>
          <Form.Item className="mt-2" name="selectedPromo">
            <Input.Group compact className="flex">
              <AutoComplete
                className="flex-1"
                onChange={(value: string) => setSelectedVoucher(value)}
                value={selectedVoucher}
              >
                {voucherList?.data?.map((item: any) => (
                  <Option
                    key={item?.id}
                    value={item?.code}
                    style={{ height: '60px', alignItems: 'center' }}
                  >
                    <div className="w-full flex">
                      <div className="text-primary font-bold overflow-hidden w-20">
                        {item?.code}
                      </div>
                      <Divider type="vertical" />
                      <div className="flex-1">
                        <div className="font-bold text-sm">
                          Giảm giá{' '}
                          {item?.discountType !== 'RATE' && (
                            <span>tổng số tiền </span>
                          )}
                          {item?.discount
                            ? Number(item?.discount).toLocaleString('en-US')
                            : ''}{' '}
                          {item?.discountType === 'RATE' ? '%' : 'vnd'}
                        </div>
                        <div className="text-xs text-[#9D9999]">
                          Giảm giá tối đa{' '}
                          {item?.maxDiscount
                            ? Number(item?.maxDiscount).toLocaleString('en-US')
                            : ''}
                          k
                        </div>
                      </div>
                    </div>
                  </Option>
                ))}
              </AutoComplete>
              <Button
                type="primary"
                onClick={() => {
                  handleApplyPromo()
                }}
                disabled={selectedVoucher === ''}
                loading={isGettingFee || isUpdating}
              >
                Áp dụng
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <Divider className="my-2" />
      <div className="flex justify-end">
        <Button onClick={handleCancel}>Huỷ</Button>
        <Button
          type="primary"
          className="ml-2"
          htmlType="submit"
          loading={isUpdating}
        >
          Tiếp tục
        </Button>
      </div>
    </Form>
  )
}

export default TruckOrderCreatePage2

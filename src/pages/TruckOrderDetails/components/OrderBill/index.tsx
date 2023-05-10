import ImageGroup from '@/components/Order/ImageGroup'
import {
  OrderBillDetailsType,
  OrderBillType,
  OrderDetailsType,
} from '@/services/orderApi/types'
import { useGetPaymentMethodQuery } from '@/services/systemApi/system'
import {
  PAY_DETAILS_TYPE,
  STATUS_ORDER,
  TAXI_ORDER_CONTRACT_TYPE,
} from '@/utils/constant/constant'
import {
  formatDateTimeRequest,
  getBillTotal,
  getLabelFromOps,
} from '@/utils/helpers/convert.helper'
import Icon from '@ant-design/icons'
import { Button, Col, Divider, Row, Spin, Tag, Tooltip, Typography } from 'antd'
import { isNumber } from 'lodash'
import React, { useMemo } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { FaMoneyBill } from 'react-icons/fa'
import { MdCheckCircle, MdPayment, MdRefresh } from 'react-icons/md'
import { RiBillFill } from 'react-icons/ri'

interface Props {
  data?: OrderDetailsType
  isLoadingDetails?: boolean
  refetchOrder: () => void
}

const OrderBill = (props: Props) => {
  const { data: paymentMethodList } = useGetPaymentMethodQuery()
  const EXPTBill = useMemo(() => {
    const ExptBillArr = props?.data?.bills?.filter(
      (item: OrderBillType) => item?.type === 'EXPT',
    )
    if (ExptBillArr && ExptBillArr?.length > 0) {
      return ExptBillArr[0]?.billDetails?.filter(
        item => Number(item?.price) > 0,
      )
    }
    return []
  }, [props?.data?.bills])
  const ACTLBill = useMemo(() => {
    const actlBillArr = props?.data?.bills?.filter(
      (item: OrderBillType) => item?.type === 'ACTL',
    )
    if (actlBillArr && actlBillArr?.length > 0) {
      return actlBillArr[0]
    }
    return null
  }, [props?.data?.bills])
  const paymentMethod = useMemo(() => {
    return {
      payType:
        props?.data?.payType && paymentMethodList
          ? getLabelFromOps(props?.data?.payType, paymentMethodList)
          : 'Chưa có thông tin',
      payDetailType: isNumber(props?.data?.payDetailType)
        ? getLabelFromOps(props?.data?.payDetailType, PAY_DETAILS_TYPE)
        : 'Chưa có thông tin',
    }
  }, [props?.data, paymentMethodList])

  return (
    <Spin spinning={props?.isLoadingDetails}>
      <>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4">
            <Icon
              component={RiBillFill}
              style={{ color: '#F99233', fontSize: 20 }}
            />
            <Typography className="font-bold ml-2">Hoá đơn</Typography>
          </div>
          <Tooltip title="Làm mới" placement="topRight">
            <Button
              icon={<MdRefresh className="text-xl" />}
              className="flex items-center justify-center ml-2"
              onClick={() => props.refetchOrder()}
              loading={props.isLoadingDetails}
            />
          </Tooltip>
        </div>
        {EXPTBill?.length > 0 && (
          <div className="p-4 border border-solid border-grayButton rounded-md mt-2 bg-grayButton">
            <Typography className="font-bold">Phí giao hàng dự kiến</Typography>
            {EXPTBill?.map(item => (
              <Row gutter={[8, 8]} key={item?.id} className="mt-2">
                <Col span={15} xl={8}>
                  <Typography>
                    {`${item?.name} ${
                      item?.key === 'VC' ? `${props?.data?.distance} km` : ''
                    }`}
                  </Typography>
                </Col>
                <Col span={9} xl={8}>
                  <Typography>
                    {item?.price && Number(item?.price).toLocaleString('en-US')}{' '}
                    đ
                  </Typography>
                </Col>
              </Row>
            ))}
            <Divider className="my-2" />
            <Row gutter={[8, 8]} className="mt-1">
              <Col span={15} xl={8} className="flex items-center">
                <Typography className="font-bold">Tổng</Typography>
              </Col>
              <Col span={9} xl={8}>
                <Typography className="font-bold text-[#D32F2F]">
                  {`${getBillTotal(EXPTBill)?.toLocaleString('en-US')} đ`}
                </Typography>
              </Col>
              <Col span={8}></Col>
            </Row>
          </div>
        )}
        {!EXPTBill ||
          (EXPTBill?.length === 0 && (
            <div className="mt-2">Chưa có thông tin hóa đơn</div>
          ))}
        <div className="flex items-center mt-4">
          <Icon
            component={MdPayment}
            style={{ color: '#F99233', fontSize: 20 }}
          />
          <Typography className="font-bold ml-2">
            Hình thức thanh toán
          </Typography>
        </div>
        <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
          <div className="flex items-center">
            <Icon
              component={FaMoneyBill}
              style={{ color: '#35703B', fontSize: 16 }}
            />
            <Typography className="ml-2">{[paymentMethod.payType]}</Typography>
          </div>
          <div className="flex items-center mt-1">
            <Icon
              component={MdCheckCircle}
              style={{ color: '#59AFFF', fontSize: 16 }}
            />
            <Typography className="ml-2">
              {paymentMethod.payDetailType}
            </Typography>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Icon
            component={RiBillFill}
            style={{ color: '#F99233', fontSize: 20 }}
          />
          <Typography className="font-bold ml-2">Hoá đơn từ tài xế</Typography>
        </div>
        {ACTLBill && (
          <div>
            <Typography className="mt-1">
              {`Cập nhật lần cuối bởi tài xế ${
                ACTLBill?.driver?.name
              } lúc ${formatDateTimeRequest(ACTLBill?.updatedAt)}`}
            </Typography>
            <div className="p-4 border border-solid border-grayButton rounded-md mt-2 bg-redBackground">
              <Typography className="font-bold">Phí giao hàng</Typography>
              {ACTLBill?.billDetails
                ?.filter(item => item.key !== 'EXTM' && item.key !== 'EXTH')
                ?.filter(item => Number(item.price) > 0)
                ?.map((item: OrderBillDetailsType, index: number) => (
                  <Row gutter={[8, 8]} key={item?.id} className="mt-2">
                    <Col span={15} xl={8}>
                      <Typography>
                        {`${item?.name} ${
                          item?.key === 'VC'
                            ? `${props?.data?.distance} km`
                            : ''
                        }`}
                      </Typography>
                    </Col>
                    <Col span={9} xl={8}>
                      <Typography>
                        {item?.price &&
                          Number(item?.price).toLocaleString('en-US')}{' '}
                        đ
                      </Typography>
                    </Col>
                  </Row>
                ))}
              <Divider className="my-2" />
              <Row gutter={[8, 8]} className="mt-1">
                <Col span={15} xl={8} className="flex items-center">
                  <Typography className="font-bold">Tổng</Typography>
                  {props?.data?.isPayment ? (
                    <Tag color="#35703B" className="ml-2">
                      Đã thanh toán
                    </Tag>
                  ) : (
                    <Tag color="#D32F2F" className="ml-2">
                      Chưa thanh toán
                    </Tag>
                  )}
                </Col>
                <Col span={9} xl={8}>
                  <Typography className="font-bold text-[#D32F2F]">
                    {`${getBillTotal(
                      ACTLBill?.billDetails?.filter(
                        item => item.key !== 'EXTM' && item.key !== 'EXTH',
                      ),
                    )?.toLocaleString('en-US')} đ`}
                  </Typography>
                </Col>
              </Row>
            </div>
          </div>
        )}
        {!ACTLBill && (
          <div className="mt-2">Chưa có thông tin hóa đơn từ tài xế</div>
        )}
        {ACTLBill && (
          <div className="mt-4">
            <p className="mb-2">Hình ảnh đính kèm</p>
            <ImageGroup driverImages={ACTLBill?.imageProof} />
            <p className="pt-8">{`Ghi chú tài xế: ${ACTLBill?.note}`}</p>
          </div>
        )}
        {props?.data?.status === STATUS_ORDER.COMPLETE && (
          <React.Fragment>
            <div className="flex items-center mt-4">
              <Icon
                component={AiFillClockCircle}
                style={{ color: '#F99233', fontSize: 20 }}
              />
              <Typography className="font-bold ml-2">
                Thông tin đồng hồ
              </Typography>
            </div>
            <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
              <Row className="mt-1" gutter={[8, 8]}>
                <Col span={15} xl={8}>
                  Số tiền đồng hồ taximet
                </Col>
                <Col span={9} xl={8}>
                  {props?.data?.taximetPrice
                    ? Number(props?.data?.taximetPrice).toLocaleString('en-US')
                    : 'Chưa có thông tin'}
                </Col>
              </Row>
              {props?.data?.contractType ===
                TAXI_ORDER_CONTRACT_TYPE.CONTRACT && (
                <React.Fragment>
                  <Row className="mt-1" gutter={[8, 8]}>
                    <Col span={15} xl={8}>
                      Chốt ĐH cơ tại điểm đón hàng
                    </Col>
                    <Col span={9} xl={8}>
                      {props?.data?.taximetAtOriginPoint
                        ? Number(
                            props?.data?.taximetAtOriginPoint,
                          ).toLocaleString('en-US')
                        : 'Chưa có thông tin'}
                    </Col>
                  </Row>
                  <Row className="mt-1" gutter={[8, 8]}>
                    <Col span={15} xl={8}>
                      Chốt ĐH cơ tại điểm trả hàng
                    </Col>
                    <Col span={9} xl={8}>
                      {props?.data?.taximetAtDestinationPoint
                        ? Number(
                            props?.data?.taximetAtDestinationPoint,
                          ).toLocaleString('en-US')
                        : 'Chưa có thông tin'}
                    </Col>
                  </Row>
                  <Row className="mt-1" gutter={[8, 8]}>
                    <Col span={15} xl={8}>
                      Chốt ĐH khi xe về đến địa phận thành phố
                    </Col>
                    <Col span={9} xl={8}>
                      {props?.data?.taximetAtLastPoint
                        ? Number(
                            props?.data?.taximetAtLastPoint,
                          ).toLocaleString('en-US')
                        : 'Chưa có thông tin'}
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </>
    </Spin>
  )
}

export default OrderBill

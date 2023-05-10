import {
  Button,
  Col,
  Divider,
  Form,
  Row,
  Typography,
  Checkbox,
  Spin,
} from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import '../../styles.scss'
import { get, isNumber, orderBy } from 'lodash'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { ChildServiceType, ServiceType } from '@/services/serviceApi/types'
import { useGetServiceListQuery } from '@/services/serviceApi/service'
import {
  OrderDetailsType,
  OrderLocationType,
  OrderProductType,
} from '@/services/orderApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { useUpdateOrderDetailsMutation } from '@/services/orderApi/order'
import { useGetLocationDistanceMutation } from '@/services/mapApi/map'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import SendInfo from '@/components/Order/SendInfo'
import ReceiveInfo from '@/components/Order/ReceiveInfo'
import {
  checkExistenceInArr,
  formatPhone,
  getBillTotal,
  getDistanceFromMap,
  getLatLongStr,
} from '@/utils/helpers/convert.helper'
import {
  useGetExpectFeeMutation,
  useGetTransportFeeMutation,
} from '@/services/feeApi/fee'
import GuestInfoSelection from '@/components/Order/GuestInfoSelection'
import { useLazyGetOneCustomerQuery } from '@/services/customerApi'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import DebounceSelect from '@/components/inputs/DebounceSelect'

const CheckboxGroup = Checkbox.Group

interface Props {
  handleSubmit: (value: any) => void
  setIsNextPage: React.Dispatch<React.SetStateAction<boolean>>
  orderDetails: OrderDetailsType | undefined
  isLoadingOrderDetails: boolean
}

export interface ServiceOpsType extends ChildServiceType {
  child: ChildServiceOpsType[]
}

export interface ChildServiceOpsType extends ChildServiceType {
  label: string
  value: string | number
}

const TruckOrderCreatePage1 = (props: Props) => {
  const [form1] = Form.useForm()
  const [selectedService, setSelectedService] = React.useState<
    { key: number; name: string; price: number }[]
  >([])
  const [guestInfo, setGuestInfo] = React.useState<{
    id: number
    name: string
    phone: string
  } | null>(null)
  const [detailCategorySelected, setDetailCategorySelected] = useState('')
  const { data: serviceList } = useGetServiceListQuery(
    {
      query: `?search=parentId:=:${props?.orderDetails?.serviceId}`,
    },
    { skip: !isNumber(props?.orderDetails?.serviceId) },
  )
  const serviceListOps: ServiceOpsType[] = useMemo(() => {
    return serviceList
      ? serviceList?.map(i => ({
          label: i.name,
          value: i.id,
          ...i,
          child: i.child.map(child => ({
            label: child.name,
            value: child.id,
            ...child,
          })),
        }))
      : []
  }, [serviceList])
  const sendAddress: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(
      props?.orderDetails?.orderLocations,
      'sort',
      'asc',
    )
    return sortedLocations.slice(0, 1) || []
  }, [props?.orderDetails?.orderLocations])
  const receiveAddress: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(
      props?.orderDetails?.orderLocations,
      'sort',
      'asc',
    )
    return sortedLocations.slice(1) || []
  }, [props?.orderDetails?.orderLocations])
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [updateOrderDetails, { isLoading: isUpdating }] =
    useUpdateOrderDetailsMutation()
  const [getLocationDistance, { isLoading: isGettingDistance }] =
    useGetLocationDistanceMutation()
  const [getTransportFee, { isLoading: isGettingTransFee }] =
    useGetTransportFeeMutation()
  const [getExpectFee, { isLoading: isGettingExpectFee }] =
    useGetExpectFeeMutation()
  const [getOneGuest, { isLoading: isLoadingGuestInfo }] =
    useLazyGetOneCustomerQuery()

  const navigate = useNavigate()

  const exptBill = useMemo(() => {
    if (
      props?.orderDetails?.bills &&
      props?.orderDetails?.bills?.filter(i => i.type === 'EXPT') &&
      props?.orderDetails?.bills?.filter(i => i.type === 'EXPT').length > 0
    ) {
      return props?.orderDetails?.bills?.filter(i => i.type === 'EXPT')[0]
    } else return undefined
  }, [props?.orderDetails?.bills])

  //handle form
  const onFinish = async (values: any) => {
    try {
      const distanceStr = getLatLongStr(props?.orderDetails?.orderLocations)
      if (distanceStr) {
        const getDistanceRes = await getLocationDistance(distanceStr)
        if ('data' in getDistanceRes) {
          const distance = getDistanceFromMap(getDistanceRes?.data?.rows)
          if (distance) {
            const getTransportFeeRes = await getTransportFee({
              vehicleCategoryId: values['vehicleType'],
              distance: Number(Math.round(distance / 100) / 10),
            })
            if ('data' in getTransportFeeRes) {
              const getExpectFeeRes = await getExpectFee({
                promoCode: '',
                orderCode: props?.orderDetails?.code,
                expectFee: [
                  {
                    key: 'VC',
                    type: 'VC',
                    name: 'Phí vận chuyển',
                    quantity: 1,
                    price: getTransportFeeRes?.data?.data,
                  },
                  ...selectedService?.map(item => ({
                    key: item.key,
                    type: 'DV',
                    name: item.name,
                    quantity: 1,
                    price: item.price,
                  })),
                ],
              })
              if ('data' in getExpectFeeRes) {
                const updateOrderBillBodyWoId = {
                  orderCode: props?.orderDetails?.code,
                  note: exptBill ? 'Update expt bill' : 'Create expt bill',
                  type: 'EXPT',
                  billDetails: [
                    ...getExpectFeeRes?.data?.data?.filter(
                      (item: any) => item?.key !== 'TAX' && item?.key !== 'PRM',
                    ),
                    ...getExpectFeeRes?.data?.data
                      ?.filter(
                        (item: any) =>
                          item?.key === 'TAX' || item?.key === 'PRM',
                      )
                      ?.map((item: any) => ({
                        key: item?.key,
                        type: item?.key,
                        name: item?.name,
                        quantity: item?.quantity,
                        price: item?.price,
                      })),
                  ],
                }
                const updateOrderResponse = await updateOrderDetails({
                  id: props.orderDetails?.code,
                  body: {
                    orderVehicleCategories: [{ id: values['vehicleType'] }],
                    distance: Number(Math.round(distance / 100) / 10),
                    products: selectedService?.map(item => ({
                      id: item.key,
                    })),
                    price: getBillTotal(getExpectFeeRes?.data?.data),
                    guestId: guestInfo ? guestInfo?.id : null,
                    bill: exptBill
                      ? {
                          id: exptBill.id,
                          ...updateOrderBillBodyWoId,
                        }
                      : updateOrderBillBodyWoId,
                  },
                })
                if ('data' in updateOrderResponse) {
                  props.setIsNextPage(() => true)
                }
                if ('error' in updateOrderResponse) {
                  toast.error(
                    get(updateOrderResponse.error, 'data.error.message') ||
                      MESSAGES.CALL_API_ERROR,
                  )
                }
              }
              if ('error' in getExpectFeeRes)
                toast.error(
                  get(getExpectFeeRes.error, 'data.error.message') ||
                    MESSAGES.CALL_API_ERROR,
                )
            }
            if ('error' in getTransportFeeRes)
              toast.error(
                get(getTransportFeeRes.error, 'data.error.message') ||
                  MESSAGES.CALL_API_ERROR,
              )
          } else {
            toast.error(MESSAGES.CALL_API_ERROR)
          }
        }
        if ('error' in getDistanceRes)
          toast.error(
            get(getDistanceRes.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const onFinishFail = () => {
    setIsValidating(true)
  }
  const handleCancel = () => {
    navigate('/chuyen-hang/taxi-tai/')
  }
  const handleGetGuestDetails = useCallback(async () => {
    if (props.orderDetails?.guestId) {
      const getGuestRes = await getOneGuest({
        id: props.orderDetails?.guestId,
      })
      if ('data' in getGuestRes) {
        setGuestInfo({
          id: props.orderDetails?.guestId,
          name: getGuestRes?.data?.name ? getGuestRes?.data?.name : '',
          phone: getGuestRes?.data?.phone ? getGuestRes?.data?.phone : '',
        })
      }
    }
  }, [getOneGuest, props.orderDetails?.guestId])
  const handleGroupProductsByParentId = useCallback(
    (productArr: OrderProductType[]) => {
      return productArr.reduce(
        (
          total: { parentId: number; children: OrderProductType[] }[],
          item: OrderProductType,
        ) => {
          if (
            checkExistenceInArr(item, total, 'parentId') &&
            item.parentId !== props?.orderDetails?.serviceId
          ) {
            return total.map(i => {
              if (i.parentId === item.parentId) {
                return {
                  ...i,
                  children: [...i.children, item],
                }
              } else return i
            })
          } else {
            return [
              ...total,
              {
                parentId: item.parentId,
                children: [item],
              },
            ]
          }
        },
        [],
      )
    },
    [props?.orderDetails?.serviceId],
  )
  const handleSetInit = useCallback(() => {
    if (props.orderDetails) {
      if (
        props.orderDetails?.orderVehicleCategories &&
        props.orderDetails.orderVehicleCategories?.length > 0
      ) {
        form1.setFieldValue(
          'vehicleType',
          props.orderDetails.orderVehicleCategories[0]?.id,
        )
        setDetailCategorySelected(`Dài ${props?.orderDetails?.orderVehicleCategories?.[0]?.length}, Rộng ${props?.orderDetails?.orderVehicleCategories?.[0]?.width}, Cao ${props?.orderDetails?.orderVehicleCategories?.[0]?.height},
        Thể tích ${props?.orderDetails?.orderVehicleCategories?.[0]?.capacity} (m3)`)
      }
      if (
        props?.orderDetails?.products &&
        props?.orderDetails?.products?.length > 0
      ) {
        setSelectedService(
          props.orderDetails.products.map(i => ({
            key: i.id,
            name: i.name,
            price: Number(i.price),
          })),
        )
        const convertedProducts = handleGroupProductsByParentId(
          props.orderDetails.products,
        )
        for (let i = 0; i < convertedProducts.length; i++) {
          if (convertedProducts[i].parentId === props.orderDetails?.serviceId) {
            form1.setFieldValue(
              `parentService-${convertedProducts[i].children[0].id}`,
              true,
            )
            form1.setFieldValue(
              `childService-${convertedProducts[i].children?.[0].id}`,
              serviceListOps
                ?.filter(
                  c => c.id === convertedProducts[i].children?.[0].id,
                )?.[0]
                ?.child?.map((c: any) => c.value),
            )
          } else {
            form1.setFieldValue(
              `parentService-${convertedProducts[i].children[0].id}`,
              false,
            )
            form1.setFieldValue(
              `childService-${convertedProducts[i].parentId}`,
              convertedProducts[i].children.map(c => c.id),
            )
          }
        }
      }
    }
  }, [form1, handleGroupProductsByParentId, props.orderDetails, serviceListOps])
  const handleParentSerChange = (
    formName: string,
    value: number[],
    currStatus: boolean,
    parentId: ServiceType,
    childIds: { [key: string]: any }[],
  ) => {
    const selectedServiceWoCurrId = selectedService.filter(
      i => i.key !== parentId.id && !childIds.map(i => i.value).includes(i.key),
    )
    setSelectedService(
      currStatus
        ? [
            ...selectedServiceWoCurrId,
            {
              key: parentId.id,
              name: parentId.name,
              price: parentId.price,
            },
          ]
        : selectedServiceWoCurrId,
    )
    form1.setFieldValue(formName, value)
  }
  const handleGroupChange = (
    formName: string,
    setFormValue: boolean,
    currValue: CheckboxValueType[],
    parentId: ServiceType,
    childIds: { [key: string]: any }[],
  ) => {
    const selectedServiceWoCurrId = selectedService.filter(
      i => i.key !== parentId.id && !childIds.map(i => i.value).includes(i.key),
    )
    if (setFormValue)
      setSelectedService([
        ...selectedServiceWoCurrId,
        {
          key: parentId.id,
          name: parentId.name,
          price: parentId.price,
        },
      ])
    else
      setSelectedService([
        ...selectedServiceWoCurrId,
        ...childIds
          .filter(c => currValue.includes(c.id))
          .map(c => ({
            key: c.id,
            name: c.name,
            price: c.price,
          })),
      ])
    form1.setFieldValue(formName, setFormValue)
  }

  useEffect(() => {
    handleGetGuestDetails()
  }, [handleGetGuestDetails])
  useEffect(() => {
    handleSetInit()
  }, [handleSetInit])

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFail}
      layout="vertical"
      form={form1}
      validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
    >
      <Typography className="font-bold mt-4">Thông tin khách hàng</Typography>
      {!guestInfo && (
        <div className="mt-2 px-2 py-3 border border-solid border-grayButton rounded">
          <Row gutter={8}>
            <Col span={24} md={12} lg={10} xl={8}>
              <GuestInfoSelection setGuestInfo={setGuestInfo} />
            </Col>
          </Row>
        </div>
      )}
      {guestInfo && (
        <Spin spinning={isLoadingGuestInfo}>
          <div className="p-2 border border-solid border-grayButton rounded-md mt-2 bg-[#f5f5f58a] flex items-center justify-between">
            <div>{`ID: ${guestInfo.id} - ${guestInfo.name} - ${formatPhone(
              guestInfo.phone,
            )}`}</div>
            <Button onClick={() => setGuestInfo(null)}>Chọn lại</Button>
          </div>
        </Spin>
      )}
      <Typography className="font-bold mt-4">Thông tin nhận hàng</Typography>
      <Form.Item
        name="sendAdd"
        rules={[
          {
            validator() {
              if (sendAddress) {
                return Promise.resolve()
              }
              return Promise.reject()
            },
          },
        ]}
        help={
          isValidating && !sendAddress ? (
            <p className="text-[#EF4444]">{MESSAGES.REQUIRED_ERROR}</p>
          ) : null
        }
      >
        <SendInfo
          orderCode={props?.orderDetails?.code}
          initialValues={sendAddress?.[0]}
          initialPickupType={props?.orderDetails?.pickupType}
          initialPickupDate={props?.orderDetails?.pickupDate}
          orderType="tx"
          isLoadingOrderDetails={props.isLoadingOrderDetails}
        />
      </Form.Item>
      <Typography className="font-bold mt-4">Thông tin trả hàng</Typography>
      <Form.Item
        name="receiveAdd"
        rules={[
          {
            validator() {
              if (receiveAddress) {
                return Promise.resolve()
              }
              return Promise.reject()
            },
          },
        ]}
        help={
          isValidating && !receiveAddress ? (
            <p className="text-[#EF4444]">{MESSAGES.REQUIRED_ERROR}</p>
          ) : null
        }
      >
        <ReceiveInfo
          orderCode={props?.orderDetails?.code}
          initialValues={receiveAddress}
          isLoadingOrderDetails={props.isLoadingOrderDetails}
        />
      </Form.Item>
      <Divider />
      <Typography className="font-bold">Chọn xe và dịch vụ</Typography>
      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <div>Danh sách xe</div>
          <div className="mt-2 p-2 border border-solid border-grayButton">
            <Form.Item
              label="Chọn loại xe"
              name="vehicleType"
              rules={[{ required: true, message: 'Hãy chọn loại xe!' }]}
            >
              <DebounceSelect
                optionQuery={useGetVehicleCategoryOpsQuery}
                convertQueryString={searchString =>
                  searchString
                    ? '?search=' +
                      encodeURIComponent(`name:ilike:%${searchString}%`)
                    : ''
                }
                onChange={(_, option) => {
                  if (!Array.isArray(option)) {
                    setDetailCategorySelected(`Dài ${option?.raw?.length}, Rộng ${option?.raw?.width}, Cao ${option?.raw?.height},
      Thể tích ${option?.raw?.capacity} (m3)`)
                  }
                }}
              />
            </Form.Item>
            <p className="pl-2">{detailCategorySelected}</p>
          </div>
        </Col>
        <Col span={12}>
          <Typography>Danh sách dịch vụ</Typography>
          <div className="mt-2 p-2 border border-solid border-grayButton">
            {serviceListOps?.map(item => (
              <>
                <Form.Item
                  name={`parentService-${item.id}`}
                  valuePropName="checked"
                  className="my-0"
                >
                  <Checkbox
                    onChange={e =>
                      handleParentSerChange(
                        `childService-${item.id}`,
                        e.target.checked
                          ? item.child.map(child => child.id)
                          : [],
                        e.target.checked,
                        item,
                        item.child,
                      )
                    }
                  >
                    {item.name}
                  </Checkbox>
                </Form.Item>
                {item.child && item.child.length > 0 && (
                  <Form.Item
                    name={`childService-${item.id}`}
                    className="ml-12 my-0"
                  >
                    <CheckboxGroup
                      options={item.child}
                      onChange={value =>
                        handleGroupChange(
                          `parentService-${item.id}`,
                          value.length === item.child.length ? true : false,
                          value,
                          item,
                          item.child,
                        )
                      }
                    />
                  </Form.Item>
                )}
              </>
            ))}
          </div>
        </Col>
      </Row>
      <Divider className="my-2" />
      <div className="flex justify-end">
        <Button onClick={handleCancel}>Huỷ</Button>
        <Button
          type="primary"
          className="ml-2"
          htmlType="submit"
          loading={
            isUpdating ||
            isGettingDistance ||
            isGettingExpectFee ||
            isGettingTransFee
          }
        >
          Tiếp tục
        </Button>
      </div>
    </Form>
  )
}

export default TruckOrderCreatePage1

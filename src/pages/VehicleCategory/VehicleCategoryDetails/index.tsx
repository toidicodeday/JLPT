import { MESSAGES } from '@/utils/constant/messages.constant'
import {
  useGetVehicleCategoryByIdQuery,
  useUpdateVehicleCategoryMutation,
} from '@/services/vehicleCategoryApi/vehicleCategory'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd'
import React, { useEffect, useMemo } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DragListMileageQuote from '../component/DragListMileageQuote'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { AreaSetupEnum, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { concat } from 'lodash'
import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'

const VehicleCategoryDetails = () => {
  const [form] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()

  const idVehicleCategory = Number(
    new URLSearchParams(location.search).get('id'),
  )

  const { data: getVehicleCategory, isLoading: loading } =
    useGetVehicleCategoryByIdQuery({
      id: idVehicleCategory,
    })
  const [updateVehicleCategory, { isLoading: isCreating }] =
    useUpdateVehicleCategoryMutation()

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const convertedCityOps = useMemo(() => {
    const optionAll = { label: 'Tất cả khu vực', value: 'all' }
    if (vietnamCityOps) return [optionAll, ...vietnamCityOps]
    return [optionAll]
  }, [vietnamCityOps])

  useEffect(() => {
    form.setFieldsValue({
      name: getVehicleCategory?.data?.name,
      height: getVehicleCategory?.data?.height,
      width: getVehicleCategory?.data?.width,
      length: getVehicleCategory?.data?.length,
      capacity: getVehicleCategory?.data?.capacity,
      volumn: getVehicleCategory?.data?.volumn,
      description: getVehicleCategory?.data?.description,
      waitingFee: getVehicleCategory?.data?.vehicleFee?.waitingFee,
      nightFee: getVehicleCategory?.data?.vehicleFee?.nightFee,
      extendHourFee: getVehicleCategory?.data?.vehicleFee?.extendHourFee,
      extendKmFee: getVehicleCategory?.data?.vehicleFee?.extendKmFee,
      mileageQuoteAreaIn:
        getVehicleCategory?.data?.vehicleFee?.feeDetails?.filter(
          (item: any) => item.areaSetup === AreaSetupEnum.IN_CITY,
        ),
      mileageQuoteAreaOut:
        getVehicleCategory?.data?.vehicleFee?.feeDetails?.filter(
          (item: any) => item.areaSetup === AreaSetupEnum.OUT_CITY,
        ),

      workingAreaId:
        getVehicleCategory?.data?.workingAreaId === null
          ? 'all'
          : getVehicleCategory?.data?.workingAreaId,
    })
  }, [form, getVehicleCategory?.data])
  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.name,
        workingAreaId:
          values?.workingAreaId === 'all' ? null : values?.workingAreaId,
        height: Number(values?.height),
        width: Number(values?.width),
        length: Number(values?.length),
        capacity: Number(values?.capacity),
        volumn: Number(values?.volumn),
        description: values?.description,
        feeDetails: concat(
          values?.mileageQuoteAreaIn || [],
          values?.mileageQuoteAreaOut || [],
        ),
        waitingFee: values?.waitingFee,
        nightFee: values?.nightFee,
        extendHourFee: values?.extendHourFee,
        extendKmFee: values?.extendKmFee,
      }
      if (idVehicleCategory != null && Number(idVehicleCategory)) {
        updateVehicleCategory({
          id: idVehicleCategory,
          body: body,
        }).then((response: any) => {
          if ('data' in response) {
            toast.success('Chỉnh sửa loại xe thành công!')
            navigate('/quan-ly-xe/loai-xe/')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa loại xe thất bại!')
          }
        })
      }
    } catch (error) {
      toast.error('Chỉnh sửa loại xe thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicleCategory,
        'edit',
      ),
    }
  }, [adminInfo])

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-xe/loai-xe">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-2xl text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT THÔNG TIN LOẠI XE
            </Typography>
          </div>
        </Link>
      </div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
        disabled={!authorizeStatus.canEdit}
      >
        <Spin spinning={loading}>
          <div className="p-3 rounded border border-solid border-grayDivider mt-4">
            <Typography className="text-base font-bold mb-4">
              THÔNG TIN CHUNG
            </Typography>
            <Row gutter={[16, 16]}>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Tên loại xe"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <Form.Item
                  label="Khu vực hoạt động"
                  name="workingAreaId"
                  rules={[{ required: true }]}
                >
                  <Select
                    className="w-full"
                    options={convertedCityOps}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Typography className="text-black">Kích thước</Typography>
              </Col>
              <Col span={12} xl={{ span: 4 }}>
                <Form.Item
                  label="Chiều dài"
                  name="length"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    precision={2}
                    placeholder="Dài (m)"
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xl={{ span: 4 }}>
                <Form.Item
                  label="Chiều rộng"
                  name="width"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    precision={2}
                    placeholder="Rộng (m)"
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xl={{ span: 4 }}>
                <Form.Item
                  label="Chiều cao"
                  name="height"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    precision={2}
                    placeholder="Cao (m)"
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xl={{ span: 4 }}>
                <Form.Item
                  label="Thể tích"
                  name="volumn"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    precision={2}
                    placeholder="Thể tích (m3)"
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xl={{ span: 4 }}>
                <Form.Item
                  label="Tải trọng"
                  name="capacity"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    precision={2}
                    placeholder="Tải trọng (kg)"
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12} xl={{ span: 4 }} />
              <Col span={12}>
                <Form.Item label="Mô tả" name="description">
                  <Input placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className="p-3 rounded border border-solid border-grayDivider mt-4">
            <Typography className="text-base font-bold mb-4">
              BÁO GIÁ XE
            </Typography>
            <div>
              <Typography className="mb-4 text-[#000000D9] font-bold">
                Cài đặt công thức tính giá cước
              </Typography>
              <DragListMileageQuote
                name="mileageQuoteAreaIn"
                form={form}
                typeArea={AreaSetupEnum.IN_CITY}
              />
              <Typography className="mb-4 text-[#000000D9] font-bold">
                Cài đặt công thức tính giá cước ngoại tỉnh
              </Typography>
              <DragListMileageQuote
                name="mileageQuoteAreaOut"
                form={form}
                typeArea={AreaSetupEnum.OUT_CITY}
              />

              <Typography className="mb-4 text-[#000000D9] mt-4">
                Phí dịch vụ khác
              </Typography>
              <div className="flex items-start flex-wrap">
                <p className="w-40">Phí neo xe</p>
                <Form.Item name="waitingFee" className="mb-2 w-56">
                  <InputNumberFormatMoney
                    addonAfterText="vnd/giờ"
                    classNameAddon="w-16"
                  />
                </Form.Item>
              </div>
              <div className="flex items-start flex-wrap">
                <p className="w-40">Phí lưu đêm</p>
                <Form.Item name="nightFee" className="mb-2 w-56">
                  <InputNumberFormatMoney
                    addonAfterText="vnd/đêm"
                    classNameAddon="w-16"
                  />
                </Form.Item>
              </div>
              <div className="flex items-start flex-wrap">
                <p className="w-40">Phí phụ trội</p>
                <Form.Item name="extendHourFee" className="mb-2 w-56 mr-3">
                  <InputNumberFormatMoney
                    addonAfterText="vnd/giờ"
                    classNameAddon="w-16"
                  />
                </Form.Item>
                <Form.Item name="extendKmFee" className="mb-2 w-56">
                  <InputNumberFormatMoney
                    addonAfterText="vnd/km"
                    classNameAddon="w-16"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Spin>
        <div className="p-3 rounded border border-solid border-grayDivider mt-4">
          <Space>
            <Link to="/quan-ly-xe/loai-xe">
              <Button className="bg-grayButton" disabled={isCreating}>
                Huỷ
              </Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Lưu thông tin
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export default VehicleCategoryDetails

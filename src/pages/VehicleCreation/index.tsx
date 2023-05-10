import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import {
  DRIVER_TYPE,
  STATUS_DRIVER,
  VEHICLE_STATUS_OPS,
} from '@/utils/constant/constant'
import { toast } from 'react-toastify'
import { useCreateNewVehicleMutation } from '@/services/vehicleApi'
import { useGetVihicleGroupOpsQuery } from '@/services/vehicleGroup'
import { useGetDriverOpsQuery } from '@/services/driverApi'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import { compact, get } from 'lodash'
const { Option } = Select

const VehicleCreation = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [detailCategorySelected, setDetailCategorySelected] = useState('')
  const [ownerValue, setOwnerValue] = useState('')
  const [areaSelected, setAreaSelected] = useState<number>()

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const [createNewVehicle, { isLoading: isCreating }] =
    useCreateNewVehicleMutation()

  const onFinish = (values: any) => {
    try {
      const body = {
        categoryId: values?.vehicleCategory,
        licensePlatese: values?.plate,
        vehicleCode: values?.vehicleCode,
        systemVehicleType: values?.owner,
        workingAreaId: values?.area,
        groupIds: values?.groups,
        driverId: values?.driver,
        status: values?.status,
      }
      createNewVehicle(body).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới xe thành công!')
          navigate('/quan-ly-xe/danh-sach-xe')
        } else if ('error' in response) {
          toast.error(
            get(response?.error, 'data.error.message') ||
              'Thêm mới xe thất bại!',
          )
        }
      })
    } catch (error) {
      toast.error(get(error, 'data.error.message') || 'Thêm mới xe thất bại!')
    }
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-xe/danh-sach-xe">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-2xl text-black" />
            <Typography className="text-lg font-bold ml-2">
              THÊM MỚI XE
            </Typography>
          </div>
        </Link>
      </div>
      <div className="p-3 rounded border border-solid border-grayDivider mt-4">
        <Typography className="text-base font-bold mb-4">
          THÔNG TIN XE
        </Typography>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Loại xe"
                name="vehicleCategory"
                rules={[{ required: true, message: 'Hãy chọn loại xe!' }]}
                className="mb-2"
              >
                <DebounceSelect
                  optionQuery={useGetVehicleCategoryOpsQuery}
                  convertQueryString={searchString =>
                    searchString
                      ? '?search=' +
                        encodeURIComponent(`name:ilike:%${searchString}%`)
                      : ''
                  }
                  onChange={(value: any, option) => {
                    if (!Array.isArray(option)) {
                      setDetailCategorySelected(`Dài ${option?.raw?.length}, Rộng ${option?.raw?.width}, Cao ${option?.raw?.height},
      Thể tích ${option?.raw?.capacity} (m3)`)
                    }
                  }}
                />
              </Form.Item>
              <p className="pl-2">{detailCategorySelected}</p>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Biển số xe"
                name="plate"
                rules={[{ required: true, message: 'Hãy nhập biển số xe!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Mã xe"
                name="vehicleCode"
                rules={[{ required: true, message: 'Hãy nhập mã xe!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Đăng ký bởi"
                name="owner"
                rules={[{ required: true, message: 'Hãy chọn chủ sở hữu xe!' }]}
              >
                <Select
                  onChange={value => {
                    setOwnerValue(value)
                  }}
                >
                  <Option value="THANHHUNG">Thành hưng</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Khu vực hoạt động"
                name="area"
                rules={[
                  { required: true, message: 'Hãy chọn khu vực hoạt động!' },
                ]}
              >
                <Select
                  allowClear
                  options={vietnamCityOps}
                  onChange={value => setAreaSelected(value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Thuộc đội xe" name="groups">
                <DebounceSelect
                  optionQuery={useGetVihicleGroupOpsQuery}
                  mode="multiple"
                  convertQueryString={searchString =>
                    searchString ? `?search=name:like:%${searchString}%` : ''
                  }
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Tài xế lái xe" name="driver">
                <DebounceSelect
                  convertQueryString={s => {
                    const initSearch =
                      ownerValue === 'THANHHUNG'
                        ? `unitKey:=:${DRIVER_TYPE?.THANHHUNG_DRIVER};status:=:${STATUS_DRIVER?.ACTIVE}`
                        : `unitKey:=:${DRIVER_TYPE?.THANHHUNG_PARTNER};status:=:${STATUS_DRIVER?.ACTIVE}`
                    const searchArea = areaSelected
                      ? `workingAreaId:=:${areaSelected}`
                      : ''
                    const valueSearch = s ? `name:ilike:%${s}%` : ''
                    return (
                      '?search=' +
                      encodeURIComponent(
                        compact([initSearch, searchArea, valueSearch]).join(
                          ';',
                        ),
                      )
                    )
                  }}
                  optionQuery={useGetDriverOpsQuery}
                  disabled={ownerValue && areaSelected ? false : true}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  { required: true, message: 'Hãy chọn trạng thái hoạt động!' },
                ]}
              >
                <Select options={VEHICLE_STATUS_OPS} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="pb-4 flex justify-start gap-2">
            <Button
              onClick={() => navigate('/quan-ly-xe/danh-sach-xe')}
              disabled={isCreating}
            >
              Huỷ
            </Button>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default VehicleCreation

import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Rate,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useGetVehicleCategoryByIdQuery,
  useGetVehicleCategoryOpsQuery,
} from '@/services/vehicleCategoryApi/vehicleCategory'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  DOCUMENT_TYPE,
  DRIVER_TYPE,
  OWNER_COMPANY_OPS,
  STATUS_DRIVER,
  VEHICLE_STATUS_OPS,
} from '@/utils/constant/constant'
import { useGetVihicleGroupOpsQuery } from '@/services/vehicleGroup'
import {
  useGetDriverByIdQuery,
  useGetDriverOpsQuery,
} from '@/services/driverApi'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { useUpdateVehicleMutation } from '@/services/vehicleApi'
import { toast } from 'react-toastify'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import { useGetDocumentQuery } from '@/services/documentApi'
import { compact, get } from 'lodash'
interface Props {
  detailVehicle: any
  idVehicle: string | null
  loading: boolean
  authorizeStatus: { [key: string]: boolean }
}
const VehicleInfo = ({
  detailVehicle,
  idVehicle,
  loading,
  authorizeStatus,
}: Props) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [detailCategorySelected, setDetailCategorySelected] = useState('')
  const [idDriver, setIdDriver] = useState('')
  const [areaSelected, setAreaSelected] = useState<number>()
  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })
  const { data: getInfoDriver, isLoading: isLoadingDriver } =
    useGetDriverByIdQuery({ id: idDriver }, { skip: !idDriver })
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation()

  const { data: vCategoryInit } = useGetVehicleCategoryByIdQuery(
    { id: detailVehicle?.data?.categoryId },
    { skip: !detailVehicle?.data?.categoryId },
  )

  useEffect(() => {
    if (vCategoryInit) {
      setDetailCategorySelected(`Dài ${vCategoryInit.data?.length}, Rộng ${vCategoryInit.data?.width}, Cao ${vCategoryInit.data?.height},
        Thể tích ${vCategoryInit.data?.capacity} (m3)`)
    }
  }, [vCategoryInit])

  useEffect(() => {
    form.setFieldsValue({
      vehicleCategory: detailVehicle?.data?.categoryId,
      plate: detailVehicle?.data?.licensePlatese,
      vehicleCode: detailVehicle?.data?.vehicleCode,
      owner: detailVehicle?.data?.systemVehicleType,
      area: detailVehicle?.data?.workingAreaId,
      groups: detailVehicle?.data?.groups?.map((i: any) => i.id) || [],
      driver: detailVehicle?.data?.driverId,
      status: detailVehicle?.data?.status,
    })
    setAreaSelected(detailVehicle?.data?.workingAreaId)
  }, [form, detailVehicle])

  useEffect(() => {
    setIdDriver(detailVehicle?.data?.driverId)
  }, [detailVehicle?.data])

  const { data: avatarImg } = useGetDocumentQuery(
    {
      ref: 'driver',
      refId: Number(idDriver),
      query: `order=id:desc&search=type:=:${DOCUMENT_TYPE.AVATAR}&limit=1`,
    },
    { skip: !Number.isInteger(Number(idDriver)) },
  )
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
      updateVehicle({ id: idVehicle, body: body }).then((response: any) => {
        if ('data' in response) {
          toast.success('Chỉnh sửa xe thành công!')
          window.history.back()
          // navigate('/quan-ly-xe/danh-sach-xe')
        } else if ('error' in response) {
          toast.error(
            get(response?.error, 'data.error.message') ||
              'Chỉnh sửa xe thất bại!',
          )
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa xe thất bại!')
    }
  }

  return (
    <>
      <div className="p-3 rounded border border-solid border-grayDivider mt-4">
        <Typography className="text-base font-bold mb-4">
          THÔNG TIN XE
        </Typography>
        <Spin spinning={loading}>
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            disabled={!authorizeStatus.canEdit}
          >
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
                    initSelected={[
                      {
                        label: detailVehicle?.data?.vehicleCategory?.name,
                        value: detailVehicle?.data?.vehicleCategory?.id,
                      },
                    ]}
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
                  rules={[
                    { required: true, message: 'Hãy chọn chủ sở hữu xe!' },
                  ]}
                >
                  <Select options={OWNER_COMPANY_OPS} disabled />
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
                    options={vietnamCityOps}
                    onChange={value => setAreaSelected(value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Thuộc đội xe" name="groups">
                  <DebounceSelect
                    optionQuery={useGetVihicleGroupOpsQuery}
                    initSelected={detailVehicle?.data?.groups.map(
                      (item: any) => ({ label: item?.name, value: item?.id }),
                    )}
                    mode="multiple"
                    convertQueryString={searchString =>
                      searchString ? `?search=name:like:%${searchString}%` : ''
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Tài xế lái xe" name="driver">
                  <DebounceSelect
                    convertQueryString={s => {
                      const initSearch =
                        detailVehicle?.data?.systemVehicleType === 'THANHHUNG'
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
                    initSelected={[
                      {
                        label: detailVehicle?.data?.driver?.name,
                        value: detailVehicle?.data?.driver?.id,
                      },
                    ]}
                    onChange={values => setIdDriver(values)}
                    disabled={
                      detailVehicle?.data?.systemVehicleType === 'PARTNER'
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy chọn trạng thái hoạt động!',
                    },
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
                disabled={isUpdating}
              >
                Huỷ
              </Button>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Lưu thông tin
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
      <div className="p-3 rounded border border-solid border-grayDivider mt-4">
        <Typography className="text-base font-bold mb-4">
          THÔNG TIN TÀI XẾ
        </Typography>
        <Spin spinning={isLoadingDriver}>
          <div className="flex items-center">
            <Avatar src={avatarImg?.data?.[0]?.document.url} size={128} />
            <div className="ml-4">
              <Typography className="font-bold text-base">
                {getInfoDriver?.data?.name}
              </Typography>
              <Typography className="mt-2">
                {formatPhone(getInfoDriver?.data?.phone)}
              </Typography>
              <Rate
                allowHalf
                value={
                  getInfoDriver?.data?.driverStar
                    ? getInfoDriver?.data?.driverStar * 5
                    : 0
                }
              />
            </div>
          </div>
        </Spin>
      </div>
    </>
  )
}

export default VehicleInfo

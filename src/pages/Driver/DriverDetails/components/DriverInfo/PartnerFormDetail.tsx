import { DatePicker, UploadImage } from '@/components/inputs'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { useGetContractOpsQuery } from '@/services/contractApi'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { Typography, Row, Col, Form, Input, Select } from 'antd'
import { compact } from 'lodash'
import React from 'react'

type Props = {
  areaSelected: number | undefined
  form?: any
}

const PartnerFormDetail = ({ areaSelected, form }: Props) => {
  const { data: contractOps } = useGetContractOpsQuery({
    query: '?limit=1000',
  })

  return (
    <>
      <div className="p-3 rounded border border-solid border-grayDivider mt-4">
        <Typography className="text-base font-bold mb-4">
          THÔNG TIN XE
        </Typography>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Biển số xe"
              name="partnerLicensePlatese"
              rules={[
                { required: true, message: 'Trường này không được để trống' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Loại xe"
              name="partnerVCategory"
              rules={[
                { required: true, message: 'Trường này không được để trống' },
              ]}
            >
              <DebounceSelect
                optionQuery={useGetVehicleCategoryOpsQuery}
                convertQueryString={s => {
                  const searchArea = areaSelected
                    ? `workingAreaId:=:${areaSelected}`
                    : ''
                  const valueSearch = s ? `name:ilike:%${s}%` : ''
                  return (
                    '?search=' +
                    encodeURIComponent(
                      compact([searchArea, valueSearch]).join(';'),
                    )
                  )
                }}
                disabled={!areaSelected}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="flex flex-wrap gap-x-4">
              <UploadImage
                label="Ảnh xe"
                name="partnerVImg"
                errorMess="Hãy upload ảnh xe!"
                required
              />
              <UploadImage
                label="Ảnh biển số xe"
                name="partnerVNumberImg"
                errorMess="Hãy upload ảnh biển số xe!"
                required
              />
              <UploadImage
                label="Giấy phép đăng ký xe"
                name="partnerVRegistrationImg"
                errorMess="Hãy upload ảnh giấy phép đăng ký xe!"
                required
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="p-3 rounded border border-solid border-grayDivider mt-4">
        <Typography className="text-base font-bold mb-4">HỢP ĐỒNG</Typography>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Loại hợp đồng" name="contractId">
              <Select options={contractOps} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="flex justify-between gap-x-4">
              <Form.Item
                label="Áp dụng từ ngày"
                name="applyFrom"
                className="w-full"
              >
                <DatePicker format="dd-MM-yyyy" className="w-full" />
              </Form.Item>
              <Form.Item label="đến ngày" name="applyTo" className="w-full">
                <DatePicker format="dd-MM-yyyy" className="w-full" />
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nhập số tiền trong ví của tài xế"
              name="driverWalletMoney"
            >
              <InputNumberFormatMoney addonAfterText="vnd" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PartnerFormDetail

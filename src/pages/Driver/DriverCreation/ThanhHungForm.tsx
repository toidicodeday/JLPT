import DebounceSelect from '@/components/inputs/DebounceSelect'
import { useGetVehilcleOpsQuery } from '@/services/vehicleApi'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { Typography, Row, Col, Form } from 'antd'
import { compact } from 'lodash'
import React from 'react'

type Props = {
  areaSelected: number | undefined
  form?: any
}

const ThanhHungForm = ({ areaSelected, form }: Props) => {
  const selectedVC = Form.useWatch('thanhHungVCategory', form)

  return (
    <div className="p-3 rounded border border-solid border-grayDivider mt-4">
      <Typography className="text-base font-bold mb-4">THÔNG TIN XE</Typography>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Loại xe" name="thanhHungVCategory">
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
              onChange={() => form.setFieldValue('vehicleTH', undefined)}
              disabled={!areaSelected}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Xe của tài xế" name="vehicleTH">
            <DebounceSelect
              optionQuery={useGetVehilcleOpsQuery}
              convertQueryString={s => {
                const initSearch = 'systemVehicleType:=:THANHHUNG'
                const searchArea = areaSelected
                  ? `workingAreaId:=:${areaSelected}`
                  : ''
                const searchVC = selectedVC ? `categoryId:=:${selectedVC}` : ''
                const valueSearch = s ? `licensePlatese:ilike:%${s}%` : ''
                return (
                  '?search=' +
                  encodeURIComponent(
                    compact([
                      initSearch,
                      searchArea,
                      searchVC,
                      valueSearch,
                    ]).join(';'),
                  )
                )
              }}
              disabled={!areaSelected || !selectedVC}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default ThanhHungForm

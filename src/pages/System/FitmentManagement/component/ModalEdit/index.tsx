import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import {
  useGetOneFitmentItemQuery,
  useUpdateFitementItemMutation,
} from '@/services/fitmentApi'
import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface Props {
  isOpenModal: boolean
  setIsOpenModal: any
  fitmentGroupValue: string
  fitmentGroupId: number
  fitmentItemId: number
}
const ModalEdit: React.FC<Props> = ({
  isOpenModal,
  setIsOpenModal,
  fitmentGroupValue,
  fitmentGroupId,
  fitmentItemId,
}) => {
  const [form] = Form.useForm()

  const { data: detailFitementItem, isLoading } = useGetOneFitmentItemQuery(
    {
      id: fitmentItemId,
    },
    { skip: !fitmentItemId },
  )
  const [updateFitmentItem, { isLoading: isUpdating }] =
    useUpdateFitementItemMutation()

  useEffect(() => {
    form.setFieldsValue({
      name: detailFitementItem?.data?.name,
      calculation_unit: detailFitementItem?.data?.calculation_unit,
      size: detailFitementItem?.data?.size,
      cost: detailFitementItem?.data?.cost,
    })
  }, [detailFitementItem, form])

  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.name,
        calculation_unit: values?.calculation_unit,
        size: values?.size,
        cost: Number(values?.cost),
        fitmentGroupId: fitmentGroupId,
      }
      updateFitmentItem({ id: fitmentItemId, body }).then(response => {
        if ('data' in response) {
          toast.success('Chỉnh sửa đồ đạc thành công!')
          setIsOpenModal({ isOpenModal: false })
          form.resetFields()
        } else if ('error' in response) {
          toast.error('Chỉnh sửa đồ đạc thất bại!')
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa đồ đạc thất bại!')
    }
  }
  const onCancel = () => {
    setIsOpenModal({ isOpenModal: false })
  }

  return (
    <Modal
      visible={isOpenModal}
      footer={false}
      onCancel={onCancel}
      title="Chỉnh sửa đồ đạc"
    >
      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                label="Tên tài sản (dụng cụ/ thiết bị/ công cụ)"
                name="name"
                rules={[{ required: true, message: 'Hãy nhập tên tài sản!' }]}
              >
                <Input width={'100%'} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <Form.Item label="Đơn vị tính" name="calculation_unit">
                <Input width={'100%'} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <Form.Item label="Kích thước (DxRxC cm)" name="size">
                <Input width={'100%'} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11}>
              <Form.Item
                label="Đơn giá"
                name="cost"
                rules={[{ required: true, message: 'Hãy nhập đơn giá!' }]}
              >
                <InputNumberFormatMoney className="w-full rounded" min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={{ span: 11, offset: 2 }}>
              <Form.Item label="Nhóm">
                <Input width={'100%'} value={fitmentGroupValue} disabled />
              </Form.Item>
            </Col>
            <div className="pb-4 flex gap-2 justify-center items-center">
              <Button
                className="rounded"
                onClick={onCancel}
                disabled={isUpdating}
              >
                Hủy
              </Button>
              <Button
                className="rounded"
                type="primary"
                htmlType="submit"
                loading={isUpdating}
              >
                Lưu
              </Button>
            </div>
          </Row>
        </Form>
      </Spin>
    </Modal>
  )
}
export default ModalEdit

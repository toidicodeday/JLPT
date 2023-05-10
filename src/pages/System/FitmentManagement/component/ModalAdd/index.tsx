import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { useCreateFitmentItemMutation } from '@/services/fitmentApi'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  fitmentGroupValue: string
  fitmentGroupId: number
}
const ModalAdd: React.FC<Props> = ({
  isOpenModal,
  setIsOpenModal,
  fitmentGroupValue,
  fitmentGroupId,
}) => {
  const onCancel = () => {
    setIsOpenModal(false)
  }
  const [createFitmentItem, { isLoading: isCreating }] =
    useCreateFitmentItemMutation()
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.name,
        calculation_unit: values?.calculation_unit,
        size: values?.size,
        cost: Number(values?.cost),
        fitmentGroupId: fitmentGroupId,
      }
      createFitmentItem(body).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới đồ đạc thành công!')
          setIsOpenModal(false)
          form.resetFields()
        } else if ('error' in response) {
          toast.error('Thêm mới đồ đạc thất bại!')
        }
      })
    } catch (error) {
      toast.error('Thêm mới đồ đạc thất bại!')
    }
  }

  return (
    <Modal
      visible={isOpenModal}
      footer={false}
      onCancel={onCancel}
      title="Thêm mới đồ đạc"
    >
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
              disabled={isCreating}
            >
              Hủy
            </Button>
            <Button
              className="rounded"
              type="primary"
              htmlType="submit"
              loading={isCreating}
            >
              Lưu
            </Button>
          </div>
        </Row>
      </Form>
    </Modal>
  )
}
export default ModalAdd

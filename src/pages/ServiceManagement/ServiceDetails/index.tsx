import { Button, Col, Divider, Form, Input, Row, Spin, Typography } from 'antd'
import React, { useEffect } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  useGetOneProductAdminQuery,
  useUpdateProductAdminMutation,
} from '@/services/serviceApi/service'
import FormService from './components/FormService'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'

const ServiceDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()

  const idProduct = new URLSearchParams(location.search).get('id')

  const { data: detailProduct, isLoading } = useGetOneProductAdminQuery({
    id: idProduct,
  })
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductAdminMutation()

  useEffect(() => {
    form.setFieldsValue({
      name: detailProduct?.name,
      description: detailProduct?.desc,
      child: detailProduct?.child,
    })
  }, [form, detailProduct])

  const handleSaveDetails = (values: any) => {
    try {
      const body = {
        name: values?.name,
        desc: values?.description,
        child: values?.child,
      }
      updateProduct({ id: idProduct, body: body }).then(response => {
        if ('data' in response) {
          toast.success('Chỉnh sửa dịch vụ thành công!')
          navigate('/quan-ly-dich-vu/dich-vu/')
        } else if ('error' in response) {
          toast.error('Chỉnh sửa dịch vụ thất bại!')
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa dịch vụ thất bại!')
    }
  }
  return (
    <div className="pb-4">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-dich-vu/dich-vu">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2 uppercase">
              {detailProduct?.name}
            </Typography>
          </div>
        </Link>
      </div>
      <div className="py-4">
        <Spin spinning={isLoading}>
          <Form
            layout="vertical"
            onFinish={handleSaveDetails}
            form={form}
            validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
          >
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả dịch vụ" name="description">
              <Input />
            </Form.Item>
            <Divider />
            <Typography className="uppercase">
              các dịch vụ khác đi kèm
            </Typography>
            <>
              {detailProduct?.child?.length >= 0 && (
                <Row gutter={[8, 8]} className="mt-4 font-bold">
                  <Col span={6}>Tên dịch vụ</Col>
                  <Col span={4}>Cước phí (vnd)</Col>
                  <Col span={14}>Mô tả chi tiết</Col>
                </Row>
              )}
              {detailProduct?.child?.length >= 0 && (
                <FormService name="child" form={form} />
              )}
            </>
            <Divider />
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => navigate('/quan-ly-dich-vu/dich-vu')}
                disabled={isUpdating}
              >
                Huỷ
              </Button>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Lưu
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default ServiceDetails

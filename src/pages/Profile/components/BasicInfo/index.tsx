import React from 'react'
import DatePicker from '@/components/inputs/DatePicker'
import { Button, Col, Form, Input, Row, Radio, Select } from 'antd'
import { useUpdateMeMutation } from '@/services/accountApi/account'
import { toast } from 'react-toastify'
import { AdminMeType } from '@/services/accountApi/types'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { format } from 'date-fns'
import { useGetSystemRoleOpsQuery } from '@/services/systemRoleApi'

interface Props {
  dataSource?: AdminMeType
}

const BasicInfo = ({ dataSource }: Props) => {
  const [updateMe, { isLoading }] = useUpdateMeMutation()
  const { data: LocationOps } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })

  const { data: systemRoleOps } = useGetSystemRoleOpsQuery({
    query: '?page=1&limit=1000',
  })

  const onFinish = async (values: any) => {
    try {
      const response = await updateMe({
        body: {
          name: values.name,
          email: values.email,
          phone: values.phone ? `+84${values.phone}` : undefined,
          dob: values.dob
            ? format(new Date(values.dob), 'dd/MM/yyyy')
            : undefined,
          addressId: values.addressId,
          gender: values.gender,
        },
      })
      if ('data' in response) toast.success('Cập nhật tài khoản thành công!')
      if ('error' in response)
        toast.error('Cập nhật tài khoản có lỗi. Vui lòng thử lại!')
    } catch (error) {
      toast.error('Cập nhật tài khoản có lỗi. Vui lòng thử lại!')
    }
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
      initialValues={{
        name: dataSource?.name,
        email: dataSource?.email,
        phone: dataSource?.phone ? dataSource?.phone.replace('+84', '') : null,
        dob: dataSource?.dob ? new Date(dataSource?.dob) : null,
        addressId: dataSource?.addressId,
        gender: dataSource?.gender,
        roles: dataSource?.systemRoles.map((i: any) => i.id) || [],
      }}
    >
      <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true },
          { type: 'email', message: 'Email không đúng định dạng!' },
        ]}
      >
        <Input size="large" disabled />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true },
          {
            validator(_, value) {
              const regexString = new RegExp(/([3|5|7|8|9])+([0-9]{8})\b/g)
              if (regexString.test(value) || !value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Số điện thoại chưa đúng định dạng'),
              )
            },
          },
        ]}
      >
        <Input prefix="+84" maxLength={9} />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="dob">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="addressId" rules={[{ required: true }]}>
        <Select options={LocationOps} />
      </Form.Item>
      <Form.Item label="Giới tính" name="gender">
        <Radio.Group>
          <Radio value="MALE">Nam</Radio>
          <Radio value="FEMALE">Nữ</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Quyền"
        name="roles"
        rules={[{ required: true, message: 'Hãy chọn quyền cho tài khoản' }]}
      >
        <Select mode="multiple" options={systemRoleOps} disabled />
      </Form.Item>
      <Row>
        <Col span={12} offset={6}>
          <Form.Item>
            <div>
              <Button
                type="primary"
                style={{ width: '100%' }}
                htmlType="submit"
                loading={isLoading}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default BasicInfo

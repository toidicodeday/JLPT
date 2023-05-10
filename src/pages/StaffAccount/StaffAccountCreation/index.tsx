import { DatePicker, InputEmail } from '@/components/inputs'
import UploadImage from '@/components/inputs/UploadImg'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  message,
  Select,
  Typography,
} from 'antd'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateStaffMutation } from '@/services/accountApi/account'
import { toast } from 'react-toastify'
import InputPhoneNumber from '@/components/inputs/InputPhoneNumber'
import GenderSelection from '@/components/inputs/GenderSelection'
import InputName from '@/components/inputs/InputName'
import SwitchCase from '@/components/inputs/SwitchCase'
import { useGetSystemRoleOpsQuery } from '@/services/systemRoleApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { format } from 'date-fns'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { isNumber } from 'lodash'
import { useCreateDocumentMutation } from '@/services/documentApi'
import { DOCUMENT_TYPE } from '@/utils/constant/constant'
import { get } from 'lodash'

const StaffAccountCreation = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation()
  const addressId = Form.useWatch('address', form)
  const { data: addressOps } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })
  const { data: systemRoleOps } = useGetSystemRoleOpsQuery({
    query: '?page=1&limit=1000',
  })
  const { data: manageAreaOps } = useGetAreaOpsQuery(
    {
      query: '?search=' + encodeURIComponent(`parentId:=:${addressId}`),
    },
    { skip: !isNumber(addressId) },
  )

  const [updateUserAvatar, { isLoading: isCreateDoc }] =
    useCreateDocumentMutation()

  const handleCreateStaff = async (values: any) => {
    try {
      const createRes = await createStaff({
        name: values.name,
        email: values.email,
        phone: `+84${values.phone}`,
        dob: values.dob ? format(values.dob, 'dd/MM/yyyy') : null,
        addressId: values.address,
        workingAreas: values.managingAreas
          ? values.managingAreas.map((i: number) => ({ id: i }))
          : null,
        gender: values.gender,
        systemRoles: isNumber(values.systemRoles)
          ? [{ id: values.systemRoles }]
          : [],
        // values.systemRoles?.map((item: number) => ({ id: item })),
        status: values.status ? 1 : 0,
        // isCaptain: values.isCaptain,
        isSupporter: values.isSupporter,
      })
      if ('data' in createRes) {
        const userId = Number(createRes.data?.data?.id)
        if (values.avatar) {
          updateUserAvatar({
            userId: Number(userId),
            ref: 'admin',
            type: [DOCUMENT_TYPE.AVATAR],
            docs: [values.avatar[0].response.docId],
          }).then(docRes => {
            if ('data' in docRes) {
              message.success('Cập nhật avatar thành công')
              toast.success('Tạo mới tài khoản thành công!')
              navigate('/quan-ly-tai-khoan/tai-khoan')
            }
            if ('error' in docRes) {
              message.error(
                get(docRes.error, 'data.error.message') ||
                  MESSAGES.CALL_API_ERROR,
              )
            }
          })
        } else {
          toast.success('Tạo mới tài khoản thành công!')
          navigate('/quan-ly-tai-khoan/tai-khoan')
        }
      }
      if ('error' in createRes) {
        toast.error(
          get(createRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-tai-khoan/tai-khoan">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              TẠO TÀI KHOẢN
            </Typography>
          </div>
        </Link>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="w-[42rem]">
          <Form
            layout="vertical"
            onFinish={handleCreateStaff}
            initialValues={{ status: true }}
            form={form}
          >
            <UploadImage
              label="Ảnh đại diện"
              name="avatar"
              setResetFileList={() => {}}
              required={false}
            />
            <InputName />
            <InputEmail labelText="Email" noPrefix />
            <InputPhoneNumber />
            <Form.Item label="Ngày sinh" name="dob">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Hãy nhập địa chỉ!' }]}
            >
              <Select options={addressOps} />
            </Form.Item>
            <Form.Item label="Khu vực quản lý" name="managingAreas">
              <Select
                options={manageAreaOps}
                disabled={!isNumber(addressId)}
                mode="multiple"
              />
            </Form.Item>
            <GenderSelection required={false} />
            <Form.Item
              label="Quyền"
              name="systemRoles"
              rules={[
                { required: true, message: 'Hãy chọn quyền cho tài khoản' },
              ]}
            >
              <Select options={systemRoleOps} />
            </Form.Item>
            <div className="flex items-center justify-between">
              <SwitchCase
                label="Trạng thái hoạt động"
                formName="status"
                checkText="Hoạt động"
                uncheckText="Khoá"
              />
              {/* <Form.Item name="isCaptain" label=" " valuePropName="checked">
                <Checkbox>Đội trưởng</Checkbox>
              </Form.Item> */}
              <Form.Item name="isSupporter" label=" " valuePropName="checked">
                <Checkbox>Hỗ trợ khách hàng trực tuyến</Checkbox>
              </Form.Item>
            </div>

            <Divider />
            <div className="flex pb-4 gap-4">
              <Button
                htmlType="reset"
                onClick={() => navigate('/quan-ly-tai-khoan/tai-khoan')}
                disabled={isCreating || isCreateDoc}
              >
                Huỷ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating || isCreateDoc}
              >
                Lưu thông tin
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StaffAccountCreation

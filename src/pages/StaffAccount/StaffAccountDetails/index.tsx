import {
  Button,
  Divider,
  Form,
  Typography,
  Spin,
  Select,
  Checkbox,
  Input,
  Switch,
  Radio,
  Popconfirm,
} from 'antd'
import React, { useEffect } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  useGetOneStaffQuery,
  useUpdateStaffMutation,
} from '@/services/accountApi/account'
import { toast } from 'react-toastify'
import { DatePicker } from '@/components/inputs'
import {
  STAFF_ACCOUNT_STATUS,
  SYSTEM_ROLE_KEY,
} from '@/utils/constant/constant'
import { convertToPhone84, formatDate } from '@/utils/helpers/convert.helper'
import useAvatarUpdator from '@/hooks/useAvatarUpdator'
import AvatarHolder from '@/components/inputs/AvatarHolder'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { get, isNumber } from 'lodash'
import { useGetRolesOpsQuery } from '@/services/roleApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { loggedOut } from '@/store/authSlice'
import { useUpdatePlayerIdWhenSignOutMutation } from '@/services/notificationApi'
import useGetPermission from '@/hooks/useGetPermission'
import { AdminMeType } from '@/services/accountApi/types'
import { selectUserMe } from '@/store/authSlice/selector'

const StaffAccountDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const adminInfo: AdminMeType = useSelector(selectUserMe)

  const idStaff = new URLSearchParams(location.search).get('staffId')
  const adminAddressId = Form.useWatch('addressId', form)
  const {
    data: detailStaff,
    isLoading,
    isSuccess,
  } = useGetOneStaffQuery({ id: Number(idStaff) }, { skip: !idStaff })
  const {
    avatarUrl,
    handleChangeAvatar,
    loading: loadingAvatar,
  } = useAvatarUpdator(Number(idStaff))
  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })
  const { data: manageAreaOps, isSuccess: manageAreaOpsFetched } =
    useGetAreaOpsQuery(
      {
        query: `?search=parentId:=:${adminAddressId}`,
      },
      { skip: !adminAddressId },
    )
  const { data: roleOps } = useGetRolesOpsQuery()

  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation()

  const [updatePlayerIdWhenSignOut] = useUpdatePlayerIdWhenSignOutMutation()

  const handleLogout = async () => {
    await updatePlayerIdWhenSignOut({
      userId: Number(adminInfo?.id),
      currentPlayerId: localStorage.getItem('player_id'),
    })
    dispatch(loggedOut())
    navigate('/login')
  }

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        name: detailStaff.data.name,
        dob: detailStaff.data.dob ? new Date(detailStaff.data.dob) : null,
        addressId: detailStaff.data.addressId,
        email: detailStaff.data.email,
        phone: detailStaff.data.phone,
        gender: detailStaff.data.gender,
        systemRoles: detailStaff.data.systemRoles?.[0]?.id,
        status: detailStaff.data.status === STAFF_ACCOUNT_STATUS.ACTIVE,
        isSupporter: detailStaff.data.isSupporter,
      })
      if (manageAreaOpsFetched) {
        form.setFieldValue(
          'managingAreaId',
          detailStaff.data.workingAreas?.map(i => i.id),
        )
      }
    }
  }, [detailStaff, form, isSuccess, manageAreaOpsFetched])

  const onFinish = async (values: any) => {
    try {
      await updateStaff({
        id: Number(idStaff),
        body: {
          name: values.name,
          dob: values.dob && formatDate(values.dob, 'dd/MM/yyyy'),
          addressId: values.addressId,
          status: values.status
            ? STAFF_ACCOUNT_STATUS.ACTIVE
            : STAFF_ACCOUNT_STATUS.INACTIVE,
          gender: values.gender,
          phone: convertToPhone84(values.phone),
          // isCaptain: values.isCaptain,
          isSupporter: values.isSupporter,
          systemRoles: isNumber(values.systemRoles)
            ? [{ id: values.systemRoles }]
            : [],
          workingAreas: values?.managingAreaId
            ? values.managingAreaId.map((i: number) => ({ id: i }))
            : [],
        },
      }).then(response => {
        if ('error' in response) {
          toast.error(
            get(response?.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        } else {
          toast.success('Cập nhật tài khoản thành công!')
          if (detailStaff && adminInfo?.id === detailStaff?.data?.id) {
            handleLogout()
          } else {
            navigate('/quan-ly-tai-khoan/tai-khoan/')
          }
        }
      })
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  //handle Authorize
  const { editPermission } = useGetPermission(SYSTEM_ROLE_KEY.account)

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-tai-khoan/tai-khoan">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT TÀI KHOẢN
            </Typography>
          </div>
        </Link>
      </div>
      {isLoading && <Spin />}
      <div className="mt-4 flex justify-center">
        <div className="w-[42rem]">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
            disabled={!editPermission}
          >
            {!isLoading && (
              <>
                <AvatarHolder
                  loading={loadingAvatar}
                  onChange={handleChangeAvatar}
                  url={avatarUrl}
                  editPermission={editPermission}
                />

                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                    { type: 'email', message: 'Email không đúng định dạng!' },
                  ]}
                >
                  <Input size="large" prefix={<UserOutlined />} disabled />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true },
                    {
                      validator(_, value) {
                        const regexString = new RegExp(
                          /([3|5|7|8|9])+([0-9]{8})\b/g,
                        )
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
                  <DatePicker style={{ width: '100%' }} format="dd/MM/yyyy" />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="addressId"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={vietnamCityOps}
                    onChange={() =>
                      form.setFieldValue('managingAreaId', undefined)
                    }
                  />
                </Form.Item>
                <Form.Item label="Khu vực quản lý" name="managingAreaId">
                  <Select
                    options={manageAreaOps}
                    disabled={!adminAddressId}
                    mode="multiple"
                  />
                </Form.Item>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value={'MALE'}> Nam </Radio>
                    <Radio value={'FEMALE'}> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Quyền"
                  name="systemRoles"
                  rules={[{ required: true }]}
                >
                  <Select options={roleOps} />
                </Form.Item>
                <div className="flex justify-between items-center flex-wrap">
                  <Form.Item
                    label="Trạng thái hoạt động"
                    name="status"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren={
                        <Typography className="text-white w-16 text-center">
                          Hoạt động
                        </Typography>
                      }
                      unCheckedChildren={
                        <Typography className="w-16 text-center">
                          Khoá
                        </Typography>
                      }
                    />
                  </Form.Item>
                  {/* <Form.Item name="isCaptain" label=" " valuePropName="checked">
                    <Checkbox>Đội trưởng</Checkbox>
                  </Form.Item> */}
                  <Form.Item
                    name="isSupporter"
                    label=" "
                    valuePropName="checked"
                  >
                    <Checkbox>Hỗ trợ khách hàng trực tuyến</Checkbox>
                  </Form.Item>
                </div>
                <Divider />
                <div className="pb-4">
                  <Button
                    htmlType="reset"
                    onClick={() => navigate('/quan-ly-tai-khoan/tai-khoan')}
                  >
                    Huỷ
                  </Button>
                  {detailStaff && adminInfo?.id === detailStaff?.data?.id && (
                    <Popconfirm
                      title={
                        'Bạn đang chỉnh sửa tài khoản của chính mình. Sau khi sửa, bạn sẽ đăng xuất khỏi tài khoản để cập nhật quyền mới nhất. Bạn có chắc chắn muốn sửa'
                      }
                      placement="top"
                      okText="Tiếp tục"
                      cancelText="Quay lại"
                      onConfirm={() => onFinish(form.getFieldsValue())}
                    >
                      <Button type="primary" className="ml-4">
                        Lưu thông tin
                      </Button>
                    </Popconfirm>
                  )}
                  {detailStaff && adminInfo?.id !== detailStaff?.data?.id && (
                    <Button
                      type="primary"
                      className="ml-4"
                      htmlType="submit"
                      loading={isUpdating}
                    >
                      Lưu thông tin
                    </Button>
                  )}
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StaffAccountDetails

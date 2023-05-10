import { FieldTimeOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Col,
  Form,
  List,
  Modal,
  Row,
  Select,
  Spin,
  Tabs,
} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { FaPhone, FaLock, FaUnlockAlt, FaAddressCard } from 'react-icons/fa'
import { GiPositionMarker } from 'react-icons/gi'
import { AiFillEdit, AiTwotoneMail } from 'react-icons/ai'
import './styles.scss'
import CustomerOrders from './components/CustomerOrders'
import CustomerRatings from './components/CustomerRatings'
import { format } from 'date-fns'
import CustomerChatbox from './components/CustomerChatBox'
import {
  useGetOneCustomerQuery,
  useUpdateCustomerMutation,
  useUpdateStatusBlockMutation,
} from '@/services/customerApi'
import { formatPhone, getGenderTitle } from '@/utils/helpers/convert.helper'
import { useGetGuestTypeOpsQuery } from '@/services/guestTypeApi'
import { toast } from 'react-toastify'
import { useGetDocumentQuery } from '@/services/documentApi'
import { DOCUMENT_TYPE, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'

const typeAccOps = [
  {
    label: 'Tài khoản đang bị khóa',
    value: true,
  },
  {
    label: 'Tài khoản đang hoạt động',
    value: false,
  },
]

const CustomerAccountDetails = () => {
  const location = useLocation()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editSelected, setEditSelected] = useState<string>()
  const [activeTab, setActiveTab] = useState('')
  const idGuest = new URLSearchParams(location.search).get('id')
  const { data: detailGuest, isLoading: loading } = useGetOneCustomerQuery(
    { id: Number(idGuest) },
    { skip: !idGuest },
  )
  const { data: avatarImg } = useGetDocumentQuery(
    {
      ref: 'guest',
      refId: Number(idGuest),
      query: `order=id:desc&search=type:=:${DOCUMENT_TYPE.AVATAR}&limit=1`,
    },
    { skip: !Number.isInteger(Number(idGuest)) },
  )

  const { data: typeGuestOps } = useGetGuestTypeOpsQuery()
  const [updateGuest] = useUpdateCustomerMutation()
  const [updateStatusBlock] = useUpdateStatusBlockMutation()
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  useEffect(() => {
    if (isModalOpen)
      form.setFieldsValue({
        status: detailGuest?.isBlocked,
        guestType: detailGuest?.guestType?.id ? detailGuest?.guestType?.id : 1,
      })
  }, [detailGuest, form, isModalOpen])

  const onFinish = (values: any) => {
    try {
      if (values?.status != null) {
        updateStatusBlock({
          id: idGuest,
          body: { isBlocked: values?.status },
        }).then((response: any) => {
          if ('data' in response) {
            toast.success('Chỉnh sửa thông tin thành công!')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa thông tin thất bại!')
          }
          setIsModalOpen(false)
        })
      } else {
        updateGuest({
          id: idGuest,
          body: { guestTypeId: values.guestType },
        }).then((response: any) => {
          if ('data' in response) {
            toast.success('Chỉnh sửa thông tin thành công!')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa thông tin thất bại!')
          }
          setIsModalOpen(false)
        })
      }
    } catch (error) {
      toast.error('Chỉnh sửa thông tin thất bại!')
    }
  }

  //handle Authorize
  const adminInfo = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.customer,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.customer,
        'delete',
      ),
    }
  }, [adminInfo])
  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/khach-hang">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-xl text-black" />
            <p className="text-lg font-bold ml-2">THÔNG TIN KHÁCH HÀNG</p>
          </div>
        </Link>
      </div>
      <Row className="mt-4">
        <Col span={24} lg={{ span: 7 }}>
          <div className="p-6 border border-solid border-grayBorder rounded-md ">
            <Spin spinning={loading}>
              <div className="flex gap-4 flex-wrap ">
                <Avatar src={avatarImg?.data?.[0]?.document.url} size={40} />
                <div>
                  <p className="font-bold text-base">{detailGuest?.name}</p>
                  <div className="flex gap-2 flex-wrap">
                    <p>{getGenderTitle(detailGuest?.gender)}</p>
                    <p>
                      {detailGuest?.dob &&
                        format(new Date(detailGuest?.dob), 'dd/MM/yyyy')}
                    </p>
                    <p>{detailGuest?.cccd}</p>
                  </div>
                </div>
              </div>
              <List itemLayout="horizontal" className="mt-3">
                <List.Item className="justify-start gap-4">
                  <FaPhone />
                  <p>{formatPhone(detailGuest?.phone || '')}</p>
                </List.Item>
                <List.Item className="justify-start gap-4">
                  <AiTwotoneMail />
                  <p>{detailGuest?.email ? detailGuest?.email : 'Chưa rõ'}</p>
                </List.Item>
                <List.Item className="justify-start gap-4">
                  <GiPositionMarker />
                  <p>
                    {detailGuest?.address ? detailGuest?.address : 'Chưa rõ'}
                  </p>
                </List.Item>
                <List.Item className="justify-start gap-4">
                  {detailGuest?.isBlocked ? <FaLock /> : <FaUnlockAlt />}
                  <p>
                    {detailGuest?.isBlocked
                      ? 'Tài khoản đang bị khóa'
                      : 'Tài khoản đang hoạt động'}
                  </p>
                  {authorizeStatus.canEdit && (
                    <Button
                      type="text"
                      icon={<AiFillEdit className="text-lg text-gray-600" />}
                      onClick={() => {
                        setEditSelected('status')
                        setIsModalOpen(true)
                      }}
                    />
                  )}
                </List.Item>
                <List.Item className="justify-start gap-4">
                  <FaAddressCard />
                  <p>
                    {detailGuest?.guestType?.name
                      ? detailGuest?.guestType?.name
                      : 'Khách hàng mới'}
                  </p>
                  {authorizeStatus.canEdit && (
                    <Button
                      type="text"
                      icon={<AiFillEdit className="text-lg text-gray-600" />}
                      onClick={() => {
                        setEditSelected('guestType')
                        setIsModalOpen(true)
                      }}
                    />
                  )}
                </List.Item>
                <List.Item className="justify-start gap-4">
                  <FieldTimeOutlined />
                  <p>
                    {detailGuest?.created_at &&
                      `Tham gia ngày ${format(
                        new Date(detailGuest?.created_at),
                        'dd/MM/yyyy',
                      )}`}
                  </p>
                </List.Item>
              </List>
            </Spin>
          </div>
        </Col>
        <Col span={24} lg={{ span: 16, offset: 1 }}>
          <Tabs
            defaultActiveKey="order"
            onChange={setActiveTab}
            items={[
              {
                label: 'Chuyến hàng',
                key: 'order',
                children: <CustomerOrders idGuest={idGuest} />,
              },
              {
                label: 'Nhắn tin',
                key: 'chat',
                children: (
                  <CustomerChatbox
                    detailGuest={detailGuest}
                    isActiveTab={activeTab === 'chat'}
                  />
                ),
              },
              {
                label: 'Khách hàng đánh giá dịch vụ',
                key: 'rating',
                children: <CustomerRatings idGuest={idGuest} />,
              },
            ]}
          />
        </Col>
        <Modal
          title="Chỉnh sửa thông tin khách hàng"
          open={isModalOpen}
          onCancel={handleCancel}
          okText="Lưu"
          onOk={form.submit}
          cancelText="Hủy"
        >
          <Form layout="vertical" onFinish={onFinish} form={form}>
            {editSelected && editSelected === 'status' ? (
              <Form.Item
                label="Loại tài khoản"
                name="status"
                rules={[
                  { required: true, message: 'Hãy chọn loại tài khoản!' },
                ]}
              >
                <Select options={typeAccOps} />
              </Form.Item>
            ) : (
              <Form.Item
                label="Loại khách hàng"
                name="guestType"
                rules={[
                  { required: true, message: 'Hãy chọn loại khách hàng!' },
                ]}
              >
                <Select options={typeGuestOps} />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Row>
    </div>
  )
}

export default CustomerAccountDetails

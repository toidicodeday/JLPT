import Icon from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  Spin,
  Typography,
} from 'antd'
import React, { useMemo, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from '@/components/inputs/DatePicker'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { ADMIN_NOTI_RECEIVER } from '@/utils/constant/constant'
import { useCreateAdminNotiMutation } from '@/services/adminNotificationApi'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'
import {
  CreatedNotiType,
  GroupMemberType,
} from '@/services/adminNotificationApi/types'
import { get } from 'lodash'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import RichTextEditor from '@/components/RichTextEditor'
import { endOfMinute, isPast } from 'date-fns'

const CheckboxGroup = Checkbox.Group

const AdminNotificationCreation = () => {
  const navigate = useNavigate()
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [form] = Form.useForm()
  const selectedSendType = Form.useWatch('sendedAt', form)
  const selectedSendTime = Form.useWatch('sendTime', form)
  const receiverType = Form.useWatch('receiverType', form)
  const { data: locationOps, isLoading: isLoadingLocationOps } =
    useGetAreaOpsQuery({
      query: `?search=parentId:=:0`,
    })
  const receiverTypeOps = useMemo(
    () => [
      {
        value: ADMIN_NOTI_RECEIVER.guest,
        label: 'Khách hàng',
      },
      {
        value: ADMIN_NOTI_RECEIVER.driverth,
        label: 'Tài xế Thành Hưng',
      },
      {
        value: ADMIN_NOTI_RECEIVER.drivernth,
        label: 'Tài xế đối tác',
      },
      {
        value: ADMIN_NOTI_RECEIVER.admin,
        label: 'Quản lý hệ thống',
      },
    ],
    [],
  )
  const [createNoti, { isLoading: isCreatingNoti }] =
    useCreateAdminNotiMutation()

  const onFinish = async (values: any) => {
    try {
      let createdBody: CreatedNotiType = {
        timeSendNoti: values?.sendedAt === '0' ? null : selectedSendTime,
        sendForm: 'NOTIFICATION',
        title: values.notiTitle,
        content: values.notiContent,
        selectAll: values.receiverType === 'all' ? true : false,
      }
      if (values.receiverType !== 'all') {
        if (values.selectEachAreas) {
          createdBody.workingAreaSetup = values.selectAllAreas
            ? { selectAll: true }
            : {
                selectAll: false,
                workingAreaSelected: values.selectEachAreas as number[],
              }
        }
        if (values.selectEachReceivers) {
          createdBody.groupMemberSetup = values.selectAllReceivers
            ? { selectAll: true }
            : {
                selectAll: false,
                groupMemberSelected:
                  values.selectEachReceivers as GroupMemberType[],
              }
        }
      }
      const createRes = await createNoti(createdBody)
      if ('data' in createRes) {
        toast.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
        navigate('/thong-bao')
      }
      if ('error' in createRes) {
        toast.error(
          get(createRes.error, 'data.error.message')
            ? get(createRes.error, 'data.error.message')
            : MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const onFinishFail = () => {
    setIsValidating(true)
  }
  const handleCancel = () => {
    form.resetFields()
    navigate('/thong-bao')
  }
  const onGroupChange = (
    list: CheckboxValueType[],
    options?: { value: number | string; label: string }[],
    formName?: string,
  ) => {
    if (options && formName)
      form.setFieldValue(formName, options && list.length === options?.length)
  }
  const onAllChange = (
    e: CheckboxChangeEvent,
    options?: { value: number | string; label: string }[],
    formName?: string,
  ) => {
    if (options && formName)
      form.setFieldValue(
        formName,
        e.target.checked ? options?.map(i => i.value) : [],
      )
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/thong-bao">
          <div className="flex items-center">
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              TẠO THÔNG BÁO MỚI
            </Typography>
          </div>
        </Link>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="my-4"
        onFinishFailed={onFinishFail}
        onValuesChange={value => console.log('changed', value)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Thời gian gửi"
            name="sendedAt"
            initialValue={'0'}
            rules={[
              {
                validator() {
                  if (
                    selectedSendType === '0' ||
                    (selectedSendType === '1' && selectedSendTime)
                  ) {
                    return Promise.resolve()
                  }
                  return Promise.reject()
                },
              },
            ]}
            help={
              isValidating && selectedSendType === '1' && !selectedSendTime ? (
                <p className="text-[#EF4444]">{MESSAGES.REQUIRED_ERROR}</p>
              ) : null
            }
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="0">Gửi ngay khi tạo xong</Radio>
                <Radio value="1" className="mt-2">
                  <div className="flex items-center">
                    <Form.Item className="mr-2 my-0">
                      Cài đặt thời gian gửi
                    </Form.Item>
                    <Form.Item name="sendTime" className="my-0">
                      <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        showTime
                        className={`${
                          selectedSendType === '1' ? '' : 'hidden'
                        }`}
                        disabledDate={currentDate =>
                          isPast(endOfMinute(new Date(currentDate)))
                        }
                      />
                    </Form.Item>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="Tiêu đề thông báo"
          name="notiTitle"
          rules={[{ required: true, message: 'Hãy nhập tiêu đề thông báo' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nội dung thông báo"
          name="notiContent"
          rules={[{ required: true, message: MESSAGES.REQUIRED_ERROR }]}
        >
          <RichTextEditor />
        </Form.Item>
        <Form.Item
          label="Đối tượng nhận"
          name="receiverType"
          initialValue={'all'}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="all">
                Tất cả mọi người (bao gồm tất cả khách hàng, tài xế)
              </Radio>
              <Radio value="custom">Lựa chọn đối tượng cụ thể</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Spin spinning={isLoadingLocationOps}>
          <div
            className={`border border-solid border-grayButton p-2 ${
              receiverType === 'custom' ? '' : 'hidden'
            }`}
          >
            <p>Chọn khu vực</p>
            <div className="flex items-center">
              <Form.Item name="selectAllAreas" valuePropName="checked">
                <Checkbox
                  onChange={e => onAllChange(e, locationOps, 'selectEachAreas')}
                >
                  Tất cả khu vực
                </Checkbox>
              </Form.Item>
              <Form.Item name="selectEachAreas">
                <CheckboxGroup
                  options={locationOps}
                  onChange={values =>
                    onGroupChange(values, locationOps, 'selectAllAreas')
                  }
                />
              </Form.Item>
            </div>
            <p>Chọn nhóm người dùng</p>
            <div className="flex items-center">
              <Form.Item name="selectAllReceivers" valuePropName="checked">
                <Checkbox
                  onChange={e =>
                    onAllChange(e, receiverTypeOps, 'selectEachReceivers')
                  }
                >
                  Tất cả
                </Checkbox>
              </Form.Item>
              <Form.Item name="selectEachReceivers" initialValue={[1, 2]}>
                <CheckboxGroup
                  options={receiverTypeOps}
                  onChange={values =>
                    onGroupChange(values, receiverTypeOps, 'selectAllReceivers')
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Spin>
        <Divider />
        <div className="text-right">
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            className="ml-2"
            type="primary"
            htmlType="submit"
            loading={isCreatingNoti}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AdminNotificationCreation

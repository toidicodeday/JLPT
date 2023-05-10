import { DatePicker } from '@/components/inputs'
import {
  useGetOneAdminNotificationQuery,
  useUpdateAdminNotiMutation,
} from '@/services/adminNotificationApi'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { ADMIN_NOTI_RECEIVER, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  Spin,
  Typography,
  Checkbox,
} from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'

import {
  CreatedNotiType,
  GroupMemberType,
} from '@/services/adminNotificationApi/types'
import { get } from 'lodash'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useSelector } from 'react-redux'
import { AdminMeType } from '@/services/accountApi/types'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { selectUserMe } from '@/store/authSlice/selector'
import RichTextEditor from '@/components/RichTextEditor'
import { endOfMinute, isPast } from 'date-fns'

const CheckboxGroup = Checkbox.Group
const AdminNotificationDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [isValidating, setIsValidating] = useState<boolean>(false)
  const idNoti = new URLSearchParams(location.search).get('id')
  const { data: detailNoti, isLoading: isLoadingDetailNoti } =
    useGetOneAdminNotificationQuery({
      id: Number(idNoti),
    })

  const selectedSendTime = Form.useWatch('timeSendNoti', form)
  const selectedSendType = Form.useWatch('sendedAt', form)
  const receiverType = Form.useWatch('receiverType', form)

  const [updateNoti] = useUpdateAdminNotiMutation()
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

  useEffect(() => {
    form.setFieldsValue({
      sendedAt: detailNoti?.data?.timeSendNoti === null ? '0' : '1',
      timeSendNoti: detailNoti?.data?.timeSendNoti
        ? new Date(detailNoti?.data?.timeSendNoti)
        : undefined,
      sendedVia: detailNoti?.data?.sendForm,
      notiTitle: detailNoti?.data?.title,
      notiContent: detailNoti?.data?.content,
      receiverType: detailNoti?.data?.selectAll ? 'all' : 'custom',
    })

    if (detailNoti?.data?.selectAll === false) {
      //setInitValue - chọn khu vực
      if (detailNoti?.data?.workingAreaSetup?.selectAll === true) {
        form.setFieldsValue({
          selectAllAreas: true,
          selectEachAreas: locationOps?.map(i => i.value),
        })
      } else {
        form.setFieldsValue({
          selectEachAreas:
            detailNoti?.data?.workingAreaSetup?.workingAreaSelected,
        })
      }
      //setInitValue - chọn nhóm người dùng
      if (detailNoti?.data?.groupMemberSetup?.selectAll === true) {
        form.setFieldsValue({
          selectAllReceivers: true,
          selectEachReceivers: receiverTypeOps?.map(i => i.value),
        })
      } else {
        form.setFieldsValue({
          selectEachReceivers:
            detailNoti?.data?.groupMemberSetup?.groupMemberSelected,
        })
      }
    }
  }, [detailNoti, form, locationOps, receiverTypeOps])

  const onFinish = async (values: any) => {
    try {
      let body: Partial<CreatedNotiType> = {
        timeSendNoti: values?.sendedAt === '0' ? null : selectedSendTime,
        sendForm: 'NOTIFICATION',
        title: values.notiTitle,
        content: values.notiContent,
        selectAll: values.receiverType === 'all' ? true : false,
      }
      if (values.receiverType !== 'all') {
        if (values.selectEachAreas) {
          body.workingAreaSetup = values.selectAllAreas
            ? { selectAll: true }
            : {
                selectAll: false,
                workingAreaSelected: values.selectEachAreas as number[],
              }
        }
        if (values.selectEachReceivers) {
          body.groupMemberSetup = values.selectAllReceivers
            ? { selectAll: true }
            : {
                selectAll: false,
                groupMemberSelected:
                  values.selectEachReceivers as GroupMemberType[],
              }
        }
      }

      if (idNoti) {
        const createRes = await updateNoti({ id: Number(idNoti), body: body })
        if ('data' in createRes) {
          toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
          navigate('/thong-bao')
        }
        if ('error' in createRes) {
          toast.error(
            get(createRes.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      }
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
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

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.notification,
        'edit',
      ),
    }
  }, [adminInfo])

  const handleCancel = () => {
    form.resetFields()
    navigate('/thong-bao')
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/thong-bao">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-lg text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT THÔNG BÁO
            </Typography>
          </div>
        </Link>
      </div>
      <Spin spinning={isLoadingDetailNoti}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="my-4"
          disabled={detailNoti?.data?.sent || !authorizeStatus.canEdit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Thời gian gửi"
              name="sendedAt"
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
                isValidating &&
                selectedSendType === '1' &&
                !selectedSendTime ? (
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
                      <Form.Item name="timeSendNoti" className="my-0">
                        <DatePicker
                          format="YYYY-MM-DD HH:mm"
                          showTime
                          className={`${
                            selectedSendType === '1' ? '' : 'hidden'
                          } w-full`}
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
            <RichTextEditor
              disabled={detailNoti?.data?.sent || !authorizeStatus.canEdit}
            />
          </Form.Item>
          <Form.Item label="Đối tượng nhận" name="receiverType">
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
                    onChange={e =>
                      onAllChange(e, locationOps, 'selectEachAreas')
                    }
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
              <div className="flex md:items-center flex-col md:flex-row">
                <Form.Item name="selectAllReceivers" valuePropName="checked">
                  <Checkbox
                    onChange={e =>
                      onAllChange(e, receiverTypeOps, 'selectEachReceivers')
                    }
                  >
                    Tất cả
                  </Checkbox>
                </Form.Item>
                <Form.Item name="selectEachReceivers">
                  <CheckboxGroup
                    options={receiverTypeOps}
                    onChange={values =>
                      onGroupChange(
                        values,
                        receiverTypeOps,
                        'selectAllReceivers',
                      )
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
              onClick={() => setIsValidating(true)}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
}

export default AdminNotificationDetails

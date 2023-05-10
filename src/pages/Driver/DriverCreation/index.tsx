import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import UploadImage from '@/components/inputs/UploadImg'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {
  DOCUMENT_TYPE,
  DRIVER_TYPE,
  DRIVER_TYPE_OPTIONS,
  GENDER_OPTIONS,
} from '@/utils/constant/constant'
import { DatePicker, InputPhoneNumber } from '@/components/inputs'
import ThanhHungForm from './ThanhHungForm'
import PartnerForm from './PartnerForm'
import {
  formatDateRequest,
  getDocIDFromUploadForm,
} from '@/utils/helpers/convert.helper'
import {
  useCreatePartnerDriverMutation,
  useCreateTHDriverMutation,
} from '@/services/driverApi'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { every, get } from 'lodash'
import { useCreateDocumentMutation } from '@/services/documentApi'
import { ACCOUNT_META } from '@/components/SendbirdChat/constant/sendbird.constant'
import { SendbirdAvatar } from '@/assets/img'
import { createUserSendBird } from '@/components/SendbirdChat/hooks/userHooks/createSbUser'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'

const DriverCreation = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [documentFail, setDocumentFail] = useState<{
    driverId: number
    images: any[]
  }>()

  const [areaSelected, setAreaSelected] = useState<number>()

  const { data: areaOps } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })

  const [createTHDriver, { isLoading: isCreatingTHDriver }] =
    useCreateTHDriverMutation()
  const [createPartnerDriver, { isLoading: isCreatingPartnerDriver }] =
    useCreatePartnerDriverMutation()
  const [createDocument, { isLoading: isCreatingDocument }] =
    useCreateDocumentMutation()

  const onUpdateImageToDriver = async (
    driverId: number,
    images: { image: any; type: string }[],
  ) => {
    const response = await Promise.all(
      images.map(item =>
        createDocument({
          userId: driverId,
          ref: 'driver',
          type: [item.type],
          docs: [getDocIDFromUploadForm(item.image)],
        }),
      ),
    )
    return response
  }

  const retryImages = async () => {
    const uploadStatus = await onUpdateImageToDriver(
      Number(documentFail?.driverId),
      documentFail?.images || [],
    )
    if (every(uploadStatus, i => 'data' in i)) {
      message.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
    } else {
      message.error('Thử lại không thành công')
    }
    navigate('/quan-ly-xe/tai-xe')
  }

  const handleFailDocument = (
    uploadStatus: any[],
    listImage: any[],
    driverId: number,
  ) => {
    const listFail: any[] = []
    uploadStatus.forEach((i, index) => {
      if ('error' in i) listFail.push(listImage[index])
    })
    setDocumentFail({
      driverId: Number(driverId),
      images: listFail,
    })
  }

  const onCreateThanhHungDriver = (values: any) => {
    const { avatarImg, identifyImgFront, identifyImgBack, driveLicenseImg } =
      values

    const body = {
      name: values.name,
      // phone: values.phone,
      phone: `+84${values.phone}`,
      address: values.address,
      dob: formatDateRequest(values.dob),
      cccd: values.identifyNumber,
      gender: values.gender,
      vehicleId: values.vehicleTH,
      workingAreaId: values.workingAreaId,
      categoryId: values?.thanhHungVCategory,
    }

    createTHDriver(body).then(async response => {
      if ('data' in response) {
        const driverId = Number(response.data?.data?.id)
        const listImage = [
          { type: DOCUMENT_TYPE.AVATAR, image: avatarImg },
          { type: DOCUMENT_TYPE.CCCD_FRONT, image: identifyImgFront },
          { type: DOCUMENT_TYPE.CCCD_BACK, image: identifyImgBack },
          { type: DOCUMENT_TYPE.DRIVER_LICENSE, image: driveLicenseImg },
        ].filter(i => Number.isInteger(getDocIDFromUploadForm(i.image)))

        const uploadStatus = await onUpdateImageToDriver(driverId, listImage)
        if (every(uploadStatus, i => 'data' in i)) {
          message.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
          const bodySendbird = {
            user_id: response?.data?.data?.id,
            nickname: response?.data?.data?.name,
            profile_url: SendbirdAvatar,
            metadata: {
              ROLES: ACCOUNT_META.DRIVER,
            },
          }
          createUserSendBird(bodySendbird)
          navigate('/quan-ly-xe/tai-xe')
        } else {
          handleFailDocument(uploadStatus, listImage, driverId)
        }
      }
      if ('error' in response) {
        message.error(
          get(response?.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    })
  }

  const onCreateThanhHungPartner = (values: any) => {
    const {
      avatarImg,
      identifyImgFront,
      identifyImgBack,
      driveLicenseImg,
      partnerVImg,
      partnerVNumberImg,
      partnerVRegistrationImg,
    } = values

    const body = {
      name: values.name,
      // phone: values.phone,
      phone: `+84${values.phone}`,
      address: values.address,
      dob: formatDateRequest(values.dob) || undefined,
      cccd: values.identifyNumber,
      gender: values.gender,
      licensePlatese: values.partnerLicensePlatese,
      categoryId: values.partnerVCategory,
      vehicleWorkingAreaId: values.workingAreaId,
      contractId: values.contractId,
      applyFrom: formatDateRequest(values.applyFrom) || undefined,
      applyTo: formatDateRequest(values.applyTo) || undefined,
      driverWalletMoney: values.driverWalletMoney,
      workingAreaId: values.workingAreaId,
    }

    createPartnerDriver(body).then(async (response: any) => {
      if ('data' in response) {
        const driverId = Number(response.data?.data?.id)
        const listImage = [
          { type: DOCUMENT_TYPE.AVATAR, image: avatarImg },
          { type: DOCUMENT_TYPE.CCCD_FRONT, image: identifyImgFront },
          { type: DOCUMENT_TYPE.CCCD_BACK, image: identifyImgBack },
          { type: DOCUMENT_TYPE.DRIVER_LICENSE, image: driveLicenseImg },
          { type: DOCUMENT_TYPE.CAR_IMAGE, image: partnerVImg },
          { type: DOCUMENT_TYPE.LICENSE_PLATE, image: partnerVNumberImg },
          {
            type: DOCUMENT_TYPE.VEHICLE_REGISTRATION,
            image: partnerVRegistrationImg,
          },
        ].filter(i => Number.isInteger(getDocIDFromUploadForm(i.image)))
        const uploadStatus = await onUpdateImageToDriver(driverId, listImage)
        if (every(uploadStatus, i => 'data' in i)) {
          message.success(MESSAGES.CALL_API_ADD_NEW_SUCCESS)
          const bodySendbird = {
            user_id: response?.data?.data?.id,
            nickname: response?.data?.data?.name,
            profile_url: SendbirdAvatar,
            metadata: {
              ROLES: ACCOUNT_META.DRIVER,
            },
          }
          console.log(typeof bodySendbird)
          createUserSendBird(bodySendbird)
          navigate('/quan-ly-xe/tai-xe')
        } else {
          handleFailDocument(uploadStatus, listImage, driverId)
        }
      }
      if ('error' in response) {
        message.error(
          get(response?.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    })
  }

  const onFinish = async (values: any) => {
    const { company } = values
    if (company === DRIVER_TYPE.THANHHUNG_DRIVER) {
      onCreateThanhHungDriver(values)
    }
    if (company === DRIVER_TYPE.THANHHUNG_PARTNER) {
      onCreateThanhHungPartner(values)
    }
  }

  return (
    <div className="py-8">
      <Form
        layout="vertical"
        onFinish={onFinish}
        validateMessages={{ required: 'Trường này không được để trống' }}
        initialValues={{
          company: DRIVER_TYPE.THANHHUNG_DRIVER,
        }}
        form={form}
      >
        <div className="p-3 rounded border border-solid border-grayDivider">
          <Typography className="text-base font-bold mb-4">
            THÔNG TIN ĐƠN VỊ
          </Typography>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Đơn vị trực thuộc"
                name="company"
                rules={[{ required: true }]}
              >
                <Select options={DRIVER_TYPE_OPTIONS} />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
        </div>
        <div className="p-3 rounded border border-solid border-grayDivider mt-4">
          <Typography className="text-base font-bold mb-4">
            THÔNG TIN TÀI XẾ
          </Typography>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên tài xế"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true }]}
              >
                <Select options={GENDER_OPTIONS} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <InputPhoneNumber />
              <Form.Item
                label="Ngày sinh"
                name="dob"
                rules={[{ required: true }]}
              >
                <DatePicker format="dd-MM-yyyy" className="w-full" />
              </Form.Item>
              <Form.Item
                label="Số CCCD"
                name="identifyNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Khu vực hoạt động"
                name="workingAreaId"
                rules={[{ required: true }]}
              >
                <Select
                  options={areaOps}
                  onChange={value => {
                    setAreaSelected(value)
                    form.setFieldValue('thanhHungVCategory', undefined)
                    form.setFieldValue('partnerVCategory', undefined)
                    form.setFieldValue('vehicleTH', undefined)
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className="flex flex-wrap gap-x-4">
                <UploadImage
                  label="Ảnh hiển thị"
                  name="avatarImg"
                  errorMess="Hãy upload ảnh hiển thị!"
                  required
                />
                <UploadImage
                  label="CCCD mặt trước"
                  name="identifyImgFront"
                  errorMess="Hãy upload ảnh CCCD mặt trước!"
                  required
                />
                <UploadImage
                  label="CCCD mặt sau"
                  name="identifyImgBack"
                  errorMess="Hãy upload ảnh CCCD mặt sau!"
                  required
                />
                <UploadImage
                  label="Giấy phép lái xe"
                  name="driveLicenseImg"
                  errorMess="Hãy upload ảnh giấy phép lái xe!"
                  required
                />
              </div>
            </Col>
          </Row>
        </div>
        <Form.Item
          noStyle
          shouldUpdate={(prev, next) => prev.company !== next.company}
        >
          {({ getFieldValue }) => {
            const isTHcompany =
              getFieldValue('company') === DRIVER_TYPE.THANHHUNG_DRIVER

            if (isTHcompany)
              return <ThanhHungForm areaSelected={areaSelected} form={form} />
            if (!isTHcompany) return <PartnerForm areaSelected={areaSelected} />
          }}
        </Form.Item>

        <div className="p-3 rounded border border-solid border-grayDivider mt-4">
          <Button
            htmlType="reset"
            onClick={() => navigate('/quan-ly-xe/tai-xe')}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            className="ml-4"
            htmlType="submit"
            loading={
              isCreatingTHDriver ||
              isCreatingPartnerDriver ||
              isCreatingDocument
            }
          >
            Lưu thông tin
          </Button>
        </div>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        pauseOnHover
        theme="colored"
        pauseOnFocusLoss={false}
      />
      <Modal
        open={Boolean(documentFail)}
        title="Cập nhật ảnh bị lỗi"
        onOk={() => retryImages()}
        onCancel={() => navigate('/quan-ly-xe/tai-xe')}
        cancelText="Về danh sách"
        okText="Thử lại"
        closable={false}
        maskClosable={false}
      >
        <p>Bạn có muốn thử lại"</p>
      </Modal>
    </div>
  )
}

export default DriverCreation

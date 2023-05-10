import { DatePicker, UploadImage } from '@/components/inputs'
import { useGetMeQuery } from '@/services/accountApi/account'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useCreateDocumentMutation } from '@/services/documentApi'
import { DocumentT } from '@/services/documentApi/types'
import { useEditDriverMutation } from '@/services/driverApi'
import { DriverType } from '@/services/partnerApi/types'
import { useUpdateVehicleMutation } from '@/services/vehicleApi'

import {
  DOCUMENT_TYPE,
  DRIVER_TYPE,
  GENDER_OPTIONS,
} from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import {
  formatDate,
  getDocIDFromUploadForm,
  getDocumentByType,
} from '@/utils/helpers/convert.helper'
import { Col, Form, Input, message, Modal, Row, Select, Switch } from 'antd'
import { format } from 'date-fns'
import { every, get } from 'lodash'
import React, { useEffect, useState } from 'react'
import PartnerFormDetail from './PartnerFormDetail'
import ThanhHungFormDetail from './ThanhHungFormDetail'
type Props = {
  driverInfo?: DriverType
  driverImages?: DocumentT[] | undefined
  open: boolean
  onClose: (refetch?: boolean) => void
}

const ModalEditDriverInfo = ({
  driverInfo,
  driverImages,
  open,
  onClose,
}: Props) => {
  const [form] = Form.useForm()

  const [areaSelected, setAreaSelected] = useState<number>()
  const [isStatusNotify, setIsStatusNotify] = useState<boolean>()

  const [updateVehicle, { isLoading: isUpdatingVehicle }] =
    useUpdateVehicleMutation()
  const { data: areaOps } = useGetAreaOpsQuery({
    query: '?search=parentId:=:0',
  })
  const { data: userMe } = useGetMeQuery()

  useEffect(() => {
    if (driverImages && driverInfo && open) {
      const [avatarImg, driveLicenseImg, identifyImgFront, identifyImgBack] = [
        DOCUMENT_TYPE.AVATAR,
        DOCUMENT_TYPE.DRIVER_LICENSE,
        DOCUMENT_TYPE.CCCD_FRONT,
        DOCUMENT_TYPE.CCCD_BACK,
      ].map(type => {
        const doc = getDocumentByType(type, driverImages)
        if (doc) return [{ url: doc.document.url }]
        return undefined
      })
      form.setFieldsValue({
        name: driverInfo?.name,
        address: driverInfo?.address,
        gender: driverInfo?.gender,
        phone: driverInfo?.phone,
        dob: driverInfo?.dob ? new Date(driverInfo.dob) : '',
        identifyNumber: driverInfo?.cccd,
        avatarImg,
        driveLicenseImg,
        identifyImgFront,
        identifyImgBack,
        workingAreaId: driverInfo?.workingAreaId,
      })
      driverInfo?.workingAreaId && setAreaSelected(driverInfo?.workingAreaId)
      driverInfo?.notify && setIsStatusNotify(driverInfo?.notify)
      if (driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_DRIVER) {
        form.setFieldsValue({
          vehicleTH: driverInfo?.vehicles && driverInfo?.vehicles[0]?.id,
          thanhHungVCategory:
            driverInfo?.vehicles && driverInfo?.vehicles[0]?.categoryId,
        })
      }
      if (driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_PARTNER) {
        form.setFieldsValue({
          contractId: driverInfo?.contractId,
          applyFrom: driverInfo?.applyFrom && new Date(driverInfo?.applyFrom),
          applyTo: driverInfo?.applyFrom && new Date(driverInfo?.applyFrom),
          driverWalletMoney: driverInfo?.driverWalletMoney,
        })
      }
      if (
        driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_PARTNER &&
        driverInfo?.vehicles &&
        driverInfo?.vehicles?.length > 0
      ) {
        const [partnerVImg, partnerVNumberImg, partnerVRegistrationImg] = [
          DOCUMENT_TYPE.CAR_IMAGE,
          DOCUMENT_TYPE.LICENSE_PLATE,
          DOCUMENT_TYPE.VEHICLE_REGISTRATION,
        ].map(type => {
          const doc = getDocumentByType(type, driverImages)
          if (doc) return [{ url: doc.document.url }]
          return undefined
        })
        form.setFieldsValue({
          partnerLicensePlatese:
            driverInfo?.vehicles && driverInfo?.vehicles[0]?.licensePlatese,
          partnerVCategory:
            driverInfo?.vehicles &&
            driverInfo?.vehicles[0]?.vehicleCategory?.id,
          partnerVImg,
          partnerVNumberImg,
          partnerVRegistrationImg,
        })
      }
    }
  }, [driverImages, driverInfo, form, open])

  const [editDriver, { isLoading: isUpdatingDriver }] = useEditDriverMutation()
  const [createDocument] = useCreateDocumentMutation()

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

  const onFinish = (values: any) => {
    const {
      avatarImg,
      identifyImgFront,
      identifyImgBack,
      driveLicenseImg,
      partnerVImg,
      partnerVNumberImg,
      partnerVRegistrationImg,
    } = values

    if (driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_DRIVER) {
      const data = {
        name: values.name,
        phone: values.phone,
        address: values.address,
        dob: format(new Date(values.dob), 'yyyy-MM-dd'),
        cccd: values.identifyNumber,
        gender: values.gender,
        workingAreaId: values.workingAreaId,
        notify: isStatusNotify,
      }

      const bodyVehicle = {
        driverId: driverInfo?.id,
        workingAreaId: values?.workingAreaId,
        categoryId: values?.thanhHungVCategory,
      }
      editDriver({ id: driverInfo?.id, data }).then(async response => {
        if ('data' in response) {
          const driverId = Number(driverInfo?.id)
          const listImage = [
            { type: DOCUMENT_TYPE.AVATAR, image: avatarImg },
            { type: DOCUMENT_TYPE.CCCD_FRONT, image: identifyImgFront },
            { type: DOCUMENT_TYPE.CCCD_BACK, image: identifyImgBack },
            { type: DOCUMENT_TYPE.DRIVER_LICENSE, image: driveLicenseImg },
          ].filter(i => Number.isInteger(getDocIDFromUploadForm(i.image)))

          const uploadStatus = await onUpdateImageToDriver(driverId, listImage)
          if (every(uploadStatus, i => 'data' in i)) {
            updateVehicle({
              id: values?.vehicleTH,
              body: bodyVehicle,
            }).then((response: any) => {
              if ('data' in response) {
                message.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
                onClose(true)
              } else if ('error' in response) {
                message.error(
                  get(response?.error, 'data.error.message') ||
                    MESSAGES.CALL_API_ERROR,
                )
              }
            })
          }
        }
        if ('error' in response) {
          message.error(
            get(response?.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      })
    } else {
      const data = {
        name: values.name,
        phone: values.phone,
        address: values.address,
        dob: format(new Date(values.dob), 'yyyy-MM-dd'),
        cccd: values.identifyNumber,
        gender: values.gender,
        contractId: values.contractId,
        applyFrom: formatDate(values.applyFrom, 'yyyy-MM-dd') || undefined,
        applyTo: formatDate(values.applyTo, 'yyyy-MM-dd') || undefined,
        driverWalletMoney: values.driverWalletMoney,
        workingAreaId: values?.workingAreaId,
        notify: isStatusNotify,
      }

      const bodyVehicle = {
        licensePlatese: values?.partnerLicensePlatese,
        categoryId: values?.partnerVCategory,
        workingAreaId: values?.workingAreaId,
      }
      editDriver({ id: driverInfo?.id, data }).then(async response => {
        if ('data' in response) {
          const driverId = Number(driverInfo?.id)
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
            updateVehicle({
              id: driverInfo?.vehicles && driverInfo?.vehicles[0]?.id,
              body: bodyVehicle,
            }).then((response: any) => {
              if ('data' in response) {
                message.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
                onClose(true)
              } else if ('error' in response) {
                message.error(
                  get(response?.error, 'data.error.message') ||
                    MESSAGES.CALL_API_ERROR,
                )
              }
            })
          }
        }
        if ('error' in response) {
          message.error(
            get(response?.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      })
    }
  }

  return (
    <Modal
      title="Chỉnh sửa thông tin tài xế"
      open={open}
      onCancel={() => onClose()}
      onOk={() => form.submit()}
      okButtonProps={{ loading: isUpdatingDriver || isUpdatingVehicle }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        validateMessages={{ required: 'Trường này không được để trống' }}
      >
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
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
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
          <Col span={12}>
            <div className="flex mt-3">
              <Switch
                checked={isStatusNotify}
                onChange={() => setIsStatusNotify(s => !s)}
                disabled={!userMe?.data?.isAdmin}
                className={`mr-2 mb-3 ${
                  isStatusNotify ? 'bg-[#63DB6F]' : 'bg-[#9D9999]'
                }`}
              />
              <p
                className={`${
                  isStatusNotify ? 'text-[#35703B]' : 'text-[#D32F2F]'
                }`}
              >
                Tài xế đang {isStatusNotify ? 'bật' : 'tắt'} chế độ nhận chuyến
              </p>
            </div>
          </Col>
          <Col span={24}>
            <div className="flex flex-wrap gap-x-2">
              <UploadImage
                label="Ảnh hiển thị"
                name="avatarImg"
                errorMess="Hãy upload ảnh hiển thị!"
                required
              />
              <UploadImage
                label="Giấy phép lái xe"
                name="driveLicenseImg"
                errorMess="Hãy upload ảnh giấy phép lái xe!"
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
            </div>
          </Col>
          <Col span={24}>
            {driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_DRIVER && (
              <ThanhHungFormDetail
                driverInfo={driverInfo}
                areaSelected={areaSelected}
                form={form}
              />
            )}
          </Col>
          <Col span={24}>
            {driverInfo?.unitKey === DRIVER_TYPE.THANHHUNG_PARTNER && (
              <PartnerFormDetail areaSelected={areaSelected} />
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ModalEditDriverInfo

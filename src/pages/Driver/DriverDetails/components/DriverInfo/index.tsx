import { Avatar, Button, Image, message } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NoImage } from '@/assets/img'
import { useGetOneDriverQuery } from '@/services/partnerApi/partner'
import {
  formatDate,
  formatDateString,
  formatPhone,
  getGenderTitle,
  getLabelFromOps,
  getUnitKeyTitle,
  numberWithComma,
} from '@/utils/helpers/convert.helper'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetDocumentQuery } from '@/services/documentApi'
import ModalEditDriverInfo from './ModalEditDriverInfo'
import { DOCUMENT_TYPE, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { UserOutlined } from '@ant-design/icons'
import { DocumentT } from '@/services/documentApi/types'
import { useGetContractOpsQuery } from '@/services/contractApi'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'

const DriverInfo = () => {
  const location = useLocation()
  const [isVisibleImages, setIsVisibleImages] = useState(false)
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false)
  const driverId = new URLSearchParams(location.search).get('id')
  const { data: areaOptions } = useGetAreaOpsQuery()
  const { data: contractOps } = useGetContractOpsQuery()
  const { data: driverInfo, refetch: refetchDriverInfo } = useGetOneDriverQuery(
    { id: Number(driverId) },
    { skip: !driverId },
  )

  const getSearchImageByType = useCallback(
    (type: string) => {
      return {
        ref: 'driver',
        refId: Number(driverId),
        query: `order=id:desc&search=type:=:${type}&limit=1`,
      }
    },
    [driverId],
  )

  const { data: avatarImg, refetch: refetchAvatar } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.AVATAR),
    { skip: !Number.isInteger(Number(driverId)) },
  )
  const { data: licenseImg, refetch: refetchLicense } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.DRIVER_LICENSE),
    { skip: !Number.isInteger(Number(driverId)) },
  )
  const { data: cccdFrontImg, refetch: refetchCccdFront } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.CCCD_FRONT),
    { skip: !Number.isInteger(Number(driverId)) },
  )
  const { data: cccdBackImg, refetch: refetchCccdBack } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.CCCD_BACK),
    { skip: !Number.isInteger(Number(driverId)) },
  )
  const { data: partnerVImg, refetch: refetchPartnerVImg } =
    useGetDocumentQuery(getSearchImageByType(DOCUMENT_TYPE.CAR_IMAGE), {
      skip: !Number.isInteger(Number(driverId)),
    })
  const { data: partnerVNumberImg, refetch: refetchPartnerVNumberImg } =
    useGetDocumentQuery(getSearchImageByType(DOCUMENT_TYPE.LICENSE_PLATE), {
      skip: !Number.isInteger(Number(driverId)),
    })
  const {
    data: partnerVRegistrationImg,
    refetch: refetchPartnerVRegistrationImg,
  } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.VEHICLE_REGISTRATION),
    {
      skip: !Number.isInteger(Number(driverId)),
    },
  )

  const driverImages = useMemo(() => {
    const list = [
      avatarImg,
      licenseImg,
      cccdFrontImg,
      cccdBackImg,
      partnerVImg,
      partnerVNumberImg,
      partnerVRegistrationImg,
    ]
    const results: DocumentT[] = []
    list.forEach(item => {
      if (item?.total && item?.data?.[0]) results.push(item?.data?.[0])
    })
    return results
  }, [
    avatarImg,
    cccdBackImg,
    cccdFrontImg,
    licenseImg,
    partnerVImg,
    partnerVNumberImg,
    partnerVRegistrationImg,
  ])

  const refetchImages = () => {
    refetchAvatar()
    refetchCccdFront()
    refetchCccdBack()
    refetchLicense()
    refetchPartnerVImg()
    refetchPartnerVNumberImg()
    refetchPartnerVRegistrationImg()
  }

  const info = useMemo(() => {
    return {
      address: driverInfo?.address,
      applyFrom: formatDateString(driverInfo?.applyFrom),
      applyTo: formatDateString(driverInfo?.applyTo),
      cccd: driverInfo?.cccd,
      contract: getLabelFromOps(driverInfo?.contractId, contractOps),
      dob: driverInfo?.dob,
      gender: getGenderTitle(driverInfo?.gender),
      id: driverInfo?.id,
      name: driverInfo?.name,
      phone: driverInfo?.phone,
      unitKey: getUnitKeyTitle(driverInfo?.unitKey),
      vehicleCategoryId: null,
      workingPlace: getLabelFromOps(driverInfo?.workingAreaId, areaOptions),
      walletMoney: numberWithComma(driverInfo?.driverWalletMoney || 0),
      infoVehicle: driverInfo?.vehicles?.map(item => (
        <Link to={`/quan-ly-xe/danh-sach-xe/chi-tiet?id=${item?.id}`}>
          {item.licensePlatese}
          {item.vehicleCategory?.name && `- ${item.vehicleCategory?.name}`}
        </Link>
      )),
    }
  }, [
    areaOptions,
    contractOps,
    driverInfo?.address,
    driverInfo?.applyFrom,
    driverInfo?.applyTo,
    driverInfo?.cccd,
    driverInfo?.contractId,
    driverInfo?.dob,
    driverInfo?.driverWalletMoney,
    driverInfo?.gender,
    driverInfo?.id,
    driverInfo?.name,
    driverInfo?.phone,
    driverInfo?.unitKey,
    driverInfo?.workingAreaId,
    driverInfo?.vehicles,
  ])

  const driverProperty = useMemo(() => {
    return [
      { value: info.name, label: 'Họ và tên' },
      { value: info.phone && formatPhone(info.phone), label: 'Số điện thoại' },
      { value: info.dob && formatDate(info.dob), label: 'Ngày sinh' },
      { value: info.gender, label: 'Giới tính' },
      { value: info.cccd, label: 'Số CCCD' },
      { value: info.address, label: 'Địa chỉ thường trú' },
      { value: info.workingPlace, label: 'Khu vực hoạt động' },
      { value: info.unitKey, label: 'Đơn vị' },
      { value: info.infoVehicle, label: 'Xe đăng ký' },
      { value: info.contract, label: 'Loại hợp đồng' },
      { value: info.walletMoney, label: 'Số tiền trong ví' },
    ]
  }, [
    info.address,
    info.cccd,
    info.contract,
    info.dob,
    info.gender,
    info.infoVehicle,
    info.name,
    info.phone,
    info.unitKey,
    info.walletMoney,
    info.workingPlace,
  ])

  const handleShowDriverImages = () => {
    if (!driverImages?.length) {
      message.destroy()
      message.info('Không có ảnh khả dụng')
    } else {
      setIsVisibleImages(true)
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(adminSystemFuncs, SYSTEM_ROLE_KEY.driver, 'edit'),
    }
  }, [adminInfo])

  return (
    <>
      <div className="flex flex-wrap gap-4 pb-10">
        <div className="w-32 flex flex-col items-center">
          <Avatar src={avatarImg?.data?.[0]?.document.url} size={128}>
            <UserOutlined className="text-5xl mt-8" />
          </Avatar>
          {authorizeStatus.canEdit && (
            <Button
              type="primary"
              className="my-3 mx-auto"
              onClick={() => setIsVisibleEditModal(true)}
            >
              Sửa thông tin
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-y-2 flex-grow">
          {driverProperty.map(({ label, value }) => (
            <div className="flex" key={label}>
              <p className="w-40 font-bold">{label}</p>
              <p className="whitespace-pre-wrap">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <p>File ảnh đính kèm</p>
          <div
            className="relative w-52 h-40 mr-5 cursor-pointer"
            onClick={handleShowDriverImages}
          >
            <div className="absolute w-52 h-40 top-0 left-0">
              <img
                className="absolute w-52 h-40 top-0 left-0 object-contain bg-white border border-solid border-slate-400 shadow-lg "
                src={driverImages?.[0]?.document.url || NoImage}
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-50 bg-white/30" />
            </div>
            <div className="absolute w-52 h-40 top-5 left-5">
              <img
                className="w-full h-full object-contain bg-white border border-solid border-slate-400 shadow-lg"
                src={driverImages?.[1]?.document.url || NoImage}
                alt=""
              />
              <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-50 bg-white/30" />
            </div>

            <div className="w-full h-full absolute left-5 top-5 flex items-center">
              <p className="font-bold text-xl text-center w-full text-white">
                {driverImages?.length} ảnh đính kèm
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: isVisibleImages,
            onVisibleChange: vis => setIsVisibleImages(vis),
            // countRender(current) {
            //   const type = driverImages?.[current - 1]?.type
            //   return getDocumentName(type)
            // },
          }}
        >
          {driverImages.map(item => (
            <Image
              src={item.document.url}
              key={item.id}
              title="akdjnsak"
              fallback={NoImage}
            />
          ))}
        </Image.PreviewGroup>
      </div>
      <ModalEditDriverInfo
        driverInfo={driverInfo}
        driverImages={driverImages}
        open={isVisibleEditModal}
        onClose={isReload => {
          if (isReload) {
            refetchDriverInfo()
            refetchImages()
          }
          setIsVisibleEditModal(false)
        }}
      />
    </>
  )
}

export default DriverInfo

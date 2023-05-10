import { AdminMeType } from '@/services/accountApi/types'
import { useGetAreaListQuery } from '@/services/areaApi/area'
import { useGetDocumentQuery } from '@/services/documentApi'
import {
  useActiveDriverMutation,
  useGetOneDriverQuery,
  useRejectDriverMutation,
} from '@/services/partnerApi/partner'
import { selectUserMe } from '@/store/authSlice/selector'
import { DOCUMENT_TYPE, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { getGenderTitle } from '@/utils/helpers/convert.helper'
import Icon from '@ant-design/icons'
import { Button, Divider, message, Typography } from 'antd'
import { format } from 'date-fns'
import { get, isNumber } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DriverInfo from './components/DriverInfo'
import VehicleInfo from './components/VehicleInfo'

const UNKOWN_INFO = 'Chưa có thông tin'

const PartnerDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const info = useMemo(() => {
    const search = new URLSearchParams(location.search)
    const driverId = search.get('driverId')
    const vehicleId = search.get('vehicleId')
    return { driverId, vehicleId }
  }, [location.search])

  const [activeDriver, { isLoading: isActiving }] = useActiveDriverMutation()
  const [rejedctDriver, { isLoading: isRejecting }] = useRejectDriverMutation()

  const { data: detailDriver } = useGetOneDriverQuery(
    { id: Number(info.driverId) },
    { skip: !isNumber(Number(info.driverId)) },
  )
  const getSearchImageByType = useCallback(
    (type: string) => {
      return {
        ref: 'driver',
        refId: Number(info.driverId),
        query: `order=id:desc&search=type:=:${type}&limit=1`,
      }
    },
    [info.driverId],
  )
  const { data: avatarImg } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.AVATAR),
    { skip: !Number.isInteger(Number(info.driverId)) },
  )
  const { data: cccdBackImg } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.CCCD_BACK),
    { skip: !Number.isInteger(Number(info.driverId)) },
  )
  const { data: cccdFrontImg } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.CCCD_FRONT),
    { skip: !Number.isInteger(Number(info.driverId)) },
  )
  const { data: licensePlatese } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.LICENSE_PLATE),
    { skip: !Number.isInteger(Number(info.driverId)) },
  )
  const { data: driverLicense } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.DRIVER_LICENSE),
    {
      skip: !Number.isInteger(Number(info.driverId)),
    },
  )
  const { data: vehicleRegistration } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.VEHICLE_REGISTRATION),
    {
      skip: !Number.isInteger(Number(info.driverId)),
    },
  )
  const { data: vehicleImg } = useGetDocumentQuery(
    getSearchImageByType(DOCUMENT_TYPE.CAR_IMAGE),
    {
      skip: !Number.isInteger(Number(info.driverId)),
    },
  )
  const { data: workingAreaList } = useGetAreaListQuery({
    query: `?page=1&limit=1000&search=${encodeURIComponent('parentId:=:0')}`,
  })

  const getWorkingAreaName = useCallback(
    (areaId?: number) => {
      if (
        workingAreaList &&
        workingAreaList?.data &&
        workingAreaList.data.filter(i => i.id === areaId) &&
        workingAreaList.data.filter(i => i.id === areaId)?.length > 0
      )
        return workingAreaList.data.filter(i => i.id === areaId)[0].name
      else return 'Chưa rõ'
    },
    [workingAreaList],
  )

  const driverInfo = useMemo(() => {
    return {
      name: detailDriver?.name,
      phone: detailDriver?.phone,
      dob: detailDriver?.dob
        ? format(new Date(detailDriver?.dob), 'dd/MM/yyyy')
        : UNKOWN_INFO,
      gender: getGenderTitle(detailDriver?.gender),
      identity: detailDriver?.cccd || UNKOWN_INFO,
      address: detailDriver?.address || UNKOWN_INFO,
      avatar: avatarImg?.data?.[0]?.document.url,
      cccdfrontUrl: cccdFrontImg?.data?.[0]?.document.url,
      cccdbackUrl: cccdBackImg?.data?.[0]?.document.url,
    }
  }, [avatarImg?.data, cccdBackImg?.data, cccdFrontImg?.data, detailDriver])

  const vehicle = useMemo(() => {
    const firstVehicle = detailDriver?.vehicles?.[0]
    return {
      licensePlatese: firstVehicle?.licensePlatese || UNKOWN_INFO,
      vehicleCategory: firstVehicle?.vehicleCategory?.name || UNKOWN_INFO,
      workingArea: getWorkingAreaName(firstVehicle?.workingAreaId),
      licensePlateUrl: licensePlatese?.data?.[0]?.document.url,
      vehicleUrl: vehicleImg?.data?.[0]?.document.url,
      registrationUrl: vehicleRegistration?.data?.[0]?.document.url,
      driverLicense: driverLicense?.data?.[0]?.document.url,
    }
  }, [
    detailDriver?.vehicles,
    driverLicense?.data,
    getWorkingAreaName,
    licensePlatese?.data,
    vehicleImg?.data,
    vehicleRegistration?.data,
  ])

  const handleActiveDriver = () => {
    activeDriver({
      driverId: Number(info.driverId),
    })
      .then(res => {
        if ('data' in res) {
          message.success('Phê duyệt thành công')
          navigate('/doi-tac')
        } else if ('error' in res) {
          message.error(
            get(res?.error, 'data.error.message') || 'Có lỗi xảy ra',
          )
        }
      })
      .catch(error => {
        message.error(error?.message || 'Có lỗi xảy ra')
      })
  }

  const handleRejectDriver = () => {
    rejedctDriver({
      driverId: Number(info.driverId),
    })
      .then(res => {
        if ('data' in res) {
          message.error('Từ chối thành công')
          navigate('/doi-tac')
        } else if ('error' in res) {
          message.error(
            get(res?.error, 'data.error.message') || 'Có lỗi xảy ra',
          )
        }
      })
      .catch(error => {
        message.error(error?.message || 'Có lỗi xảy ra')
      })
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.partner,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.partner,
        'delete',
      ),
    }
  }, [adminInfo])
  return (
    <div className="pb-4">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/doi-tac/">
          <div className="flex items-center">
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              ĐƠN ĐĂNG KÝ CỦA ĐỐI TÁC {driverInfo?.name?.toUpperCase()}
            </Typography>
          </div>
        </Link>
      </div>
      <DriverInfo driverInfo={driverInfo} />
      <VehicleInfo vehicle={vehicle} />
      <Divider />
      {authorizeStatus.canEdit && (
        <div className="flex justify-end">
          <Button
            onClick={handleRejectDriver}
            disabled={detailDriver?.status !== 1}
            loading={isRejecting}
          >
            Không phê duyệt
          </Button>
          <Button
            className="ml-2"
            type="primary"
            onClick={handleActiveDriver}
            disabled={detailDriver?.status !== 1}
            loading={isActiving}
          >
            Phê duyệt
          </Button>
        </div>
      )}
    </div>
  )
}

export default PartnerDetails

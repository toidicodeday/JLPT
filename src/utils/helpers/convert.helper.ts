import {
  BillDetailsType,
  OrderBillDetailsType,
} from './../../services/orderApi/types'
import { OrderLocationType } from '@/services/orderApi/types'
import { DocumentT } from '@/services/documentApi/types'
import { isNil, isString } from 'lodash'
import { format } from 'date-fns'
import {
  DOCUMENT_TYPE,
  DRIVER_TYPE,
  GENDER,
  ORDER_CANCEL_REASON,
  ORDER_CANCEL_REF,
} from '../constant/constant'
import { SelectOptionType } from '@/services/commonResposntType'
import { GoogleDistanceType } from '@/services/mapApi/types'
import { ExpectFeeResponseType } from '@/services/feeApi/types'

export function convertSlug(str: string) {
  let string = str
  string = string.toLowerCase()
  string = string.normalize('NFD')
  string = string.replace(/[\u0300-\u036f]/g, '')
  string = string.replace(/[đĐ]/g, 'd')
  string = string.replace(/([^0-9a-z-\s])/g, '')
  string = string.replace(/(\s+)/g, '-')
  string = string.replace(/^-+|-+$/g, '')
  return string
}
export const numberWithComma = (number: number) => {
  const defix = number % 1
  const floorNumber = Math.floor(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (defix) return `${floorNumber}.${defix.toFixed(2).split('.')[1]}`
  return floorNumber
}
export const objToQueryStr = (object: any) => {
  return Object.keys(object)
    .map((item: string) => {
      if (object[item] !== null && object[item] !== undefined)
        return `${item}=${object[item]}&`
      return ''
    })
    .join('')
}
export const checkPath = (path: string) => {
  let newPath = ''
  if (path.includes('//')) {
    newPath = checkPath(path.replaceAll('//', '/'))
  } else {
    newPath = path
  }
  return newPath
}
export const getGenderTitle = (key?: string) => {
  if (!isString(key)) return ''
  switch (key) {
    case GENDER.MALE:
      return 'Nam'
    case GENDER.FEMALE:
      return 'Nữ'
    default:
      return ''
  }
}
export const getUnitKeyTitle = (key?: string) => {
  if (!isString(key)) return ''
  switch (key) {
    case DRIVER_TYPE.THANHHUNG_DRIVER:
      return 'Tài xế của Thành Hưng'
    case DRIVER_TYPE.THANHHUNG_PARTNER:
      return 'Đối tác của Thành Hưng'
    default:
      return ''
  }
}
export const getWorkingAreaTitle = (key?: number | string) => {
  if (isNil(key)) return ''
  switch (key) {
    case 1:
      return 'Hà Nội'
    case 0:
      return 'Hồ Chí Minh'
    default:
      return ''
  }
}
export const formatPhone = (phone: string) => {
  let newPhone
  if (phone != null && phone.length) {
    newPhone = phone.replace('+84', '0').replace(/[^\d]/g, '')

    if (newPhone.length === 10) {
      return newPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }
  }
  return newPhone
}
export const getDocumentByType = (type: string, document?: DocumentT[]) => {
  return document?.find(i => i.type === type)
}
export const getDocumentName = (type?: string) => {
  switch (type) {
    case DOCUMENT_TYPE.AVATAR:
      return 'Ảnh avatar'
    case DOCUMENT_TYPE.CAR_IMAGE:
      return 'Ảnh xe'
    case DOCUMENT_TYPE.CCCD_BACK:
      return 'Căn cước công dân'
    case DOCUMENT_TYPE.CCCD_FRONT:
      return 'Căn cước công dân'
    case DOCUMENT_TYPE.DRIVER_LICENSE:
      return 'Bằng lái xe'
    case DOCUMENT_TYPE.LICENSE_PLATE:
      return 'Biển số xe'
    case DOCUMENT_TYPE.SIGNATURE:
      return 'Chữ ký'
    case DOCUMENT_TYPE.VEHICLE_REGISTRATION:
      return 'Giấy tờ xe'
    default:
      return ''
  }
}
export const formatDateRequest = (value?: string) => {
  try {
    if (value) return format(new Date(value), 'dd/MM/yyyy')
    return ''
  } catch {
    return ''
  }
}
export const formatDateString = (value?: string | null) => {
  try {
    if (value) return format(new Date(value), 'dd/MM/yyyy')
    return ''
  } catch {
    return ''
  }
}
export const getUrlFromUploadForm = (files?: any[]) => {
  try {
    return files?.[0]?.url || files?.[0]?.response || ''
  } catch (error) {
    return ''
  }
}
export const getDocIDFromUploadForm = (files?: any[]) => {
  try {
    return files?.[0]?.response?.docId || ''
  } catch (error) {
    return ''
  }
}
export const getLabelFromOps = (
  value: string | number | null | undefined,
  options: SelectOptionType[] | undefined,
) => {
  const op = options?.find(i => i.value === value)
  return op?.label || ''
}
export const addAllOpsToFilterOps = (
  opsArr?: any[],
  initPlaceHolder?: string,
) => {
  if (opsArr && opsArr?.length > 0) {
    return [
      {
        id: 'all',
        value: 'all',
        label: initPlaceHolder,
        isSelected: true,
      },
      ...opsArr.map(
        (item: {
          id?: string | number
          value?: string | number
          label?: string
        }) => ({
          id: item?.id ? item?.id : item?.value,
          value: item?.value,
          label: item?.label,
          isSelected: false,
        }),
      ),
    ]
  } else {
    return [
      {
        id: 'all',
        value: 'all',
        label: initPlaceHolder,
        isSelected: true,
      },
    ]
  }
}
export const formatDateTimeRequest = (value?: string | null) => {
  try {
    if (value) return format(new Date(value), 'dd/MM/yyyy HH:mm')
    return ''
  } catch {
    return ''
  }
}
export const getHistoryLabel = (status: number) => {
  switch (status) {
    case 1:
      return 'Gửi yêu cầu'
    case 2:
      return 'Gửi yêu cầu'
    case 3:
      return 'Hoàn thành tư vấn'
    case 4:
      return 'Tài xế bắt đầu đến địa điểm lấy hàng'
    case 5:
      return 'Tài xế đến địa điểm lấy hàng'
    case 6:
      return 'Tài xế bắt đầu giao hàng'
    case 7:
      return 'Tài xế giao hàng thành công'
    case 8:
      return 'Đơn hàng bị huỷ'
    case 9:
      return 'Tài xế giao hàng thất bại'
    case 10:
      return 'Tài xế nhận chuyến hàng'
    case 23:
      return 'Khách hàng đã ký thanh lý hợp đồng'
    default:
      return ''
  }
}
/**
 * @param date : string
 * @param type : default 'dd/MM/yyyy'
 * @returns string
 */
export const formatDate = (date: string | null, type?: string) => {
  if (!date) return ''
  return format(new Date(date), type || 'dd/MM/yyyy')
}
export const getSbUserId = (
  id: number | null | undefined,
  type?: 'admin' | 'guest' | 'driver',
) => {
  if (!id) return ''
  switch (type) {
    case 'admin':
      return `admin_${id}`
    case 'guest':
      return `guest_${id}`
    case 'driver':
      return `driver_${id}`
    default:
      return `admin_${id}`
  }
}
export const getCancelRef = (ref: 'admin' | 'guest' | 'driver' | undefined) => {
  switch (ref) {
    case 'admin':
      return ORDER_CANCEL_REF.admin
    case 'guest':
      return ORDER_CANCEL_REF.guest
    case 'driver':
      return ORDER_CANCEL_REF.driver
    default:
      return ''
  }
}
export const getOrderCancelReason = (id: string) => {
  switch (id) {
    case '0':
      return ORDER_CANCEL_REASON[0]
    case '1':
      return ORDER_CANCEL_REASON[1]
    case '2':
      return ORDER_CANCEL_REASON[2]
    case '3':
      return ORDER_CANCEL_REASON[3]
    case '4':
      return ORDER_CANCEL_REASON[4]
    default:
      return 'Không rõ'
  }
}
export const getBillTotal = (billDetails?: BillDetailsType[]) => {
  if (!billDetails || billDetails?.length === 0) return 0
  if (billDetails && billDetails?.length > 0) {
    const nonPRMFee = billDetails
      ?.filter(item => item?.key !== 'PRM' && item?.key !== 'UDC')
      ?.reduce(
        (total: number, item) =>
          item?.price ? total + Number(item?.price) : total,
        0,
      )
    const PRMFee = billDetails
      ?.filter(item => item?.key === 'PRM')
      ?.reduce(
        (total: number, item) =>
          item?.price ? total + Number(item?.price) : total,
        0,
      )
    const UDCFee = billDetails
      ?.filter(item => item?.key === 'UDC')
      ?.reduce(
        (total: number, item) =>
          item?.price ? total + Number(item?.price) : total,
        0,
      )
    return nonPRMFee - PRMFee - UDCFee
  }
}
export const getLatLongStr = (orderLocationArr?: OrderLocationType[]) => {
  if (orderLocationArr && orderLocationArr?.length > 1) {
    return {
      origin: orderLocationArr
        ?.map(item => `${item.latitude} ${item.longitude}`)
        ?.filter((_, index) => index < orderLocationArr?.length - 1)
        .join(' | '),
      destination: orderLocationArr
        ?.map(item => `${item.latitude} ${item.longitude}`)
        ?.filter((_, index) => index > 0)
        .join(' | '),
    }
  }
  return null
}
export const getDistanceFromMap = (
  distanceRes?: {
    elements: GoogleDistanceType[]
  }[],
) => {
  if (distanceRes && distanceRes?.length > 0) {
    return distanceRes
      .map((item: any, index: number) => item.elements[index].distance.value)
      .reduce((total: number, item: number) => total + item, 0)
  }
  return null
}
export const getTotalFromFeeDetails = (
  feeArr: OrderBillDetailsType[],
  type: 'price' | 'quantity',
) => {
  if (!feeArr || feeArr?.length === 0) {
    return 0
  } else {
    if (type === 'price') {
      return feeArr.reduce(
        (total: number, item) =>
          item?.price ? total + Number(item?.price) : total,
        0,
      )
    } else if (type === 'quantity') {
      return feeArr.reduce(
        (total: number, item) =>
          item?.quantity ? total + Number(item?.quantity) : total,
        0,
      )
    }
  }
}
export const getTotalFromBillDetails = (feeArr?: OrderBillDetailsType[]) => {
  if (!feeArr || feeArr?.length === 0) {
    return 0
  } else {
    return feeArr.reduce((total: number, item) => {
      if (item.type !== 'PRM' && item?.type !== 'UDC') {
        return item?.price ? total + Number(item?.price) : total
      } else {
        return item?.price ? total - Number(item?.price) : total
      }
    }, 0)
  }
}
export const convertVietnamese = (str?: string | null) => {
  if (str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, m => (m === 'đ' ? 'd' : 'D'))
      .toLocaleLowerCase()
  } else return ''
}
export const GetTotalFromExpectFee = (feeArr: ExpectFeeResponseType[]) => {
  if (!feeArr || feeArr?.length === 0) {
    return 0
  } else {
    return feeArr.reduce((total: number, item) => {
      if (item.key !== 'PRM' && item.key !== 'UDC') {
        return item?.price ? total + Number(item?.price) : total
      } else {
        return item?.price ? total - Number(item?.price) : total
      }
    }, 0)
  }
}
export const convertToPhone84 = (phoneString: string) => {
  if (phoneString.startsWith('+84')) return phoneString
  return '+84' + phoneString
}
export const isJsonString = (str: any) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
export const convertPhoneToSearchStr = (phoneString: string) => {
  const nonSpacePhoneStr = phoneString.replace(/\s/g, '')
  if (nonSpacePhoneStr.startsWith('+84'))
    return nonSpacePhoneStr.replace('+84', '')
  if (nonSpacePhoneStr.substring(0, 1) === '0')
    return nonSpacePhoneStr.replace('0', '')
  return nonSpacePhoneStr
}
export const checkExistenceInArr = (
  checkItem: any,
  array: any,
  checkKey: string,
) => {
  return array.filter((item: any) => item[checkKey] === checkItem[checkKey]) &&
    array.filter((item: any) => item[checkKey] === checkItem[checkKey]).length >
      0
    ? true
    : false
}

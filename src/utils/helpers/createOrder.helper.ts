import Cookies from 'js-cookie'
import { TEMP_ORDER_CODE } from '../constant/constant'

export const hasCurrentTxOrderCode = () => {
  const orderCode = Cookies.get(TEMP_ORDER_CODE.TEMP_TX_CODE)
  return orderCode ? true : false
}

export const hasCurrentCnOrderCode = () => {
  const orderCode = Cookies.get(TEMP_ORDER_CODE.TEMP_CN_CODE)
  return orderCode ? true : false
}

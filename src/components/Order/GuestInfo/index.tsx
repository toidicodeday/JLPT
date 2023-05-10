import { CustommerType } from '@/services/customerApi/types'
import { formatPhone } from '@/utils/helpers/convert.helper'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'

interface Props {
  guestDetails: CustommerType | undefined
}

const GuestInfo = ({ guestDetails }: Props) => {
  return (
    <div className="mt-4 p-4 border border-solid border-blue-100 rounded-md flex bg-blue-100 text-blue-600">
      <MdAccountCircle className="text-xl" />
      <span className="ml-2">Khách hàng:</span>
      <span className="ml-2">
        {guestDetails?.name ? guestDetails?.name : 'Chưa rõ thông tin'}
      </span>
      <span className="ml-2">-</span>
      <span className="ml-2">Số điện thoại:</span>
      <span className="ml-2">
        {guestDetails?.phone
          ? formatPhone(guestDetails?.phone)
          : 'Chưa rõ thông tin'}
      </span>
    </div>
  )
}

export default GuestInfo

import { OrderDetailsType } from '@/services/orderApi/types'
import {
  formatDateTimeRequest,
  getCancelRef,
  getOrderCancelReason,
} from '@/utils/helpers/convert.helper'
import React from 'react'

interface Props {
  data?: OrderDetailsType
}

const CancelLabel = ({ data }: Props) => {
  return (
    <div>
      {data?.status === 8 && (
        <div className="bg-redBackground px-4 py-6">
          <div className="text-primary">ĐƠN HÀNG ĐÃ BỊ HUỶ</div>
          <div>
            {`Huỷ bởi: ${getCancelRef(data?.orderCancelByRef)} ${
              data?.orderCancelBy?.name
            } - Thời gian: ${formatDateTimeRequest(data?.updatedAt)}`}
          </div>
          <div>
            {`Lý do: ${
              data?.orderCancelByRef === 'admin'
                ? data?.orderCancelReasons
                    ?.map(item => item.reason)
                    ?.join(' - ')
                : data?.orderCancelReasons
                    ?.map(item => getOrderCancelReason(item?.reason))
                    ?.join(' - ')
            }`}
          </div>
        </div>
      )}
      {data?.status === 9 && (
        <div className="bg-redBackground px-4 py-6">
          <div className="text-primary">ĐƠN HÀNG THẤT BẠI</div>
          <div>Lý do: {data?.failReason}</div>
        </div>
      )}
    </div>
  )
}

export default CancelLabel

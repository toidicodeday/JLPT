import { useUpdateOrderDetailsMutation } from '@/services/orderApi/order'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { SyncOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Tag } from 'antd'
import { get } from 'lodash'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  orderCode: string | undefined
  autoFinding: boolean | undefined
}

const NoDriverInfo = ({ setOpen, orderCode, autoFinding }: Props) => {
  const [updateOrder] = useUpdateOrderDetailsMutation()
  const handleChangeManualAssignDriver = async () => {
    try {
      const updateRes = await updateOrder({
        id: orderCode,
        body: {
          driverFinding: false,
        },
      })
      if ('data' in updateRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
      }
      if ('error' in updateRes) {
        toast.error(
          get(updateRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    } catch (err) {
      toast.error(get(err, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  return (
    <div className="w-full xl:flex xl:justify-between xl:items-center">
      <div className="flex-1 text-center xl:text-left">
        {autoFinding && (
          <Tag color="green">
            <SyncOutlined spin />
            <span>Hệ thống đang tìm tài xế</span>
          </Tag>
        )}
        {!autoFinding && <Tag color="volcano">Gán tài xế thủ công</Tag>}
        <p className="mt-2">Chưa có tài xế nhận chuyến</p>
      </div>
      {autoFinding && (
        <div className="text-center xl:text-left">
          <Popconfirm
            title="Bạn có chắc chắn chuyển sang gán tài xế thủ công?"
            okText="Chắc chắn"
            cancelText="Quay lại"
            onConfirm={handleChangeManualAssignDriver}
            placement="topRight"
          >
            <Button className="border border-dashed border-grayButton rounded-md hover:border-primary">
              Gán tài xế thủ công
            </Button>
          </Popconfirm>
        </div>
      )}
      {!autoFinding && (
        <div className="text-center xl:text-left">
          <Button type="dashed" className="mt-2" onClick={() => setOpen(true)}>
            Chọn tài xế
          </Button>
        </div>
      )}
    </div>
  )
}

export default NoDriverInfo

import { Avatar, Button, Tag, Typography } from 'antd'
import React, { useMemo } from 'react'
import { useGetDocumentQuery } from '@/services/documentApi'
import { get, isNumber } from 'lodash'
import { useGetOneDriverQuery } from '@/services/partnerApi/partner'
import { DOCUMENT_TYPE, STATUS_ORDER } from '@/utils/constant/constant'
import { formatPhone } from '@/utils/helpers/convert.helper'
import { AiFillDelete } from 'react-icons/ai'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { useRemoveDriverMutation } from '@/services/orderApi/order'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { toast } from 'react-toastify'

interface Props {
  removable: boolean
  received: boolean
  driverId?: number
  vehicleId?: number
  licensePlatese?: string
  orderVehicleChoosesId?: number
  // authorizeStatus: { [key: string]: boolean }
  editPermission: boolean
  driverStatus?: number
}

const OrderDriverCpnt = ({
  removable,
  received,
  driverId,
  vehicleId,
  licensePlatese,
  orderVehicleChoosesId,
  editPermission,
  driverStatus,
}: Props) => {
  const [openConfirmModal, setOpenConfirmModal] = React.useState<boolean>(false)
  const { data: driverAvatar } = useGetDocumentQuery(
    {
      ref: 'driver',
      refId: Number(driverId),
      query: `limit=1&order=id:desc&search=type:=:${DOCUMENT_TYPE.AVATAR}`,
    },
    { skip: !isNumber(Number(driverId)) },
  )
  const { data: driverDetails } = useGetOneDriverQuery(
    { id: Number(driverId) },
    { skip: !isNumber(Number(driverId)) },
  )
  const driverInfo = useMemo(() => {
    return {
      avatar: driverAvatar?.data?.[0]?.document.url,
      name: driverDetails?.name,
      phone: driverDetails?.phone,
      vehicle: licensePlatese,
    }
  }, [driverAvatar?.data, driverDetails, licensePlatese])
  const [removeDriver, { isLoading }] = useRemoveDriverMutation()
  const handleRemoveDriver = async () => {
    try {
      const removeRes = await removeDriver({
        vehicleChooseId: Number(orderVehicleChoosesId),
      })
      if ('data' in removeRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpenConfirmModal(false)
      }
      if ('error' in removeRes)
        toast.error(
          get(removeRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  return (
    <div className="flex-1 flex items-center">
      <Avatar src={driverInfo.avatar} size={64} />
      <div className="ml-4 flex-1">
        <div className="block xl:hidden mb-2 xl:mb-0">
          {removable && driverStatus === STATUS_ORDER.CANCEL && (
            <Tag color="red">Tài xế hủy nhận chuyến</Tag>
          )}
          {driverStatus !== STATUS_ORDER.CANCEL && removable && (
            <Tag color={received ? '#35703B' : '#F99233'}>
              {received ? 'Đã nhận chuyến' : 'Chưa nhận chuyến'}
            </Tag>
          )}
        </div>
        <Typography className="mt-1">
          Tài xế: <span className="font-bold mt-1"> {driverInfo.name}</span>
        </Typography>
        <Typography className="mt-1">
          {driverInfo.phone ? formatPhone(driverInfo.phone) : 'Chưa rõ SĐT'}
        </Typography>
        <Typography>{driverInfo.vehicle}</Typography>
      </div>
      <div className="items-center flex">
        {driverStatus === STATUS_ORDER.CANCEL && (
          <Tag color="red" className="hidden xl:inline-block">
            Tài xế hủy nhận chuyến
          </Tag>
        )}
        {driverStatus !== STATUS_ORDER.CANCEL && (
          <Tag
            color={received ? '#35703B' : '#F99233'}
            className="hidden xl:inline-block"
          >
            {received ? 'Đã nhận chuyến' : 'Chưa nhận chuyến'}
          </Tag>
        )}
        {editPermission && removable && (
          <>
            <Button
              type="text"
              onClick={() => setOpenConfirmModal(true)}
              icon={<AiFillDelete className="text-lg text-primary" />}
            />
          </>
        )}
      </div>

      <ConfirmModal
        setIsModalOpen={setOpenConfirmModal}
        isModalOpen={openConfirmModal}
        onSubmit={handleRemoveDriver}
        okText="Huỷ chọn tài xế"
        cancelText="Quay lại"
        modalTitle="Xác nhận huỷ chọn tài xế"
        message="Bạn có chắc chắn huỷ chọn tài xế cho chuyến hàng hiện tại?"
        isDeleting={isLoading}
      />
    </div>
  )
}

export default OrderDriverCpnt

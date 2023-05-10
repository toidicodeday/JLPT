import { Modal } from 'antd'
import React from 'react'
import { useGetVehiclesListForOrderQuery } from '@/services/vehicleApi'
import LazyLoadAutocomplete from '../LazyLoadAutocomplete'
import { STATUS_DRIVER } from '@/utils/constant/constant'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
  handleSubmit: (values: any) => void
  orderCode?: string
  categoryId?: number
  isUpdating: boolean
}

const ChooseDriverModal = (props: Props) => {
  const [choosenVehicleId, setChoosenVehicleId] = React.useState<number | null>(
    null,
  )
  return (
    <Modal
      title="Chọn tài xế cho chuyến hàng"
      open={props.open}
      onOk={() => {
        props.handleSubmit(choosenVehicleId)
      }}
      onCancel={() => props.setOpen(false)}
      okText="Gán tài xế cho chuyến hàng"
      cancelText="Huỷ"
      okButtonProps={{ disabled: props.isUpdating || !choosenVehicleId }}
    >
      <LazyLoadAutocomplete
        rtk={{ useGetQuery: useGetVehiclesListForOrderQuery }}
        arg={{
          endPoint: { orderCode: props?.orderCode },
          search: `categoryId:=:${props?.categoryId};status:=:PUBLISH;driver.status:=:${STATUS_DRIVER.ACTIVE}`,
        }}
        queryAttributeName="orderCode"
        setChoosenVehicleId={setChoosenVehicleId}
      />
    </Modal>
  )
}

export default ChooseDriverModal

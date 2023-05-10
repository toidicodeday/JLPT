import { Modal, Typography } from 'antd'
import React from 'react'

interface Props {
  open: boolean
  setOpen: (type: boolean) => void
  detailCall?: any
}

const CallDetailsModal = (props: Props) => {
  return (
    <Modal
      title="Chi tiết cuộc gọi"
      open={props.open}
      onCancel={() => props.setOpen(false)}
      destroyOnClose={true}
      footer={false}
    >
      <div className="flex items-center mb-4">
        <Typography className="ml-4">
          <span className="mr-4">
            Khách hàng: {props.detailCall?.guest?.name}
          </span>{' '}
          Tài xế: {props.detailCall?.driver?.name}
        </Typography>
      </div>
      <audio controls className="w-full">
        <source src={props.detailCall?.url} />
      </audio>
    </Modal>
  )
}

export default CallDetailsModal

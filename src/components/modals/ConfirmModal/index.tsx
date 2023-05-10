import { Modal, Typography } from 'antd'
import React from 'react'

interface Props {
  setIsModalOpen: (type: boolean) => void
  isModalOpen: boolean
  onSubmit: () => void
  okText: string
  cancelText: string
  modalTitle: string
  message: string
  isDeleting?: boolean
}

const ConfirmModal = (props: Props) => {
  const handleCancel = () => {
    if (!props.isDeleting) props.setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title={props.modalTitle}
        open={props.isModalOpen}
        onCancel={handleCancel}
        okText={props.okText}
        cancelText={props.cancelText}
        onOk={props.onSubmit}
        okButtonProps={{ loading: props.isDeleting }}
        cancelButtonProps={{ disabled: props.isDeleting }}
      >
        <Typography>{props.message}</Typography>
      </Modal>
    </>
  )
}

export default ConfirmModal

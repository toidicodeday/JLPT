import { Button, Divider, Form, Input, Modal } from 'antd'
import React from 'react'

const { TextArea } = Input

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (cancelStr: string) => void
  isCanceling: boolean
}

const CancelReasonModal = ({
  open,
  setOpen,
  handleSubmit,
  isCanceling,
}: Props) => {
  const handleCancel = () => {
    setOpen(false)
  }
  const onSubmit = (values: any) => {
    handleSubmit(values?.reason)
  }
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Lý do huỷ chuyến"
      footer={false}
    >
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item name="reason" label="Nhập lý do huỷ chuyến">
          <TextArea rows={4} />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCanceling}>
            Huỷ chuyến
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CancelReasonModal

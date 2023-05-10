import { useTypedDispatch, useTypedSelector } from '@/store'
import { closeChatModel } from '@/store/chatSlice'
import { selectChatSlice } from '@/store/chatSlice/selector'
import { Modal } from 'antd'
import React from 'react'
import ChatBox from '../ChatBox'

type Props = {}

const ModalChat = (props: Props) => {
  const chatInfo = useTypedSelector(selectChatSlice)
  const dispatch = useTypedDispatch()

  const closeModal = () => {
    dispatch(closeChatModel())
  }

  return (
    <Modal
      closable={false}
      open={chatInfo.isOpenModalChat}
      onCancel={closeModal}
      footer={null}
      width={972}
      maskClosable={true}
      bodyStyle={{ padding: 0, height: '80vh' }}
      destroyOnClose={true}
    >
      <ChatBox
        showInput={!chatInfo.isReadOnly}
        showSidebar={false}
        channelUrl={chatInfo.channelUrl}
        onLeaveCallback={closeModal}
      />
    </Modal>
  )
}

export default ModalChat

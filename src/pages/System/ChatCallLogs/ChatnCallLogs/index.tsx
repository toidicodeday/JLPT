import { Button, Typography } from 'antd'
import React, { useState } from 'react'
import { AiFillPhone } from 'react-icons/ai'
import { RiMessengerFill } from 'react-icons/ri'
import CallDetailsModal from './components/CallDetailsModal'
import ChatList from './components/ChatList'
import ListCall from './components/CallList'

const ChatnCallLogs = () => {
  const [openCallModal, setOpenCallModal] = React.useState<boolean>(false)
  const [activeTab, setActiveTab] = useState('messages')

  const tabs = [
    { label: 'Tin nhắn', icon: <RiMessengerFill />, key: 'messages' },
    { label: 'Cuộc gọi', icon: <AiFillPhone />, key: 'call' },
  ]

  return (
    <div className="pb-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          LỊCH SỬ CHAT VÀ CUỘC GỌI
        </Typography>
      </div>
      <div className="my-3 flex">
        {tabs.map(tab => (
          <Button
            className={`rounded-none border-none flex items-center ${
              activeTab !== tab.key ? ' bg-grayButton text-black' : ''
            }`}
            key={tab.key}
            type="primary"
            onClick={() => setActiveTab(tab.key)}
            icon={tab.icon}
          >
            {/* {tab.icon} */}
            {tab.label}
          </Button>
        ))}
      </div>
      {activeTab === 'messages' && <ChatList />}
      {activeTab === 'call' && <ListCall />}
      <CallDetailsModal
        open={openCallModal}
        setOpen={(type: boolean) => setOpenCallModal(type)}
      />
    </div>
  )
}

export default ChatnCallLogs

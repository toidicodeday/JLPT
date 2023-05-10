import ChatBox from '@/components/ChatBox'
import React from 'react'
// import { useLocation } from 'react-router-dom'

const ChatPage = () => {
  return (
    <div className="flex items-stretch h-[calc(100vh-150px)]">
      <ChatBox showSidebar />
    </div>
  )
}

export default ChatPage

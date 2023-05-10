import ChatBox from '@/components/ChatBox'
import Icon from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const ChatnCallLogsDetails = () => {
  const location = useLocation()
  const channelUrl =
    new URLSearchParams(location.search).get('url') || undefined
  return (
    <div className="">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-he-thong/chat">
          <div className="flex items-center">
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              LỊCH SỬ CHAT
            </Typography>
          </div>
        </Link>
      </div>

      <ChatBox channelUrl={channelUrl} />
    </div>
  )
}

export default ChatnCallLogsDetails

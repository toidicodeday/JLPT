import { useDebounceState } from '@/hooks/useDebounce'
import { Input } from 'antd'
import React, { useState } from 'react'
import ChannelList from './ChannelList'
import UserSearchList from './UserSearchList'

type Props = {
  setChannelUrl: (url: string) => void
  channelUrl: string
}

const ChatBoxSidebar = ({ setChannelUrl, channelUrl }: Props) => {
  // const [searchUser, setSearchUser] = useState('')
  const { dbValue, handleChange } = useDebounceState({ delay: 500 })

  return (
    <div className="bg-slate-100 flex flex-col gap-2 p-2 flex-grow">
      <div>
        <Input
          // value={searchUser}
          onChange={e => handleChange(e.target.value)}
          placeholder="Tìm theo tên user_id"
        />
      </div>
      {!dbValue ? (
        <ChannelList channelUrl={channelUrl} setChannelUrl={setChannelUrl} />
      ) : (
        <UserSearchList setChannelUrl={setChannelUrl} searchUser={dbValue} />
      )}
    </div>
  )
}

export default ChatBoxSidebar

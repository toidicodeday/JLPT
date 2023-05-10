import { UserOutlined, CameraOutlined } from '@ant-design/icons'
import { Spin, Avatar } from 'antd'
import { get } from 'lodash'
import React from 'react'

type Props = {
  loading?: boolean
  url?: string | undefined
  onChange: (file?: File) => void
  editPermission: boolean
}

const AvatarHolder = ({ loading, url, onChange, editPermission }: Props) => {
  const handleChange = (e: any) => {
    const file = get(e.target, 'files.[0]')
    onChange(file)
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 ">
      <label className="relative cursor-pointer rounded-full">
        <Spin spinning={loading}>
          <Avatar src={url} size={144}>
            <UserOutlined />
          </Avatar>
          <div className="absolute top-0 left-0 w-36 h-36 rounded-full transition-all delay-100 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center">
            <CameraOutlined className="text-white text-3xl mt-3" />
          </div>
          <input
            accept="image/*"
            type="file"
            value=""
            onChange={handleChange}
            className="hidden"
            disabled={!editPermission}
          />
        </Spin>
      </label>
    </div>
  )
}

export default AvatarHolder

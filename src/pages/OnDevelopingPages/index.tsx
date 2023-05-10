import { SyncOutlined } from '@ant-design/icons'
import React from 'react'

const OnDevelopingPage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-[#73e5ff54] px-12 py-20 text-xl text-center text-black">
        <SyncOutlined spin />
        <div className="text-3xl mt-4">
          Nội dung đang trong giai đoạn phát triển
        </div>
      </div>
    </div>
  )
}

export default OnDevelopingPage

import { NoImage } from '@/assets/img'
import { message, Image } from 'antd'
import React, { useState } from 'react'

interface Props {
  driverImages?: string[]
}

const ImageGroup = ({ driverImages }: Props) => {
  const [isVisibleImages, setIsVisibleImages] = useState(false)
  const handleShowDriverImages = () => {
    if (!driverImages?.length) {
      message.destroy()
      message.info('Không có ảnh khả dụng')
    } else {
      setIsVisibleImages(true)
    }
  }
  return (
    <>
      <div
        className="relative w-52 h-40 mr-5 cursor-pointer"
        onClick={handleShowDriverImages}
      >
        <div className="absolute w-52 h-40 top-0 left-0">
          <img
            className="absolute w-52 h-40 top-0 left-0 object-contain bg-white border border-solid border-slate-400 shadow-lg "
            src={driverImages?.[1] || NoImage}
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-50 bg-white/30" />
        </div>
        <div className="absolute w-52 h-40 top-5 left-5">
          <img
            className="w-full h-full object-contain bg-white border border-solid border-slate-400 shadow-lg"
            src={driverImages?.[0] || NoImage}
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full backdrop-brightness-50 bg-white/30" />
        </div>

        <div className="w-full h-full absolute left-5 top-5 flex items-center">
          <p className="font-bold text-xl text-center w-full text-white">
            {driverImages?.length} ảnh đính kèm
          </p>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: isVisibleImages,
            onVisibleChange: vis => setIsVisibleImages(vis),
          }}
        >
          {driverImages?.map(item => (
            <Image src={item} key={item} title="akdjnsak" fallback={NoImage} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  )
}

export default ImageGroup

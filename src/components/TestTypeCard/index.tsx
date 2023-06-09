import React from 'react'

type Props = {
  imgSrc: string
  name: string
  des: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const TestTypeCard = ({ imgSrc, name, des, onClick }: Props) => {
  return (
    <div className="shadow rounded-[10px] cursor-pointer" onClick={onClick}>
      <img src={imgSrc} alt="" className="w-full" />
      <div className="h-44 text-black flex items-center justify-center">
        <div className="text-center max-sm:px-3">
          <p className="font-semibold text-2xl mb-3">{name}</p>
          <p>{des}</p>
        </div>
      </div>
    </div>
  )
}

export default TestTypeCard

import React from 'react'
import Button from '../Button'
import { message } from 'antd'
import './style.scss'

type Props = {
  status: string
  name: string
  cardType: string
}

const TrialTestCard = ({ status, name, cardType }: Props) => {
  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }
  return (
    <div className="w-full h-full">
      {cardType === 'normal' && (
        <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
          <div className="flex items-center gap-7">
            <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
              {status}
            </span>
            <p className="text-black mr-1">{name}</p>
          </div>

          <Button
            label="Thi thử"
            onClick={showWarning}
            className="hover:opacity-80 rounded-[30px]"
          />
        </div>
      )}
      {cardType === 'hot' && (
        <div className="trial-exam-primary-bg h-full w-full shadow-card rounded-3xl pt-6 px-6 pb-9">
          <span className="max-md:text-[10px] bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 font-normal">
            {status}
          </span>
          <div className="font-semibold md:text-3xl max-md:text-2xl max-sm:text-base text-[#FB3357] text-center">
            <p className="text-center lg:w-[35%] w-[50%] mx-auto">{name}</p>
          </div>
          <div className="flex justify-center mt-7">
            <Button
              onClick={showWarning}
              className="hover:opacity-80 h-14 rounded-[30px] text-2xl font-semibold"
              type="primary"
              label=" VÀO THI NGAY"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TrialTestCard

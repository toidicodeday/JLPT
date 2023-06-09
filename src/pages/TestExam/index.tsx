import React from 'react'
import { Button as AntButton, message } from 'antd'
import TrialTestCard from '@/components/TrialTestCard'

const testList = [
  {
    id: '1',
    name: 'Đề thi thử JLPT N4 tháng 2/2023',
    status: 'FREE',
    cardType: 'hot',
  },
  {
    id: '2',
    name: 'Đề thi thử JLPT N4 tháng 1/2023',
    status: 'FREE',
    cardType: 'normal',
  },
  {
    id: '3',
    name: 'Đề thi thử JLPT N4 tháng 1/2023',
    status: 'FREE',
    cardType: 'normal',
  },
  {
    id: '4',
    name: 'Đề thi thử JLPT N4 tháng 1/2023',
    status: 'FREE',
    cardType: 'normal',
  },
]

const TestExam = () => {
  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }

  return (
    <div className="w-full pt-16 md:px-12 max-md:px-5 pb-72 relative">
      <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
        THI THỬ JLPT
      </p>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-10">
        <div className="w-full h-full">
          {testList
            ?.filter(item => item.cardType === 'hot')
            ?.map(item => (
              <TrialTestCard
                key={item.id}
                status={item.status}
                name={item.name}
                cardType={item.cardType}
              />
            ))}
        </div>
        <div className="flex flex-col gap-7">
          {testList
            ?.filter(item => item.cardType === 'normal')
            ?.map(item => (
              <TrialTestCard
                key={item.id}
                status={item.status}
                name={item.name}
                cardType={item.cardType}
              />
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-12">
        <AntButton
          onClick={showWarning}
          type="text"
          className="text-[#FB3357] hover:opacity-80 outline-none"
        >
          Xem thêm
        </AntButton>
      </div>
    </div>
  )
}

export default TestExam

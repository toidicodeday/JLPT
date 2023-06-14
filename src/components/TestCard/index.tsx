import { Tag } from 'antd'
import React from 'react'
import Button from '../Button'

type Props = {
  imageSrc: string
  testName: string
  status: string
  score: number
  onClick?: React.MouseEventHandler<HTMLElement>
}

const TestCard = ({ imageSrc, testName, status, score, onClick }: Props) => {
  return (
    <div className="flex justify-between items-center shadow  sm:px-5 max-sm:px-3 mb-10">
      <div className="flex items-center sm:gap-5 max-sm:gap-3">
        <img src={imageSrc} alt="" />
        <p className="flex flex-wrap lg:text-2xl md:text-2xl max-md:text-xl max-sm:text-xs text-primary">
          {testName}
        </p>
      </div>
      {status === 'new' && (
        <Button
          type="primary"
          label="Làm ngay"
          className="hover:opacity-80 ml-1"
          onClick={onClick}
        />
      )}
      {status === 'done' && (
        <div className="flex items-center gap-4  max-lg:flex-col ml-1">
          <Tag className="bg-secondPrimary text-primary font-bold py-1 px-4 rounded-lg">
            {score}/100
          </Tag>
          <Button
            type="outline"
            label="Xem lại bài thi"
            className="hover:bg-primary hover:text-white px-2"
            onClick={onClick}
          />
        </div>
      )}
    </div>
  )
}

export default TestCard

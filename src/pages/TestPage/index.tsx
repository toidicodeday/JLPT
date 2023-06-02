import { Tag, Typography } from 'antd'
import Button from '../../components/Button'
import React from 'react'
import examIcon from '../../assets/img/images/exam 1.png'
import { useNavigate } from 'react-router-dom'

const TestPage = () => {
  const navigate = useNavigate()
  const handleGotoExamDetail = () => {
    navigate('/test/test-details')
  }

  const testList = [
    {
      id: 'test1',
      imageSrc: examIcon,
      testName: '２０２２年０７月',
      status: 'new',
      score: 0,
    },
    {
      id: 'test2',
      imageSrc: examIcon,
      testName: '２０２２年０７月',
      status: 'done',
      score: 80,
    },
    {
      id: 'test3',
      imageSrc: examIcon,
      testName: '２０２２年０７月',
      status: 'new',
      score: 0,
    },
    {
      id: 'test4',
      imageSrc: examIcon,
      testName: '２０２２年０７月',
      status: 'new',
      score: 0,
    },
    {
      id: 'test5',
      imageSrc: examIcon,
      testName: '２０２２年０７月',
      status: 'new',
      score: 0,
    },
  ]

  return (
    <div className="w-full">
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Luyện đề JLPT - N4
        </Typography>
      </div>
      <div className="pt-10 lg:px-32 md:px-32 max-md:px-20 sm:px-5 max-sm:px-3 pb-14">
        {testList?.map((item, index) => (
          <div
            key={item.id}
            className="flex justify-between items-center shadow  sm:px-5 max-sm:px-3 mb-10"
          >
            <div className="flex items-center sm:gap-5 max-sm:gap-3">
              <img src={item.imageSrc} alt="" />
              <p className="flex flex-wrap lg:text-2xl md:text-2xl max-md:text-xl max-sm:text-xs text-primary">
                {item.testName}
              </p>
            </div>
            {item.status === 'new' && (
              <Button
                type="primary"
                label="Làm ngay"
                className="hover:opacity-80 ml-1"
                onClick={handleGotoExamDetail}
              />
            )}
            {item.status === 'done' && (
              <div className="flex items-center gap-4  max-lg:flex-col ml-1">
                <Tag className="bg-secondPrimary text-primary font-bold py-1 px-4 rounded-lg">
                  {item.score}/100
                </Tag>
                <Button
                  type="outline"
                  label="Xem lại bài thi"
                  className="hover:bg-primary hover:text-white px-2"
                  onClick={handleGotoExamDetail}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestPage

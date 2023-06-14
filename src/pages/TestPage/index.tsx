import React from 'react'
import examIcon from '../../assets/img/images/exam 1.png'
import { useNavigate } from 'react-router-dom'
import TestCard from '@/components/TestCard'
import PageTitle from '@/components/PageTitle'

const testInfo = { title: 'Luyện đề JLPT - N4' }

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
      <PageTitle label={testInfo.title} />
      <div className="pt-10 lg:px-32 md:px-32 max-md:px-20 sm:px-5 max-sm:px-3 pb-14">
        {testList?.map((item, index) => (
          <TestCard
            key={item.id}
            imageSrc={item.imageSrc}
            testName={item.testName}
            status={item.status}
            score={item.score}
            onClick={handleGotoExamDetail}
          />
        ))}
      </div>
    </div>
  )
}

export default TestPage

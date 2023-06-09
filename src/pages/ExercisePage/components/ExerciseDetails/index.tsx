import { message } from 'antd'
import Button from '@/components/Button'
import React from 'react'
import PageTitle from '@/components/PageTitle'
import ExerciseCard from '@/components/ExerciseCard'

const exerciseInfo = { title: 'Cách đọc Kanji N4' }

const ExerciseDetail = () => {
  const listExercises = [
    {
      id: 1,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 2,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 3,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 4,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 5,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 6,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 7,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 8,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 9,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 10,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 11,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 12,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 13,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 14,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 15,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 16,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 17,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 18,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 19,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 20,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 21,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 22,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 23,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 24,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 25,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 26,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 27,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 28,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 29,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 30,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 31,
      name: '[1 ~ 10] Cách đọc Kanji N4',
      type: 'free',
      status: 'doing',
    },
    {
      id: 32,
      name: '[11 ~ 20] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 33,
      name: '[21 ~ 30] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
    {
      id: 34,
      name: '[31 ~ 40] Cách đọc Kanji N4',
      type: 'premium',
      status: 'not started',
    },
    {
      id: 35,
      name: '[41 ~ 50] Cách đọc Kanji N4',
      type: 'free',
      status: 'not started',
    },
  ]

  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }
  return (
    <div className="w-full">
      <PageTitle label={exerciseInfo.title} />
      <div className="pt-12 pb-28 lg:px-32 max-lg:px-10 max-sm:px-5 relative">
        <div className="grid xl:grid-cols-5 gap-4 lg:grid-cols-3 grid-cols-2">
          {listExercises?.map(item => (
            <ExerciseCard
              key={item.id}
              type={item.type}
              name={item.name}
              status={item.status}
            />
          ))}
        </div>
        <Button
          onClick={showWarning}
          type="dashed"
          label="Xem thêm"
          className="hover:bg-primary text-primary border-primary rounded-3xl absolute bottom-5 left-1/2 -translate-x-2/4  hover:text-white text-sm"
        />
      </div>
    </div>
  )
}

export default ExerciseDetail

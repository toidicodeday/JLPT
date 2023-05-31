import { Typography, message } from 'antd'
import Button from '@/components/Button'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import LoadIcon from '../../../../assets/img/images/load-icon.png'
import { Link } from 'react-router-dom'

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
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="pt-12 pb-28 lg:px-32 max-lg:px-10 max-sm:px-5 relative">
        <div className="grid xl:grid-cols-5 gap-4 lg:grid-cols-3 grid-cols-2">
          {listExercises.map(item => (
            <div key={item.id}>
              <Link
                to={'/exercise/lesson-details'}
                className="border border-solid border-borderColor py-4 px-5  rounded-3xl cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="flex justify-between mb-5">
                  {item.type === 'free' && (
                    <span className="border border-solid border-aquaGreen text-aquaGreen rounded py-1 px-1 text-xs font-normal">
                      FREE
                    </span>
                  )}
                  {item.type === 'premium' && (
                    <span>
                      <FaCrown className="border border-solid border-selectiveYellow text-selectiveYellow rounded py-1 px-1 text-xl w-7 h-5" />
                    </span>
                  )}
                  {item.status === 'doing' && (
                    <img src={LoadIcon} alt="" className={`w-4 h-4`} />
                  )}
                </div>
                <Typography className="font-normal text-xs text-black">
                  {item.name}
                </Typography>
              </Link>
            </div>
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

import React from 'react'
import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import bookCircles from '../../assets/img/images/book-circles.png'
import PageTitle from '@/components/PageTitle'

const exerciseInfo = { label: 'Bài tập tuhocjlpt - N4' }

const ExercisePage = () => {
  const navigate = useNavigate()
  const tagsClassName = [
    {
      tagClassName: 'bg-primary',
      textClassName: 'text-white',
      wrapperClassName: 'ml-0',
    },
    {
      tagClassName: 'bg-primary',
      textClassName: 'text-white',
      wrapperClassName: 'ml-12',
    },
    {
      tagClassName: 'bg-secondPrimary',
      textClassName: 'text-black',
      wrapperClassName: 'ml-24',
    },
    {
      tagClassName: 'bg-secondPrimary',
      textClassName: 'text-black',
      wrapperClassName: 'ml-36',
    },
    {
      tagClassName: 'bg-electricBlue',
      textClassName: 'text-black',
      wrapperClassName: 'ml-24',
    },
    {
      tagClassName: 'bg-darkSlateBlue',
      textClassName: 'text-white',
      wrapperClassName: 'ml-12',
    },
    {
      tagClassName: 'bg-haiti',
      textClassName: 'text-white',
      wrapperClassName: 'ml-0',
    },
  ]
  const exerciseList = [
    {
      id: 1,
      name: ' Bài tập Kanji - Cách đọc Kanji',
    },
    {
      id: 2,
      name: ' Bài tập Kanji - Chọn Kanji phù hợp',
    },
    {
      id: 3,
      name: ' Bài tập Từ vựng - Chọn từ đúng nghĩa',
    },
    {
      id: 4,
      name: ' Bài tập Từ vựng - Chọn từ đồng nghĩa',
    },
    {
      id: 5,
      name: ' Bài tập Ngữ pháp',
    },
    {
      id: 6,
      name: ' Bài tập Đọc hiểu',
    },
    {
      id: 7,
      name: 'Bài tập Nghe hiểu',
    },
  ]

  const handleMoveExerciseDetail = () => {
    navigate('/exercise/exercise-details')
  }
  return (
    <div className="w-full">
      <PageTitle label={exerciseInfo.label} />
      <div className="container mx-auto flex flex-col lg:flex-row items-start justify-center py-20">
        <div className="flex items-center justify-center lg:justify-end w-full max-xl:py-24 max-lg:py-5">
          <img src={bookCircles} alt="" className="w-[80%] h-[80%]" />
        </div>
        <div className="w-full lg:px-0 px-3">
          {exerciseList.slice(0, 7).map((item, index) => (
            <div
              key={item.id}
              className={twMerge(
                `mb-7 max-lg:ml-0`,
                `${tagsClassName[index].wrapperClassName}`,
              )}
            >
              <Tag
                onClick={handleMoveExerciseDetail}
                className={twMerge(
                  `max-lg:w-full py-4 px-5 rounded-xl font-semibold xl:text-xl max-xl:text-lg max-[500px]:text-xs cursor-pointer`,
                  `${tagsClassName[index].tagClassName}`,
                  `${tagsClassName[index].textClassName}`,
                )}
              >
                {item.name}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage

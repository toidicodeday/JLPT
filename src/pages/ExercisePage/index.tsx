import React from 'react'
import { Col, Row, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import bookIcon from '../../assets/img/images/book-icon.png'
import PageTitle from '@/components/PageTitle'

const exerciseInfo = { title: 'Bài tập tuhocjlpt - N4' }

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
      <PageTitle label={exerciseInfo.title} />
      <Row
        gutter={[{ xl: 50, lg: 30 }, 30]}
        className="lg:py-32 max-lg:py-20 max-sm:py-10 lg:px-20 max-lg:px-20 max-md:px-10 max-sm:px-5"
      >
        <Col xs={24} lg={12}>
          <div className="flex items-center justify-center w-full h-full max-xl:py-24 max-lg:py-0">
            <div className="w-[85%] h-[85%] rounded-[50%] border-dashed border-[#FF261F96] flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#8EF9F3] flex items-center justify-center">
                <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#593C8F8C] flex items-center justify-center">
                  <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#1717386E] flex items-center justify-center">
                    <img src={bookIcon} alt="" className="w-[90%] h-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          {exerciseList.slice(0, 7)?.map((item, index) => (
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
        </Col>
      </Row>
    </div>
  )
}

export default ExercisePage

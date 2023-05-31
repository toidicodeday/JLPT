import Typography from 'antd/lib/typography/Typography'
import React from 'react'
import Book from '../../assets/img/images/book-icon.png'
import { Col, Row, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

const ExercisePage = () => {
  const navigate = useNavigate()
  const exerciseList = [
    {
      id: 1,
      tagColor: '#FF261F',
      textColor: 'white',
      name: ' Bài tập Kanji - Cách đọc Kanji',
      translateX: '0%',
    },
    {
      id: 2,
      tagColor: '#FF261F',
      textColor: 'white',
      name: ' Bài tập Kanji - Chọn Kanji phù hợp',
      translateX: '10%',
    },
    {
      id: 3,
      tagColor: '#FFE7EB',
      textColor: 'black',
      name: ' Bài tập Từ vựng - Chọn từ đúng nghĩa',
      translateX: '20%',
    },
    {
      id: 4,
      tagColor: '#FFE7EB',
      textColor: 'black',
      name: ' Bài tập Từ vựng - Chọn từ đồng nghĩa',
      translateX: '30%',
    },
    {
      id: 5,
      tagColor: '#8EF9F3',
      textColor: 'white',
      name: ' Bài tập Ngữ pháp',
      translateX: '20%',
    },
    {
      id: 6,
      tagColor: '#593C8F',
      textColor: 'white',
      name: ' Bài tập Đọc hiểu',
      translateX: '10%',
    },
    {
      id: 7,
      tagColor: '#171738',
      textColor: 'white',
      name: 'Bài tập Nghe hiểu',
      translateX: '0%',
    },
  ]

  const handleMoveExerciseDetail = () => {
    navigate('/exercise/exercise-details')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Bài tập tuhocjlpt - N4
        </Typography>
      </div>
      <Row
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}
        className="lg:py-32 max-lg:py-20 xl:px-48 max-xl:px-20 max-sm:px-5"
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-[85%] h-[85%] rounded-[50%] border-dashed border-[#FF261F96] flex items-center justify-center">
              <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#8EF9F3] flex items-center justify-center">
                <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#593C8F8C] flex items-center justify-center">
                  <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#1717386E] flex items-center justify-center">
                    <img src={Book} alt="" className="w-[90%] h-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="">
            {exerciseList.map(item => (
              <div
                key={item.id}
                className={`mb-5 max-lg:translate-x-0`}
                style={{
                  transform: `translateX(${item.translateX})`,
                }}
              >
                <Tag
                  onClick={handleMoveExerciseDetail}
                  className={`max-lg:w-full xl:py-4 max-xl:py-3 px-5 rounded-[10px] text-${item.textColor} font-semibold sm:text-lg  max-sm:text-xs cursor-pointer`}
                  color={item.tagColor}
                >
                  {item.name}
                </Tag>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ExercisePage

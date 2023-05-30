import { Col, Row, Tag, Typography } from 'antd'
import React from 'react'
import Book from '../../../../assets/img/images/book-icon.png'
import { useNavigate } from 'react-router-dom'

const StudyDetails = () => {
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

  return (
    <div className="w-full">
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Gokaku Dekiru - N4
        </Typography>
      </div>
      <Row
        gutter={[{ xl: 50, lg: 30 }, 30]}
        className="lg:py-32 max-lg:py-20 max-sm:py-10 lg:px-20 max-lg:px-20 max-md:px-10 max-sm:px-5"
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="flex items-center justify-center w-full h-full max-xl:py-24 max-lg:py-0">
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
                className={`mb-7 max-lg:translate-x-0 translate-x-[${item.translateX}]`}
                style={{
                  transform: `translateX(${item.translateX})`,
                }}
              >
                <Tag
                  onClick={() => navigate('/exercise/exercise-details')}
                  className={`max-lg:w-full py-4 px-5 rounded-[10px] text-${item.textColor} font-semibold text-xl sm:text-lg max-sm:text-xs cursor-pointer`}
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

export default StudyDetails

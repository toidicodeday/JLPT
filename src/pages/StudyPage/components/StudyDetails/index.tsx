import { Col, Row, Tag, Typography } from 'antd'
import React from 'react'
import Book from '../../../../assets/img/images/book-icon.png'
import { useNavigate } from 'react-router-dom'

const StudyDetails = () => {
  const navigate = useNavigate()
  const tagStyle = [
    {
      id: 1,
      tagColor: '#FF261F',
      textClassName: '#fff',
      marginLeft: '0',
    },
    {
      id: 2,
      tagColor: '#FF261F',
      textClassName: '#fff',
      marginLeft: '48px',
    },
    {
      id: 3,
      tagColor: '#FFE7EB',
      textClassName: '#000',
      marginLeft: '96px',
    },
    {
      id: 4,
      tagColor: '#FFE7EB',
      textClassName: '#000',
      marginLeft: '140px',
    },
    {
      id: 5,
      tagColor: '#8EF9F3',
      textClassName: '#000',
      marginLeft: '96px',
    },
    {
      id: 6,
      tagColor: '#593C8F',
      textClassName: '#fff',
      marginLeft: '48px',
    },
    {
      id: 7,
      tagColor: '#171738',
      textClassName: '#fff',
      marginLeft: '0',
    },
  ]
  const exerciseList = [
    {
      id: 1,
      name: ' Bài tập Kanji - Cách đọc Kanji',
      translateX: '0%',
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

  const goToExecisesDetail = () => {
    navigate('/exercise/exercise-details')
  }

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
        <Col xs={24} lg={12}>
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
        <Col xs={24} lg={12}>
          {exerciseList.map((item, index) => (
            <div
              key={item.id}
              className="mb-7 max-lg:ml-0"
              style={{
                marginLeft: tagStyle[index].marginLeft,
              }}
            >
              <Tag
                onClick={goToExecisesDetail}
                className={`max-lg:w-full py-4 px-5 rounded-xl font-semibold xl:text-xl max-xl:text-lg max-[500px]:text-xs cursor-pointer`}
                style={{
                  backgroundColor: tagStyle[index].tagColor,
                  color: tagStyle[index].textClassName,
                }}
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

export default StudyDetails

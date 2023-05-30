import { Col, Row, Tag, Typography } from 'antd'
import React from 'react'
import bookIcon from '../../../../assets/img/images/book-icon.png'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const BookStudyDetails = () => {
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
  ]

  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Gokaku Dekiru - N4
        </Typography>
      </div>
      <Row
        gutter={[50, 30]}
        className="py-32 lg:px-48 md:px-20 sm:px-20 max-sm:px-10"
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-[100%] h-[100%] rounded-[50%] border-dashed border-[#FF261F96] flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-[50%] border-dashed border-[#8EF9F3] flex items-center justify-center">
                <div className="w-[93%] h-[93%] rounded-[50%] border-dashed border-[#593C8F8C] flex items-center justify-center">
                  <div className="w-[90%] h-[90%] rounded-[50%] border-dashed border-[#1717386E] flex items-center justify-center">
                    <img src={bookIcon} alt="" className="w-[90%] h-[90%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          {exerciseList.slice(0, 7).map((item, index) => (
            <div
              key={item.id}
              className={twMerge(
                `mb-7 max-lg:ml-0`,
                `${tagsClassName[index].wrapperClassName}`,
              )}
            >
              <Tag
                onClick={goToExecisesDetail}
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

export default BookStudyDetails

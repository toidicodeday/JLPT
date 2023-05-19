import Typography from 'antd/lib/typography/Typography'
import React from 'react'
import Book from '../../assets/img/images/book-icon.png'
import { Tag } from 'antd'
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
      translateX: '50%',
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
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Bài tập tuhocjlpt - N4
        </Typography>
      </div>
      <div className="py-32 px-48 flex gap-12">
        <div className="">
          <div className="w-[500px] h-[500px] rounded-[50%] border-dashed border-[#FF261F96] flex items-center justify-center">
            <div className="w-[449.7px] h-[449.7px] rounded-[50%] border-dashed border-[#8EF9F3] flex items-center justify-center">
              <div className="w-[399.41px] h-[399.41px] rounded-[50%] border-dashed border-[#593C8F8C] flex items-center justify-center">
                <div className="w-[349.11px] h-[349.11px] rounded-[50%] border-dashed border-[#1717386E] flex items-center justify-center">
                  <img src={Book} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {exerciseList.map(item => (
            <div
              key={item.id}
              className={`mb-7 translate-x-[${item.translateX}]`}
            >
              <Tag
                onClick={handleMoveExerciseDetail}
                className={`py-4 px-5 rounded-[10px] text-${item.textColor} font-semibold text-xl cursor-pointer`}
                color={item.tagColor}
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

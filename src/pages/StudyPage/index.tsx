import { Button, Typography } from 'antd'
import React from 'react'
import bookImg from '../../assets/img/images/book-img.png'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const StudyPage = () => {
  const navigate = useNavigate()
  const bookList = [
    {
      id: 1,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 2,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 3,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 4,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 5,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 6,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 7,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 8,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 9,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: 10,
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
  ]

  const handleMoveStudyDetail = () => {
    navigate('/study/study-details')
  }

  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Luyện JLPT theo sách - N4
        </Typography>
      </div>
      <div className="px-32 pt-10 pb-44 relative">
        <div className="grid grid-rows-2 grid-cols-5 gap-x-[50px] gap-y-[60px]">
          {bookList.map(item => (
            <div
              key={item.id}
              className="card rounded-[20px] cursor-pointer"
              onClick={handleMoveStudyDetail}
            >
              <img className="w-full" src={item.img} alt="book-img" />
              <p className="h-[78px] font-semibold text-xl text-black flex items-center justify-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <Button
          type="text"
          className="text-[#FB3357] bg-white absolute bottom-[10%] left-[50%] translate-x-[-50%]"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default StudyPage

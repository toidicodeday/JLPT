import { Button, Typography } from 'antd'
import React from 'react'
import bookImg from '../../assets/img/images/book-img.png'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'

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

  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          Luyện JLPT theo sách - N4
        </Typography>
      </div>
      <div className="md:px-32 max-md:px-20 pt-10 pb-44 relative">
        <div className="grid grid-cols-5 max-md:grid-cols-2 gap-x-[50px] gap-y-[60px]">
          {bookList.map(item => (
            <Link
              key={item.id}
              className="card rounded-[20px] cursor-pointer"
              to={'/study/study-details'}
            >
              <img className="w-full" src={item.img} alt="book-img" />
              <p className="h-[78px] font-semibold text-xl text-black flex items-center justify-center">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        <Button
          type="text"
          className="text-[#FB3357] bg-white absolute md:bottom-[10%] max-md:bottom-[5%] left-[50%] translate-x-[-50%] hover:opacity-80"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default StudyPage

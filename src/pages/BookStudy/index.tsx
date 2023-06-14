import { Button, message } from 'antd'
import React from 'react'
import bookImg from '../../assets/img/images/book-img.png'
import './style.scss'
import PageTitle from '@/components/PageTitle'
import BookCard from '@/components/BookCard'

const BookStudy = () => {
  const bookList = [
    {
      id: '1',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '2',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '3',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '4',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '5',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '6',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '7',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '8',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '9',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
    {
      id: '10',
      name: 'Gokaku Dekiru',
      img: bookImg,
    },
  ]

  const bookStudyInfo = { title: 'Luyện JLPT theo sách - N4' }

  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }

  return (
    <div className="w-full">
      <PageTitle label={bookStudyInfo.title} />
      <div className="lg:px-32 sm:px-10 max-sm:px-5 pt-10 lg:pb-44 max-lg:pb-28 relative">
        <div className="grid lg:grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 gap-x-12 gap-y-16">
          {bookList?.map(item => (
            <BookCard key={item.id} name={item.name} imgSrc={item.img} />
          ))}
        </div>
        <Button
          onClick={showWarning}
          type="text"
          className="text-primary bg-white absolute lg:bottom-20 max-lg:bottom-10 left-2/4 -translate-x-2/4 hover:opacity-80"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default BookStudy

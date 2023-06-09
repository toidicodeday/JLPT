import { Col, Row } from 'antd'
import React from 'react'
import hotNew from '../../assets/img/images/hotNews.png'
import exerciseImg from '../../assets/img/images/over-view-exercise.png'
import bookImg from '../../assets/img/images/over-view-book.png'
import examImg from '../../assets/img/images/over-view-exam.png'
import comingSoonImg from '../../assets/img/images/coming-soon.png'
import comingSoonBgImg from '../../assets/img/images/coming-soon-bg.png'
import { Link } from 'react-router-dom'
import HeaderNotLogin from '@/components/layouts/AHeader/HeaderNotLogin'
import AFooter from '@/components/layouts/AFooter'
import PageTitle from '@/components/PageTitle'
import Category from '@/components/Category'

const levelInfo = { title: 'N4' }

const categoryList = [
  {
    id: '1',
    imgSrc: exerciseImg,
    name: 'Theo bài tập tuhocjlpt.com',
    path: '/exercise',
    listItem: [
      {
        id: '1',
        name: 'Cách đọc Kanji N3',
        path: '/exercise/exercise-details',
      },
      {
        id: '2',
        name: 'Cách đọc Kanji N3',
        path: '/exercise/exercise-details',
      },
      {
        id: '3',
        name: 'Cách đọc Kanji N3',
        path: '/exercise/exercise-details',
      },
      {
        id: '4',
        name: 'Cách đọc Kanji N3',
        path: '/exercise/exercise-details',
      },
      {
        id: '5',
        name: 'Cách đọc Kanji N3',
        path: '/exercise/exercise-details',
      },
    ],
  },
  {
    id: '2',
    imgSrc: bookImg,
    name: 'Theo sách luyện JLPT',
    path: '/study',
    listItem: [
      {
        id: '1',
        name: 'Luyện N4 theo sách Kodokawa',
        path: '/study/study-details',
      },
      {
        id: '2',
        name: 'Luyện N4 theo sách Kodokawa',
        path: '/study/study-details',
      },
      {
        id: '3',
        name: 'Luyện N4 theo sách Kodokawa',
        path: '/study/study-details',
      },
      {
        id: '4',
        name: 'Luyện N4 theo sách Kodokawa',
        path: '/study/study-details',
      },
      {
        id: '5',
        name: 'Luyện N4 theo sách Kodokawa',
        path: '/study/study-details',
      },
    ],
  },
  {
    id: '3',
    imgSrc: examImg,
    name: 'Theo đề thi JLPT các năm',
    path: '/test',
    listItem: [
      {
        id: '1',
        name: 'Đề thi N4 tháng 6/2023',
        path: '/test/test-details',
      },
      {
        id: '2',
        name: 'Đề thi N4 tháng 6/2023',
        path: '/test/test-details',
      },
      {
        id: '3',
        name: 'Đề thi N4 tháng 6/2023',
        path: '/test/test-details',
      },
      {
        id: '4',
        name: 'Đề thi N4 tháng 6/2023',
        path: '/test/test-details',
      },
      {
        id: '5',
        name: 'Đề thi N4 tháng 6/2023',
        path: '/test/test-details',
      },
    ],
  },
]

const LevelOverView = () => {
  return (
    <div className="w-full">
      <HeaderNotLogin />
      <PageTitle label={levelInfo.title} />
      <div className="py-10 lg:px-32 sm:px-20 max-sm:px-5">
        <Link to={'/trial-exam'}>
          <img src={hotNew} alt="hot-new-img" className="w-full" />
        </Link>
        <div className="mt-14">
          <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
            CÙNG LUYỆN TẬP
          </p>
          <Row className="" gutter={[{ xs: 20, sm: 30, md: 67, lg: 67 }, 30]}>
            {categoryList?.map(item => (
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Category category={item} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="mt-14">
          <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
            THI THỬ JLPT
          </p>
          <div className="relative">
            <img
              src={comingSoonBgImg}
              alt="coming-soon-bg-img"
              className="w-full"
            />
            <img
              src={comingSoonImg}
              alt="coming-soon-img"
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] h-[70%] bg-cover"
            />
          </div>
        </div>
      </div>
      <AFooter />
    </div>
  )
}

export default LevelOverView

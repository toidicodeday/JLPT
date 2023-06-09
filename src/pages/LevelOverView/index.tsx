import { Col, Row } from 'antd'
import React, { useState } from 'react'
import exerciseImg from '../../assets/img/images/over-view-exercise.png'
import bookImg from '../../assets/img/images/over-view-book.png'
import examImg from '../../assets/img/images/over-view-exam.png'
import comingSoonImg from '../../assets/img/images/coming-soon.png'
import comingSoonBgImg from '../../assets/img/images/coming-soon-bg.png'
import HeaderNotLogin from '@/components/layouts/AHeader/HeaderNotLogin'
import AFooter from '@/components/layouts/AFooter'
import PageTitle from '@/components/PageTitle'
import Category from '@/components/Category'
import banner from '../../assets/img/images/banner.png'
import hotNewImg from '../../assets/img/images/hotnew.png'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

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
  const navigate = useNavigate()
  const [showBanner, setShowBanner] = useState(true)
  const handleCloseBanner = () => {
    setShowBanner(false)
    console.log(showBanner)
  }
  return (
    <div className="w-full">
      <HeaderNotLogin />
      <PageTitle label={levelInfo.title} />
      <div className="py-10 lg:px-32 sm:px-20 max-sm:px-5">
        {showBanner && (
          <div className="banner-shadow rounded-2xl overflow-hidden relative h-60 max-sm:h-40 max-[500px]:h-28$">
            <img src={banner} alt="banner-img" className="w-full h-full" />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center gap-10 max-sm:gap-5 max-[500px]:gap-2 pl-10 max-sm:pl-5 max-[500px]:pl-2 max-sm:pr-5 pr-14">
              <img src={hotNewImg} alt="" className="h-32 max-[500px]:h-14" />
              <div className="flex max-lg:flex-col max-lg:gap-5 max-sm:gap-2 justify-between items-center flex-1">
                <div className="text-white font-semibold xl:text-5xl max-xl:text-3xl max-sm:text-lg max-[500px]:text-sm">
                  <p>Đề thi thử JLPT mới nhất</p>
                  <p>tháng 12/2023</p>
                </div>
                <Button
                  type="outline"
                  label="VÀO THI NGAY"
                  onClick={() => navigate('/trial-exam')}
                  className="rounded-3xl xl:text-2xl md:xl font-semibold border-[3px] border-solid border-primary h-14 max-sm:h-10"
                ></Button>
              </div>
            </div>
            <AiOutlineClose
              className="absolute top-[10%] right-[1%] text-2xl text-white cursor-pointer"
              onClick={handleCloseBanner}
            />
          </div>
        )}
        <div className="mt-14">
          <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
            CÙNG LUYỆN TẬP
          </p>
          <Row className="" gutter={[{ xs: 20, sm: 30, md: 67, lg: 67 }, 30]}>
            {categoryList?.map(item => (
              <Col key={item.id} xs={24} sm={24} md={12} lg={8} xl={8}>
                <Category
                  name={item.name}
                  imgSrc={item.imgSrc}
                  viewMorePath={item.path}
                  listItem={item.listItem}
                />
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
              className="absolute top-0 h-full left-2/4 -translate-x-2/4"
            />
          </div>
        </div>
      </div>
      <AFooter />
    </div>
  )
}

export default LevelOverView

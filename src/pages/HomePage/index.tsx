import React from 'react'
import textUnderLine from '../../assets/img/images/text-under-line.png'
import leverImg from '../../assets/img/images/lever-img.png'
import './style.scss'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import HomePageLayout from '@/layouts/components/HomePageLayout'

const HomePage = () => {
  const leverList = [
    {
      id: 1,
      name: 'N1',
    },
    {
      id: 2,
      name: 'N2',
    },
    {
      id: 3,
      name: 'N3',
    },
    {
      id: 4,
      name: 'N4',
    },
  ]
  return (
    <HomePageLayout authorizeStatus={null} adminInfo={null}>
      <div className="w-full min-h-screen bgc pb-24 pt-32">
        <div className="font-semibold lg:text-7xl md:text-5xl sm:text-3xl max-sm:text-xl text-black w-fit mx-auto flex flex-col items-end mb-32">
          <p className="mb-3">KHO SÁCH, ĐỀ LUYỆN THI</p>
          <p className="w-fit text-end relative">
            JLPT CÁC CẤP ĐỘ
            <img
              className="absolute w-[35%] h-[35%] bottom-[4%] left-[-6%]"
              src={textUnderLine}
              alt="text-under-line"
            />
          </p>
        </div>
        <p className="w-fit mx-auto py-4 px-5 bg-title shadow-title lg:text-3xl md:text-2xl sm:text-lg mb-14 rounded-[10px]">
          Chọn cấp độ phù hợp để luyện tập ngay
        </p>
        <Row
          className="w-fit mx-auto"
          gutter={[{ xs: 20, sm: 30, md: 67, lg: 67 }, 30]}
        >
          {leverList.map(item => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={6} xl={6}>
              <Link
                className="flex justify-center relative cursor-pointer"
                to={'/over-view'}
              >
                <img src={leverImg} alt="lever-img" />
                <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
                  {item.name}
                </p>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </HomePageLayout>
  )
}

export default HomePage

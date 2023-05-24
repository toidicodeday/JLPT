import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import HotNew from '../../../../assets/img/images/hotNews.png'
import ExerciseImg from '../../../../assets/img/images/over-view-exercise.png'
import BookImg from '../../../../assets/img/images/over-view-book.png'
import ExamImg from '../../../../assets/img/images/over-view-exam.png'
import ComingSoonImg from '../.././../../assets/img/images/coming-soon.png'
import ComingSoonBgImg from '../.././../../assets/img/images/coming-soon-bg.png'
import '../../style.scss'
import { Link, useNavigate } from 'react-router-dom'
import HeaderNotLogin from '@/components/layouts/AHeader/HeaderNotLogin'
import AFooter from '@/components/layouts/AFooter'

const LevelOverView = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full">
      <HeaderNotLogin />
      <div className="bg-[#FFCAD4] lg:py-5 md:py-5 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-5xl sm:text-3xl max-[640px]:text-3xl">
          N4
        </Typography>
      </div>
      <div className="py-10 lg:px-32 md:px-32 sm:px-10 max-[640px]:px-5">
        <Link to={'/trial-exam'}>
          <img src={HotNew} alt="hot-new-img" className="w-full" />
        </Link>
        <div className="mt-14">
          <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
            CÙNG LUYỆN TẬP
          </p>
          <Row className="" gutter={[{ xs: 20, sm: 30, md: 67, lg: 67 }, 30]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden h-full flex flex-col justify-between">
                <img
                  src={ExerciseImg}
                  alt="exercise-over-view-img"
                  className="w-full border-solid border-b-[#F5F5F5] border-x-0 border-t-0"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl black mb-7">
                    Theo bài tập tuhocjlpt.com
                  </p>
                  <div className="text-[#0075FF]">
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/exercise/exercise-details'}
                    >
                      Cách đọc Kanji N3
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/exercise/exercise-details'}
                    >
                      Cách đọc Kanji N3
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/exercise/exercise-details'}
                    >
                      Cách đọc Kanji N3
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/exercise/exercise-details'}
                    >
                      Cách đọc Kanji N3
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/exercise/exercise-details'}
                    >
                      Cách đọc Kanji N3
                    </Link>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                  onClick={() => navigate('/exercise')}
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden h-full flex flex-col justify-between">
                <img
                  src={BookImg}
                  alt="exercise-over-view-img"
                  className="w-full border-solid border-b-[#F5F5F5] border-x-0 border-t-0"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl black mb-7">
                    Theo sách luyện JLPT
                  </p>
                  <div className="text-[#0075FF]">
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/study/study-details'}
                    >
                      Luyện N4 theo sách Kodokawa
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/study/study-details'}
                    >
                      Luyện N4 theo sách Super moshi
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/study/study-details'}
                    >
                      Luyện theo sách Kokaku Dekiru
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/study/study-details'}
                    >
                      Luyện theo sách Nihongo
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/study/study-details'}
                    >
                      Luyện theo sách ABC
                    </Link>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                  onClick={() => navigate('/study')}
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden h-full flex flex-col justify-between">
                <img
                  src={ExamImg}
                  alt="exercise-over-view-img"
                  className="w-full border-solid border-b-[#F5F5F5] border-x-0 border-t-0"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl black mb-7">
                    Theo đề thi JLPT các năm
                  </p>
                  <div className="text-[#0075FF]">
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/test/test-details'}
                    >
                      Đề thi N4 tháng 6/2023
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/test/test-details'}
                    >
                      Đề thi N4 tháng 12/2022
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/test/test-details'}
                    >
                      Đề thi N4 tháng 6/2022
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/test/test-details'}
                    >
                      Đề thi N4 tháng 12/2011
                    </Link>
                    <Link
                      className="mb-2 hover:text-[#FB3357] block text-box"
                      to={'/test/test-details'}
                    >
                      Đề thi N4 tháng 6/2011
                    </Link>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                  onClick={() => navigate('/test')}
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="mt-14">
          <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black mb-7">
            THI THỬ JLPT
          </p>
          <div className="relative">
            <img
              src={ComingSoonBgImg}
              alt="coming-soon-bg-img"
              className="w-full"
            />
            <img
              src={ComingSoonImg}
              alt="coming-soon-img"
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        </div>
      </div>
      <AFooter />
    </div>
  )
}

export default LevelOverView

import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import HotNew from '../../../../assets/img/images/hotNews.png'
import ExerciseImg from '../../../../assets/img/images/over-view-exercise.png'
import BookImg from '../../../../assets/img/images/over-view-book.png'
import ExamImg from '../../../../assets/img/images/over-view-exam.png'
import ComingSoonImg from '../.././../../assets/img/images/coming-soon.png'
import ComingSoonBgImg from '../.././../../assets/img/images/coming-soon-bg.png'
import '../../style.scss'
import { useNavigate } from 'react-router-dom'

const LeverOverView = () => {
  const navigate = useNavigate()
  const handleMoveTestExam = () => {
    navigate('/home/test-exam')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          N4
        </Typography>
      </div>
      <div className="py-10 px-32">
        <img src={HotNew} alt="hot-new-img" className="cursor-pointer" />
        <div className="mt-14">
          <p className="font-semibold text-2xl text-black mb-7">
            CÙNG LUYỆN TẬP
          </p>
          <Row className="" gutter={60}>
            <Col span={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden">
                <img
                  src={ExerciseImg}
                  alt="exercise-over-view-img"
                  className="w-full"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold text-2xl black mb-7">
                    Theo bài tập tuhocjlpt.com
                  </p>
                  <div className="text-[#0075FF]">
                    <p className="mb-2 cursor-pointer">Cách đọc Kanji N3</p>
                    <p className="mb-2 cursor-pointer">Cách đọc Kanji N3</p>
                    <p className="mb-2 cursor-pointer">Cách đọc Kanji N3</p>
                    <p className="mb-2 cursor-pointer">Cách đọc Kanji N3</p>
                    <p className="mb-2 cursor-pointer">Cách đọc Kanji N3</p>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden">
                <img
                  src={BookImg}
                  alt="exercise-over-view-img"
                  className="w-full"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold text-2xl black mb-7">
                    Theo sách luyện JLPT
                  </p>
                  <div className="text-[#0075FF]">
                    <p className="mb-2 cursor-pointer">
                      Luyện N4 theo sách Kodokawa
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Luyện N4 theo sách Super moshi
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Luyện theo sách Kokaku Dekiru
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Luyện theo sách Nihongo
                    </p>
                    <p className="mb-2 cursor-pointer">Luyện theo sách ABC</p>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="rounded-[20px] shadow-card overflow-hidden">
                <img
                  src={ExamImg}
                  alt="exercise-over-view-img"
                  className="w-full"
                />
                <div className="py-7 px-6">
                  <p className="font-semibold text-2xl black mb-7">
                    Theo đề thi JLPT các năm
                  </p>
                  <div className="text-[#0075FF]">
                    <p className="mb-2 cursor-pointer">
                      Đề thi N4 tháng 6/2023
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Đề thi N4 tháng 12/2022
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Đề thi N4 tháng 6/2022
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Đề thi N4 tháng 12/2011
                    </p>
                    <p className="mb-2 cursor-pointer">
                      Đề thi N4 tháng 6/2011
                    </p>
                  </div>
                </div>
                <Button
                  type="text"
                  className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
                >
                  Xem chi tiết
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="mt-14" onClick={handleMoveTestExam}>
          <p className="font-semibold text-2xl text-black mb-7">THI THỬ JLPT</p>
          <div className="relative cursor-pointer">
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
    </div>
  )
}

export default LeverOverView

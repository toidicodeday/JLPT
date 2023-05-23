import { Button, Tag, Typography } from 'antd'
import React from 'react'
import Exam from '../../assets/img/images/exam 1.png'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const TestPage = () => {
  const navigate = useNavigate()
  const handleMoveExam = () => {
    navigate('/test/test-details')
  }
  const handleMoveReview = () => {
    navigate('/test/exam')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          Luyện đề JLPT - N4
        </Typography>
      </div>
      <div className="pt-10 lg:px-32 md:px-32 max-md:px-20 pb-14">
        <div className="flex justify-between items-center shadow pl-8 pr-11 mb-10">
          <div className="flex items-center md:gap-16 max-md:gap-5">
            <img src={Exam} alt="" />
            <p className="lg:text-2xl md:text-2xl max-md:text-xl text-[#FB3357]">
              ２０２２年０７月
            </p>
          </div>
          <div className="">
            <Button
              type="primary"
              className="bg-[#FB3357] hover:opacity-80"
              onClick={handleMoveExam}
            >
              Làm ngay
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center shadow pl-8 pr-11 mb-10">
          <div className="flex items-center lg:gap-16 max-lg:gap-5">
            <img src={Exam} alt="" />
            <p className="lg:text-2xl md:text-2xl max-md:text-xl text-[#FB3357]">
              ２０２２年０７月
            </p>
          </div>
          <div className="flex items-center gap-4  max-md:flex-col">
            <Tag className="bg-[#FFF1F4] text-[#FB3357] font-bold py-3 px-6">
              80/100
            </Tag>
            <Button
              type="text"
              className="border border-solid border-[#FB3357] text-[#FB3357] hover:bg-[#FB3357] hover:text-white"
              onClick={handleMoveReview}
            >
              Xem lại bài thi
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center shadow pl-8 pr-11 mb-10">
          <div className="flex items-center lg:gap-16 max-lg:gap-5">
            <img src={Exam} alt="" />
            <p className="lg:text-2xl md:text-2xl max-md:text-xl text-[#FB3357]">
              ２０２２年０７月
            </p>
          </div>
          <div className="">
            <Button
              type="primary"
              className="bg-[#FB3357] hover:opacity-80"
              onClick={handleMoveExam}
            >
              Làm ngay
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center shadow pl-8 pr-11 mb-10">
          <div className="flex items-center lg:gap-16 max-lg:gap-5">
            <img src={Exam} alt="" />
            <p className="lg:text-2xl md:text-2xl max-md:text-xl text-[#FB3357]">
              ２０２２年０７月
            </p>
          </div>
          <div className="">
            <Button
              type="primary"
              className="bg-[#FB3357] hover:opacity-80"
              onClick={handleMoveExam}
            >
              Làm ngay
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center shadow pl-8 pr-11 mb-10">
          <div className="flex items-center lg:gap-16 max-lg:gap-5">
            <img src={Exam} alt="" />
            <p className="lg:text-2xl md:text-2xl max-md:text-xl text-[#FB3357]">
              ２０２２年０７月
            </p>
          </div>
          <div className="">
            <Button
              type="primary"
              className="bg-[#FB3357] hover:opacity-80"
              onClick={handleMoveExam}
            >
              Làm ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage

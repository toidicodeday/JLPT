import React from 'react'
import BGImg from '../../../../assets/img/images/test-exam-img.png'
import { Button, Col, Row } from 'antd'
import '../../style.scss'

const TestExam = () => {
  return (
    <div className="w-full pt-16 px-12 pb-72 relative">
      <p className="font-semibold text-2xl text-black mb-7">THI THỬ JLPT</p>
      <Row gutter={40}>
        <Col span={12}>
          <div className="relative">
            <img className="w-full h-full" src={BGImg} alt="" />
            <span className="absolute top-[10%] left-[6%] bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 font-normal">
              FREE
            </span>
            <div className="font-semibold text-3xl text-[#FB3357] absolute top-[30%] left-[50%] translate-x-[-50%]">
              <p>Đề thi thử JLPT N4</p>
              <p className="text-center">tháng 2/2023</p>
            </div>
            <Button
              type="text"
              className="bg-[#FB3357] top-[60%] left-[50%] translate-x-[-50%] text-2xl text-white font-semibold py-4 px-6 h-[60px] rounded-[28px] absolute hover:opacity-80"
            >
              VÀO THI NGAY
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <div className="">
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px] mb-7">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>
              <Button
                type="text"
                className="bg-[#FB3357] text-white py-2 px-7 h-[32px] rounded-[30px] hover:opacity-80"
              >
                Thi thử
              </Button>
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px] mb-7">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>
              <Button
                type="text"
                className="bg-[#FB3357] text-white py-2 px-7 h-[32px] rounded-[30px] hover:opacity-80"
              >
                Thi thử
              </Button>
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>
              <Button
                type="text"
                className="bg-[#FB3357] text-white py-2 px-7 h-[32px] rounded-[30px] hover:opacity-80"
              >
                Thi thử
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Button
        type="text"
        className="absolute bottom-[30%] left-[50%] translate-x-[-50%] text-[#FB3357] hover:opacity-80"
      >
        Xem thêm
      </Button>
    </div>
  )
}

export default TestExam

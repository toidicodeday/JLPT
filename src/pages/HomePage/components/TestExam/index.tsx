import React from 'react'
import BGImg from '../../../../assets/img/images/test-exam-img.png'
import { Button as AntButton, Col, Row, message } from 'antd'
import Button from '../../../../components/Button'
import '../../style.scss'

const TestExam = () => {
  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }

  return (
    <div className="w-full pt-16 md:px-12 max-md:px-5 pb-72 relative">
      <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black">
        THI THỬ JLPT
      </p>
      <Row gutter={[{ xs: 20, sm: 30, md: 67, lg: 67 }, 30]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="relative h-full">
            <img className="w-full h-full" src={BGImg} alt="" />
            <span className="max-md:text-[10px] absolute top-[10%] left-[6%] bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 font-normal">
              FREE
            </span>
            <div className="font-semibold md:text-3xl max-md:text-2xl max-sm:text-base text-[#FB3357] absolute top-[30%] left-[50%] translate-x-[-50%] w-4/5 text-center">
              <p>Đề thi thử JLPT N4</p>
              <p className="text-center">tháng 2/2023</p>
            </div>
            <Button
              onClick={showWarning}
              className="sm:top-[75%] max-sm:top-[70%] left-[50%] translate-x-[-50%] absolute hover:opacity-80"
              type="primary"
              label=" VÀO THI NGAY"
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="h-full flex flex-col justify-between">
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80"
              />
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80"
              />
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black">Đề thi thử JLPT N4 tháng 1/2023</p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80"
              />
            </div>
          </div>
        </Col>
      </Row>

      <AntButton
        onClick={showWarning}
        type="text"
        className="absolute md:bottom-[30%] max-md:bottom-[25%] left-[50%] translate-x-[-50%] text-[#FB3357] hover:opacity-80 outline-none"
      >
        Xem thêm
      </AntButton>
    </div>
  )
}

export default TestExam

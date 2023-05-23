import { Col, Row, Typography } from 'antd'
import React from 'react'
import Count from '../../../../assets/img/images/count.png'
import unCount from '../../../../assets/img/images/un-count.png'
import { useNavigate } from 'react-router-dom'

const TestDetails = () => {
  const navigate = useNavigate()
  const handleMoveExam = () => {
    navigate('/test/exam')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="flex justify-center md:px-20 max-md:px-20 md:my-52 max-md:my-20">
        <Row className="" gutter={[{ xs: 8, sm: 8, md: 24, lg: 100 }, 20]}>
          <Col lg={12} md={12} sm={24}>
            <div
              className="shadow rounded-[10px] cursor-pointer"
              onClick={handleMoveExam}
            >
              <img src={Count} alt="count-img" className="w-full" />
              <div className="h-44 text-black flex items-center justify-center">
                <div className="">
                  <p className="font-semibold text-2xl mb-3">
                    TÍNH GIỜ LÀM BÀI
                  </p>
                  <p>Bạn sẽ có xx phút để hoàn thành bài thi</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <div
              className="shadow rounded-[10px] cursor-pointer"
              onClick={handleMoveExam}
            >
              <img src={unCount} alt="un-count-img" className="w-full" />
              <div className="h-44 text-black flex items-center justify-center">
                <div className="">
                  <p className="font-semibold text-2xl">
                    KHÔNG TÍNH GIỜ LÀM BÀI
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TestDetails

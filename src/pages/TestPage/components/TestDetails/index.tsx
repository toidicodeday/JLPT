import { Col, Row, Typography } from 'antd'
import React from 'react'
import countImg from '../../../../assets/img/images/count.png'
import unCountImg from '../../../../assets/img/images/un-count.png'
import { useNavigate } from 'react-router-dom'

const TestDetails = () => {
  const navigate = useNavigate()
  const handleGoToExam = () => {
    navigate('/test/exam')
  }
  return (
    <div className="w-full">
      <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
        <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="flex justify-center max-lg:px-20 max-[500px]:px-5 md:my-52 max-md:my-20">
        <Row
          className=""
          gutter={[
            { xs: 20, sm: 20, md: 50, lg: 100 },
            { xs: 40, sm: 40 },
          ]}
        >
          <Col md={12} sm={24} xs={24}>
            <div
              className="shadow rounded-[10px] cursor-pointer"
              onClick={handleGoToExam}
            >
              <img src={countImg} alt="count-img" className="w-full" />
              <div className="h-44 text-black flex items-center justify-center">
                <div className="text-center max-sm:px-3">
                  <p className="font-semibold text-2xl mb-3">
                    TÍNH GIỜ LÀM BÀI
                  </p>
                  <p>Bạn sẽ có xx phút để hoàn thành bài thi</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <div
              className="shadow rounded-[10px] cursor-pointer"
              onClick={handleGoToExam}
            >
              <img src={unCountImg} alt="un-count-img" className="w-full" />
              <div className="h-44 text-black flex items-center justify-center">
                <div className="text-center max-sm:px-3">
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

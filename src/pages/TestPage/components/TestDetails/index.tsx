import { Col, Row } from 'antd'
import React from 'react'
import countImg from '../../../../assets/img/images/count.png'
import unCountImg from '../../../../assets/img/images/un-count.png'
import { useNavigate } from 'react-router-dom'
import PageTitle from '@/components/PageTitle'
import TestTypeCard from '@/components/TestTypeCard'

const testInfo = { title: 'Đề thi N4 - ２０２２年０７月' }

const testType = [
  {
    id: '1',
    imgSrc: countImg,
    name: 'TÍNH GIỜ LÀM BÀI',
    des: 'Bạn sẽ có xx phút để hoàn thành bài thi',
  },
  {
    id: '2',
    imgSrc: unCountImg,
    name: ' KHÔNG TÍNH GIỜ LÀM BÀI',
    des: '',
  },
]

const TestDetails = () => {
  const navigate = useNavigate()
  const handleGoToExam = () => {
    navigate('/test/exam')
  }
  return (
    <div className="w-full">
      <PageTitle label={testInfo.title} />
      <div className="flex justify-center max-lg:px-20 max-[500px]:px-5 md:my-52 max-md:my-20">
        <Row
          className=""
          gutter={[
            { xs: 20, sm: 20, md: 50, lg: 100 },
            { xs: 40, sm: 40 },
          ]}
        >
          {testType?.map(item => (
            <Col key={item.id} md={12} sm={24} xs={24}>
              <TestTypeCard
                imgSrc={item.imgSrc}
                name={item.name}
                description={item.des}
                onClick={handleGoToExam}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default TestDetails

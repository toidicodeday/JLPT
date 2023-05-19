import { Typography } from 'antd'
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
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-end gap-24">
          <div
            className="shadow rounded-[10px] cursor-pointer"
            onClick={handleMoveExam}
          >
            <img src={Count} alt="count-img" />
            <div className="h-44 text-black flex items-center justify-center">
              <div className="">
                <p className="font-semibold text-2xl mb-3">TÍNH GIỜ LÀM BÀI</p>
                <p>Bạn sẽ có xx phút để hoàn thành bài thi</p>
              </div>
            </div>
          </div>
          <div
            className="shadow rounded-[10px] cursor-pointer"
            onClick={handleMoveExam}
          >
            <img src={unCount} alt="un-count-img" />
            <div className="h-44 text-black flex items-center justify-center">
              <div className="">
                <p className="font-semibold text-2xl">KHÔNG TÍNH GIỜ LÀM BÀI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestDetails

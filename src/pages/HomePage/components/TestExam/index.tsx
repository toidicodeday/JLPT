import React from 'react'
import { Button as AntButton, message } from 'antd'
import Button from '../../../../components/Button'
import '../../style.scss'

const TestExam = () => {
  const showWarning = () => {
    message.warning('Tính năng chưa khả dụng')
  }

  return (
    <div className="w-full pt-16 md:px-12 max-md:px-5 pb-72">
      <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl text-black">
        THI THỬ JLPT
      </p>
      <div className="mt-7 grid gap-x-10 grid-cols-2 max-sm:grid-cols-1">
        <div>
          <div className="trial-exam-primary-bg h-full w-full shadow-card rounded-3xl pt-6 px-6 pb-9">
            <span className="max-md:text-[10px] bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 font-normal">
              FREE
            </span>
            <div className="font-semibold md:text-3xl max-md:text-2xl max-sm:text-base text-[#FB3357] text-center">
              <p>Đề thi thử JLPT N4</p>
              <p className="text-center">tháng 2/2023</p>
            </div>
            <div className="flex justify-center mt-7">
              <Button
                onClick={showWarning}
                className="hover:opacity-80 h-14 rounded-[30px] text-2xl font-semibold"
                type="primary"
                label=" VÀO THI NGAY"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="h-full flex flex-col justify-between">
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black mr-1">
                  Đề thi thử JLPT N4 tháng 1/2023
                </p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80 rounded-[30px]"
              />
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black mr-1">
                  Đề thi thử JLPT N4 tháng 1/2023
                </p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80 rounded-[30px]"
              />
            </div>
            <div className="p-6 flex items-center justify-between shadow-card rounded-[20px]">
              <div className="flex items-center gap-7">
                <span className="bg-white border border-solid border-[#16DB93] text-[#16DB93] rounded py-1 px-2 text-[10px] font-normal">
                  FREE
                </span>
                <p className="text-black mr-1">
                  Đề thi thử JLPT N4 tháng 1/2023
                </p>
              </div>

              <Button
                label=" Thi thử"
                onClick={showWarning}
                className="hover:opacity-80 rounded-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <AntButton
          onClick={showWarning}
          type="text"
          className="text-[#FB3357] hover:opacity-80 outline-none"
        >
          Xem thêm
        </AntButton>
      </div>
    </div>
  )
}

export default TestExam

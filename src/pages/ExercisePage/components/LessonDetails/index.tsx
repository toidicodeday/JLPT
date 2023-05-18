import { Button, Radio, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LessonDetail = () => {
  const navigate = useNavigate()
  const handleMoveScore = () => {
    navigate('/exercise/score')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          [1 ~ 10] Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-7 px-32">
        <div className="shadow rounded-[20px] p-7 min-h-[574px] text-black font-normal">
          <div className="mb-8">[05]. Nội dung đề bài</div>
          <div className="">
            <div className="flex gap-8 mb-5">
              <Radio></Radio>
              <p>Đáp án A</p>
            </div>
            <div className="flex gap-8 mb-5">
              <Radio></Radio>
              <p>Đáp án B</p>
            </div>
            <div className="flex gap-8 mb-5">
              <Radio></Radio>
              <p>Đáp án C</p>
            </div>
            <div className="flex gap-8 mb-5">
              <Radio></Radio>
              <p>Đáp án D</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-end py-6">
          <Button
            danger
            className="rounded-[10px] px-5 hover:bg-[#FB3357] hover:text-white"
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            className="bg-[#FB3357] border-0 rounded-[10px] font-bold px-5 hover:opacity-80"
          >
            Lưu và tiếp tục
          </Button>
          <Button
            type="primary"
            className="bg-[#D9D9D9] border-0 rounded-[10px] font-bold text-[#707070] px-5 hover:opacity-80"
            onClick={handleMoveScore}
          >
            Nộp bài
          </Button>
        </div>
        <div className="bg-[#F5F5F5] pt-7 pb-10 flex justify-center gap-5">
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            1
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            2
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            3
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            4
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            5
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            6
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            7
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            8
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            9
          </div>
          <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
            10
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonDetail

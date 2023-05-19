import { Button, Radio, Tag, Typography } from 'antd'
import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const Exam = () => {
  const navigate = useNavigate()
  const handleReturn = () => {
    navigate('/test')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="py-8 px-32">
        <div className="shadow rounded-[20px] text-black h-[537px]">
          <div className="bg-[#F5F5F5] flex items-center justify-end rounded-t-[20px] py-3 px-6">
            <Tag className="font-bold text-2xl text-black bg-[#D9D9D9] py-3 px-7">
              119:59
            </Tag>
          </div>
          <div className="p-8">
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
        </div>
        <div className="py-5 flex items-center justify-end gap-5">
          <Button
            type="text"
            className="border border-solid border-[#FB3357] text-[#FB3357] font-bold"
            onClick={handleReturn}
          >
            Quay lại
          </Button>
          <Button type="primary" className="bg-[#FB3357] font-bold">
            Lưu và tiếp tục
          </Button>
          <Button type="primary" className="bg-[#D9D9D9] text-[#707070]">
            Nộp bài
          </Button>
        </div>
        <div className="pt-6 px-5 pb-4 bg-[#F5F5F5] rounded-[10px]">
          <div className="flex justify-center gap-5 mb-4">
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
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              11
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              12
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              13
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              14
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              15
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              16
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              17
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              18
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              19
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              20
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              21
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              22
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              23
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              24
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              25
            </div>
          </div>
          <div className="flex justify-center gap-5 mb-4">
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
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              11
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              12
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              13
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              14
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              15
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              16
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              17
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              18
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              19
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              20
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              21
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              22
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              23
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              24
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              25
            </div>
          </div>
          <div className="flex justify-center gap-5 mb-4">
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
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              11
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              12
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              13
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              14
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              15
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              16
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              17
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              18
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              19
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              20
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              21
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              22
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              23
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              24
            </div>
            <div className="w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] text-[#16DB93] flex items-center justify-center">
              25
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exam

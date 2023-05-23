import { Button, Radio, RadioChangeEvent, Space, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import './style.scss'

const Exam = () => {
  const results = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          Đề thi N4 - ２０２２年０７月
        </Typography>
      </div>
      <div className="py-8 md:px-32 max-md:px-10">
        <div className="shadow rounded-[20px] text-black h-[537px]">
          <div className="bg-[#F5F5F5] flex items-center justify-end rounded-t-[20px] py-3 px-6">
            <Tag className="font-bold lg:text-2xl max-lg:text-xl text-black bg-[#D9D9D9] lg:py-3 max-lg:py-2 lg:px-7 max-lg:px-4">
              119:59
            </Tag>
          </div>
          <div className="p-8">
            <div className="mb-8">[05]. Nội dung đề bài</div>
            <div className="text-black">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio className="flex gap-[20px]" value={1}>
                    Đáp án A
                  </Radio>
                  <Radio className="flex gap-[20px]" value={2}>
                    Đáp án B
                  </Radio>
                  <Radio className="flex gap-[20px]" value={3}>
                    Đáp án C
                  </Radio>
                  <Radio className="flex gap-[20px]" value={4}>
                    Đáp án D
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="py-5 flex items-center md:justify-end max-md:justify-center gap-5">
          <Button
            type="text"
            className="border border-solid border-[#FB3357] text-[#FB3357] font-bold hover:bg-[#FB3357] hover:text-white"
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            className="bg-[#FB3357] font-bold hover:opacity-80"
          >
            Lưu và tiếp tục
          </Button>
          <Button
            type="primary"
            className="bg-[#D9D9D9] text-[#707070] hover:opacity-80"
          >
            Nộp bài
          </Button>
        </div>
        <div className="pt-6 px-5 pb-4 bg-[#F5F5F5] rounded-[10px] overflow-hidden flex justify-center">
          <div className="flex flex-wrap lg:gap-5 max-lg:gap-2">
            {results.map(item => (
              <div
                className={`w-7 h-7 rounded-[50%] border border-solid border-[#16DB93] flex items-center justify-center  ${
                  [1, 2, 3, 4].includes(item)
                    ? 'bg-[#16DB93] text-white'
                    : 'bg-white text-[#16DB93]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exam

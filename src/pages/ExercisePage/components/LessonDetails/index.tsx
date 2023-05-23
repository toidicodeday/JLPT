import { Button, Input, Radio, RadioChangeEvent, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LessonDetail = () => {
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  const navigate = useNavigate()
  const handleMoveScore = () => {
    navigate('/exercise/score')
  }
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          [1 ~ 10] Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-7 lg:px-32 md:px-32 max-md:px-20">
        <div className="shadow rounded-[20px] p-7 min-h-[574px] text-black font-normal">
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
        <div className="flex gap-5 justify-end max-md:justify-center py-6">
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
        <div className="bg-[#F5F5F5] pt-7 pb-10 px-[20px] flex justify-center gap-5 max-md:gap-2">
          {results.map(item => (
            <div
              key={item}
              className={`w-7 h-7 rounded-[50%] border border-solid ${
                [1, 2, 3, 4].includes(item)
                  ? 'bg-[#16DB93] text-white'
                  : 'bg-white'
              } border-[#16DB93] text-[#16DB93] flex items-center justify-center`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LessonDetail

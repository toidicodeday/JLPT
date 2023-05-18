import { Button, Divider, Radio, Typography } from 'antd'
import React, { useState } from 'react'
import './style.scss'
import { MdClose, MdDone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Score = () => {
  const [checked, setChecked] = useState(true)
  const navigate = useNavigate()

  const handleMoveExplainAnswer = () => {}

  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          [1 ~ 10] Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-7 px-32">
        <div className="flex items-center p-7 mb-7">
          <span className="bg-[#FFE6EB] py-2 px-5 rounded-[10px] mr-12 font-bold text-3xl text-[#FB3357]">
            8/10
          </span>
          <div className="flex items-center gap-5">
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              1
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              2
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              3
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              4
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              5
            </div>
            <div className="w-7 h-7 bg-[#FFB800] rounded-[50%] flex items-center justify-center text-white">
              6
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              7
            </div>
            <div className="w-7 h-7 bg-[#FFB800] rounded-[50%] flex items-center justify-center text-white">
              8
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              9
            </div>
            <div className="w-7 h-7 bg-[#16DB93] rounded-[50%] flex items-center justify-center text-white">
              10
            </div>
          </div>
        </div>
        <div className="test-answer p-8 rounded-[20px] text-black">
          <div className="">
            <div className="mb-8 font-bold">[01]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button
              type="dashed"
              className=""
              onClick={handleMoveExplainAnswer}
            >
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[02]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[03]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[04]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[05]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[06]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked ? (
                    <MdDone className="text-base" />
                  ) : (
                    <MdClose className="text-base" />
                  )}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[07]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[08]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[09]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
          <Divider />
          <div className="">
            <div className="mb-8 font-bold">[10]. Nội dung đề bài</div>
            <div className="">
              <div
                className={`flex gap-7 mb-5 text-[${checked ? '#16DB93' : ''}]`}
              >
                <div
                  className={`flex gap-[14px] items-center ml-${
                    checked ? '0' : '8'
                  }`}
                >
                  {checked && <MdDone className="text-base" />}
                  <Radio checked={checked}></Radio>
                </div>
                <p>Đáp án A</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án B</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án C</p>
              </div>
              <div className="flex gap-7 mb-5 ml-8">
                <Radio checked={false}></Radio>
                <p>Đáp án D</p>
              </div>
            </div>
            <Button type="dashed" className="">
              Giải thích đáp án
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Score

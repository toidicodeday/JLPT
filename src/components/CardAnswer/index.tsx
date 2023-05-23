import { Radio } from 'antd'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import ShowExpandAnswer from '../ShowExpandAnswer'
import './style.scss'

type Props = {
  number: number
}

const CardAnswer = (number: Props) => {
  const [answer, setAnswer] = useState(true)
  const [checked, setChecked] = useState(true)
  return (
    <div>
      <div className="">
        <div className="mb-8 font-bold">[01]. Nội dung đề bài</div>
        <div className="">
          <div className={`flex gap-7 mb-5 text-[${answer ? '#16DB93' : ''}]`}>
            <div
              className={`flex gap-[14px] items-center ml-${
                checked ? '0' : '8'
              } ${answer ? 'success' : 'wrong'}`}
            >
              {answer ? (
                <MdDone className="text-base" />
              ) : (
                <AiOutlineClose className="text-base text-[#FFB800]" />
              )}

              <Radio checked={checked}></Radio>
            </div>
            <p className={`${answer ? 'text-[#16DB93]' : 'text-[#FFB800]'}`}>
              Đáp án A
            </p>
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
        <ShowExpandAnswer />
      </div>
    </div>
  )
}

export default CardAnswer

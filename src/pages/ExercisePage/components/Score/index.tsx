import { Divider, Typography } from 'antd'
import React from 'react'
import './style.scss'
import CardAnswer from '@/components/CardAnswer'

const Score = () => {
  const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          [1 ~ 10] Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-7 lg:px-32 max-lg:px-10">
        <div className="flex items-center p-7 mb-7 lg:gap-10 max-lg:gap-5">
          <span className="bg-[#FFE6EB] py-2 px-5 rounded-[10px] font-bold lg:text-3xl max-lg:text-xl text-[#FB3357]">
            8/10
          </span>
          <div className="flex items-center lg:gap-5 max-lg:gap-2 overflow-hidden">
            {results.map(item => (
              <div
                key={item}
                className={`w-7 h-7  ${
                  [6, 8].includes(item) ? 'bg-[#FFB800]' : 'bg-[#16DB93]'
                } rounded-[50%] flex items-center justify-center text-white`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="test-answer p-8 rounded-[20px] text-black">
          {results.map(item => (
            <div className="">
              <CardAnswer number={item} />
              {item === 10 ? '' : <Divider />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Score

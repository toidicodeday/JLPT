import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import LoadIcon from '../../../../assets/img/images/load-icon.png'
import { Link } from 'react-router-dom'

const ExerciseDetail = () => {
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] lg:py-5 md:py-2 sm:py-2 max-[640px]:py-2 text-center">
        <Typography className="font-semibold text-[#FB3357] lg:text-5xl md:text-3xl sm:text-3xl max-[640px]:text-3xl">
          Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-12 lg:px-32 max-lg:px-10 max-sm:px-5 relative">
        <div className="grid xl:grid-cols-5 gap-4 lg:grid-cols-3 grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7].map(item => (
            <>
              <div>
                <Link
                  to={'/exercise/lesson-details'}
                  className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="flex justify-between mb-5">
                    <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                      FREE
                    </span>
                    <img src={LoadIcon} alt="" className="w-4 h-4" />
                  </div>
                  <Typography className="font-normal text-[10px] text-black">
                    [1 ~ 10] Cách đọc Kanji N4
                  </Typography>
                </Link>
              </div>
              <div>
                <Link
                  className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer flex flex-col justify-between h-full"
                  to={'/exercise/lesson-details'}
                >
                  <div className="flex justify-between mb-5">
                    <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                      FREE
                    </span>
                  </div>
                  <Typography className="font-normal text-[10px] text-black">
                    [11 ~ 20] Cách đọc Kanji N4
                  </Typography>
                </Link>
              </div>
              <div>
                <Link
                  className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer flex flex-col justify-between h-full"
                  to={'/exercise/lesson-details'}
                >
                  <div className="flex justify-between mb-5">
                    <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                      FREE
                    </span>
                  </div>
                  <Typography className="font-normal text-[10px] text-black">
                    [21 ~ 30] Cách đọc Kanji N4
                  </Typography>
                </Link>
              </div>
              <div>
                <Link
                  className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer flex flex-col justify-between h-full"
                  to={'/exercise/lesson-details'}
                >
                  <div className="flex justify-between mb-5">
                    <span>
                      <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                    </span>
                  </div>
                  <Typography className="font-normal text-[10px] text-black">
                    [31 ~ 40] Cách đọc Kanji N4
                  </Typography>
                </Link>
              </div>
              <div>
                <Link
                  className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer flex flex-col justify-between h-full"
                  to={'/exercise/lesson-details'}
                >
                  <div className="flex justify-between mb-5">
                    <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                      FREE
                    </span>
                  </div>
                  <Typography className="font-normal text-[10px] text-black">
                    [41 ~ 50] Cách đọc Kanji N4
                  </Typography>
                </Link>
              </div>
            </>
          ))}
        </div>
        <Button
          type="dashed"
          className="rounded-[20px] text-[#FB3357] border border-dashed border-[#FB3357] font-normal text-sm w-[150px] h-[40px] absolute lg:bottom-[2%] max-lg:bottom-[1%] left-[50%] translate-x-[-50%] hover:bg-[#FB3357] hover:text-white"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default ExerciseDetail

import React from 'react'
import textUnderLine from '../../assets/img/images/text-under-line.png'
import leverImg from '../../assets/img/images/lever-img.png'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const handleMoveLeverDetails = () => {
    navigate('/home/over-view')
  }
  return (
    <div className="w-full min-h-screen bgc pb-24 pt-32">
      <div className="font-semibold text-7xl text-black w-fit mx-auto flex flex-col items-end mb-32">
        <p className="mb-3">KHO SÁCH, ĐỀ LUYỆN THI</p>
        <p className="w-fit text-end relative">
          JLPT CÁC CẤP ĐỘ
          <img
            className="absolute bottom-[4%] left-[-6%]"
            src={textUnderLine}
            alt="text-under-line"
          />
        </p>
      </div>
      <p className="w-fit mx-auto py-4 px-5 bg-title shadow-title text-3xl mb-14 rounded-[10px]">
        Chọn cấp độ phù hợp để luyện tập ngay
      </p>
      <div className="w-fit mx-auto flex items-center gap-16">
        <div
          className="relative cursor-pointer"
          onClick={handleMoveLeverDetails}
        >
          <img src={leverImg} alt="lever-img" />
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
            N1
          </p>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={handleMoveLeverDetails}
        >
          <img src={leverImg} alt="lever-img" />
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
            N2
          </p>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={handleMoveLeverDetails}
        >
          <img src={leverImg} alt="lever-img" />
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
            N3
          </p>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={handleMoveLeverDetails}
        >
          <img src={leverImg} alt="lever-img" />
          <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
            N4
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage

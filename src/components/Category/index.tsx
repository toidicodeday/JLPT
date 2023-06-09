import { CategoryType } from '@/store/type'
import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  category: CategoryType
}

const Category = ({ category }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="rounded-[20px] shadow-card overflow-hidden h-full flex flex-col justify-between">
      <img
        src={category.imgSrc}
        alt="exercise-over-view-img"
        className="w-full border-solid border-b-[#F5F5F5] border-x-0 border-t-0"
      />
      <div className="py-7 px-6">
        <p className="font-semibold lg:text-2xl md:text-2xl sm:text-xl max-[640px]:text-xl black mb-7">
          {category.name}
        </p>
        <div className="text-[#0075FF]">
          {category.listItem?.map(item => (
            <Link
              key={item.id}
              className="mb-2 hover:text-[#FB3357] block text-box"
              to={item.path}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <Button
        type="text"
        className="bg-[#FFF1F4] text-[#FB3357] w-full h-[60px] py-3 rounded-none hover:bg-[#FFCAD4]"
        onClick={() => navigate(category.path)}
      >
        Xem chi tiết
      </Button>
    </div>
  )
}

export default Category

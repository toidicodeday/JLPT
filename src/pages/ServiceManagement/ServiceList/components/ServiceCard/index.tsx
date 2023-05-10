import { ProductType } from '@/services/serviceApi/types'
import { Button, Typography, Image } from 'antd'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

interface Props {
  data: ProductType
}

const ServiceCard = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center px-6 py-4 mt-6 bg-[#F5F5F5] font-sans">
      <div className="flex items-center">
        <Image width={70} src={props?.data?.icon} />
        <Typography className="text-lg font-bold ml-6">
          {props.data.name}
        </Typography>
      </div>
      <Button
        type="text"
        onClick={() =>
          navigate(`/quan-ly-dich-vu/dich-vu/chi-tiet?id=${props.data.id}`)
        }
      >
        <AiFillEdit className="text-xl text-[#116476]" />
      </Button>
    </div>
  )
}

export default ServiceCard

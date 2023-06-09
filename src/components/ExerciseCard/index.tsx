import { Typography } from 'antd'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import LoadIcon from '../../assets/img/images/load-icon.png'

type Props = {
  name: string
  type: string
  status: string
}

const ExerciseCard = ({ name, type, status }: Props) => {
  return (
    <div>
      <Link
        to={'/exercise/lesson-details'}
        className="border border-solid border-borderColor py-4 px-5  rounded-3xl cursor-pointer flex flex-col justify-between h-full"
      >
        <div className="flex justify-between mb-5">
          {type === 'free' && (
            <span className="border border-solid border-aquaGreen text-aquaGreen rounded py-1 px-1 text-xs font-normal">
              FREE
            </span>
          )}
          {type === 'premium' && (
            <span>
              <FaCrown className="border border-solid border-selectiveYellow text-selectiveYellow rounded py-1 px-1 text-xl w-7 h-5" />
            </span>
          )}
          {status === 'doing' && (
            <img src={LoadIcon} alt="" className="w-4 h-4" />
          )}
        </div>
        <Typography className="font-normal text-xs text-black">
          {name}
        </Typography>
      </Link>
    </div>
  )
}

export default ExerciseCard

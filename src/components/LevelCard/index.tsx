import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  imgSrc: string
  name: string
}

const LevelCard = ({ imgSrc, name }: Props) => {
  return (
    <Link
      className="flex justify-center relative cursor-pointer transition-all"
      to={'/over-view'}
    >
      <img src={imgSrc} alt="lever-img" className="shadow-course " />
      <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold text-7xl text-white">
        {name}
      </p>
    </Link>
  )
}

export default LevelCard

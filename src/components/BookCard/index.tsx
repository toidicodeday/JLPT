import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  name: string
  imgSrc: string
}

const BookCard = ({ name, imgSrc }: Props) => {
  return (
    <div>
      <Link
        className="card rounded-[20px] cursor-pointer"
        to={'/study/study-details'}
      >
        <img className="w-full" src={imgSrc} alt="book-img" />
        <p className="h-20 font-semibold text-xl text-black flex items-center justify-center text-center">
          {name}
        </p>
      </Link>
    </div>
  )
}

export default BookCard

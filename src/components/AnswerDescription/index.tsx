import Button from '../../components/Button'
import React, { useState } from 'react'
import { FaCompressAlt } from 'react-icons/fa'

type Props = {
  text?: string
}

const AnswerDescription = ({ text }: Props) => {
  const [showExpand, setShowExpand] = useState(false)

  const handleShowExpandAnswer = () => {
    setShowExpand(!showExpand)
  }

  return (
    <div>
      {showExpand ? (
        <div className="rounded-xl mt-3">
          <div className="flex items-center justify-between bg-borderColor rounded-t-xl py-3 pl-7 pr-5">
            <span className="text-black">Giải thích đáp án</span>
            <span
              className="bg-smokeyGrey text-white p-1 flex items-center justify-center rounded cursor-pointer hover:opacity-80"
              onClick={handleShowExpandAnswer}
            >
              <FaCompressAlt />
            </span>
          </div>
          <div className="p-7 bg-[#F5F5F5] text-black rounded-b-xl">{text}</div>
        </div>
      ) : (
        <Button
          type="dashed"
          label="Giải thích đáp án"
          onClick={handleShowExpandAnswer}
        />
      )}
    </div>
  )
}

export default AnswerDescription

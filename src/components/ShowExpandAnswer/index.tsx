import { Button } from 'antd'
import React, { useState } from 'react'
import { FaExpandAlt } from 'react-icons/fa'

function ShowExpandAnswer() {
  const [showExpand, setShowExpand] = useState(false)

  const handleShowExpandAnswer = () => {
    setShowExpand(!showExpand)
  }

  return (
    <div>
      <Button type="dashed" className="" onClick={handleShowExpandAnswer}>
        Giải thích đáp án
      </Button>
      {showExpand ? (
        <div className="rounded-[10px] mt-3">
          <div className="flex items-center justify-between bg-[#D9D9D9] rounded-t-[10px] py-3 pl-7 pr-5">
            <span className="text-black">Giải thích đáp án</span>
            <span className="bg-[#707070] text-white p-1 flex items-center justify-center rounded cursor-pointer hover:opacity-80">
              <FaExpandAlt />
            </span>
          </div>
          <div className="p-7 bg-[#F5F5F5] text-black rounded-b-[10px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default ShowExpandAnswer

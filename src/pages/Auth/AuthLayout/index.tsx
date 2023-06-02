import React, { ReactNode } from 'react'
import '../styles.scss'

interface Props {
  children?: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#FFFAFA] h-screen flex justify-center items-center">
      <div className="font-sans max-w-[1240px] hidden xl:block max-h-screen h-[80%] min-h-[600px] overflow-hidden">
        <div className="w-full h-full grid grid-cols-2">
          <div className="left-image flex items-center justify-center relative">
            <p className="text-white absolute left-10 top-8">tuhocjlpt.com</p>
            <div className="text-white font-bold text-4xl auth-text relative">
              WELCOME BACK
            </div>
          </div>
          <div className="flex justify-center items-center w-full height-full bg-white">
            {children}
          </div>
        </div>
      </div>
      <div className="mobile-container w-screen h-screen px-10 flex items-center justify-center xl:hidden">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout

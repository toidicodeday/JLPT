import React, { ReactNode } from 'react'
import '../styles.scss'
import topLayout1 from '../../../assets/img/images/top-layout-1.png'
import topLayout2 from '../../../assets/img/images/top-layout-2.png'
import bottomLayout1 from '../../../assets/img/images/bottom-layout-1.png'
import bottomLayout2 from '../../../assets/img/images/bottom-layout-2.png'

interface Props {
  children?: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <div className="font-sans w-screen h-screen p-0 xl:p-24 hidden xl:block">
        <div className="w-full h-full xl:grid-cols-2 hidden xl:grid relative">
          <img
            src={topLayout1}
            alt=""
            className="absolute top-0 left-0 right-0"
          />
          <img
            src={topLayout2}
            alt=""
            className="absolute top-0 left-0 right-0"
          />
          <img
            src={bottomLayout1}
            alt=""
            className="absolute bottom-0 left-0 right-0 bg-red"
          />
          <img
            src={bottomLayout2}
            alt=""
            className="absolute bottom-0 left-0 right-0 bg-red"
          />
          <div className="left-image col-span-1 flex items-center justify-center">
            <div className="text-white font-bold text-4xl auth-text relative">
              WELCOME BACK
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
      <div className="mobile-container w-screen h-screen p-6 flex items-center justify-center xl:hidden">
        {children}
      </div>
    </React.Fragment>
  )
}

export default AuthLayout

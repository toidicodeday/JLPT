import React, { ReactNode } from 'react'
import '../styles.scss'

interface Props {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <div className="font-sans w-screen h-screen p-0 xl:p-24 hidden xl:block">
        <div className="w-full h-full xl:grid-cols-2 hidden xl:grid">
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

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <div className="font-sans w-screen h-screen p-0 xl:p-12 hidden xl:block">
        <div className="auth-card w-full h-full rounded-2xl xl:grid-cols-3 hidden xl:grid">
          <div className="left-image col-span-1 rounded-tl-2xl rounded-bl-2xl"></div>
          <div className="col-span-2 flex items-center justify-center">
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

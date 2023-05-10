import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      pauseOnHover={true}
      theme="colored"
      pauseOnFocusLoss={false}
    />
  )
}

export default ToastContainerComponent

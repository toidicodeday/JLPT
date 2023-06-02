import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useAutoScrollToTop = () => {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])
}

export default useAutoScrollToTop

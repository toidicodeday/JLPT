import { Row, Spin } from 'antd'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <Row
            justify="center"
            align="middle"
            className="max-w-full min-h-screen text-blue-500 text-base"
          >
            <Spin />
          </Row>
        }
      >
        <AppRoutes />
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App

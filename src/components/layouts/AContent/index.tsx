import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

interface Props {
  location?: any
  children: any
}

const AContent = (props: Props) => {
  return (
    <Content
      style={{
        overflow: 'auto',
        minHeight: 'calc(100vh - 150px)',
        background: 'white',
      }}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {props.children}
      </div>
    </Content>
  )
}

export default AContent

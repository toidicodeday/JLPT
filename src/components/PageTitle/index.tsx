import { Typography } from 'antd'
import React from 'react'

type Props = {
  label: string
}

const PageTitle = ({ label }: Props) => {
  return (
    <div className="bg-secondPrimary lg:py-5 sm:py-2 max-sm:py-2 text-center">
      <Typography className="font-semibold text-primary lg:text-5xl md:text-3xl sm:text-2xl max-sm:text-xl">
        {label}
      </Typography>
    </div>
  )
}

export default PageTitle

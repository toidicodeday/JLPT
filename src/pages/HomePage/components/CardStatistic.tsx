import { numberWithComma } from '@/utils/helpers/convert.helper'
import { Divider, Spin } from 'antd'
import React from 'react'

type Props = {
  title: string
  cardClassName?: string
  icon: React.ReactNode
  mainNumber: number
  subInfos: { title: string; value: number }[]
  isLoading: boolean
}

const CardStatistic = (props: Props) => {
  const { title, icon, mainNumber, subInfos, cardClassName } = props
  return (
    <Spin spinning={props.isLoading}>
      <div className={['rounded-md', cardClassName].join(' ')}>
        <div className="p-3 flex justify-between items-center">
          <p className="text-base text-black">{title}</p>
          {icon}
        </div>
        <p className="text-3xl font-bold text-black text-center">
          {numberWithComma(mainNumber)}
        </p>
        <Divider className="border-[#D9D9D9] mt-3 mb-0" />
        <div className="flex justify-around items-start py-3">
          {subInfos?.map(subInfo => (
            <div key={subInfo.title} className="px-3">
              <p className="text-center">{subInfo.title}</p>
              <p className="text-center">{numberWithComma(subInfo.value)}</p>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  )
}

export default CardStatistic

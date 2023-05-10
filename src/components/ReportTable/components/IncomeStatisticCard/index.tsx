import { Card, Statistic } from 'antd'
import React from 'react'

interface Props {
  icon: any
  title: string
  value: number
  isLoading: boolean
}

const IncomeStatisticCard = ({ icon, title, value, isLoading }: Props) => {
  return (
    <Card>
      <Statistic
        loading={isLoading}
        title={
          <div className="flex items-center">
            <img src={icon} alt="total-income" />
            <span className="text-[#585858] ml-2">{title}</span>
          </div>
        }
        value={value}
        valueStyle={{
          color: '#59AFFF',
          fontWeight: 'bold',
          textAlign: 'right',
        }}
      />
    </Card>
  )
}

export default IncomeStatisticCard

import { Spin } from 'antd'
import { ColorAttrCallback } from 'bizcharts/lib/interface'
import React, { useMemo } from 'react'
import styles from '../styles.module.scss'
import PieChartStatistic from './PieChard'

type Props = {
  title: string
  mainNumber: number
  subInfos: { title: string; value: number }[]
  isLoading: boolean
  pieColor: [string, string | string[] | ColorAttrCallback]
}

const StatisticCard = ({
  title,
  mainNumber,
  subInfos,
  isLoading,
  pieColor,
}: Props) => {
  const pieChardData: { item: string; percent: Number; value: Number }[] =
    useMemo(() => {
      const apiData = subInfos.map(i => ({
        item: i.title,
        percent: Math.round((i.value * 100) / mainNumber) / 100,
        value: i.value,
      }))
      return subInfos?.reduce(
        (total, item) => total + Number(item.value),
        0,
      ) === mainNumber
        ? apiData
        : [
            ...apiData,
            {
              item: 'Khác',
              percent:
                1 - apiData.reduce((total, item) => total + item.percent, 0),
              value:
                mainNumber -
                apiData.reduce((total, item) => total + Number(item.value), 0),
            },
          ]
    }, [mainNumber, subInfos])
  return (
    <Spin spinning={isLoading}>
      <div className={`${styles.shadowCard} flex items-center justify-between`}>
        <div>
          <div className="font-bold text-3xl text-black">{mainNumber}</div>
          <div className="text-base text-[#8492b6] mt-1">{title}</div>
        </div>
        <div className="w-[280px]">
          <PieChartStatistic data={pieChardData} color={pieColor} />
        </div>
      </div>
    </Spin>
  )
}

export default StatisticCard

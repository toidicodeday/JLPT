import React, { useCallback, useMemo, useState } from 'react'
import { Axis, Chart, Interval, Legend, Tooltip } from 'bizcharts'
import { numberWithComma } from '@/utils/helpers/convert.helper'
import { maxBy } from 'lodash'
import { Grid, Spin } from 'antd'
import { addDays, differenceInDays, format, isSameDay, subDays } from 'date-fns'
import { useGetRevenueStatisticQuery } from '@/services/dashboardApi'
import DatePicker from '@/components/inputs/DatePicker'
import { zonedTimeToUtc } from 'date-fns-tz'
import styles from '../styles.module.scss'

const { RangePicker } = DatePicker

type Props = {}

const tickCount = 8
const { useBreakpoint } = Grid
const INIT_START_DATE = subDays(new Date(), 6)
const INIT_END_DATE = new Date()

const RevenueChart = (props: Props) => {
  const [timePeriod, setTimePeriod] = useState<[Date, Date]>([
    INIT_START_DATE,
    INIT_END_DATE,
  ])
  const apiQueryStr: string = `?dateFrom=${zonedTimeToUtc(
    new Date(
      timePeriod[0].getFullYear(),
      timePeriod[0].getMonth(),
      timePeriod[0].getDate(),
      0,
      0,
      0,
      0,
    ),
    'Asia/Bangkok',
  ).toISOString()}&dateTo=${zonedTimeToUtc(
    new Date(
      timePeriod[1].getFullYear(),
      timePeriod[1].getMonth(),
      timePeriod[1].getDate(),
      23,
      59,
      59,
      999,
    ),
    'Asia/Bangkok',
  ).toISOString()}`
  const { data: revenueStatistic, isLoading: isLoadingRevenueStatistic } =
    useGetRevenueStatisticQuery({
      query: apiQueryStr,
    })

  const getOneDateData = useCallback(
    (date: Date) => {
      return revenueStatistic &&
        revenueStatistic.filter(i => isSameDay(date, new Date(i.date))) &&
        revenueStatistic.filter(i => isSameDay(date, new Date(i.date)))
          ?.length > 0
        ? Math.round(
            Number(
              revenueStatistic.filter(i => isSameDay(date, new Date(i.date)))[0]
                .total,
            ),
          )
        : 0
    },
    [revenueStatistic],
  )
  const convertData = useMemo(() => {
    let dateArr: Date[] = []
    for (let i = 0; i <= differenceInDays(timePeriod[1], timePeriod[0]); i++) {
      dateArr.push(addDays(timePeriod[0], i))
    }
    const convertedData = dateArr.map(item => ({
      date: format(item, 'dd/MM/yyyy'),
      total: getOneDateData(item),
    }))
    return convertedData
  }, [getOneDateData, timePeriod])
  const totalRevenue = useMemo(() => {
    return convertData
      ? convertData.reduce(
          (total, item) => (item.total ? total + Number(item.total) : total),
          0,
        )
      : 0
  }, [convertData])
  const chartData = useMemo(() => {
    const lengendTitle = 'Doanh thu'
    const data = convertData.map(i => ({
      date: i.date,
      value: i.total,
      lengendTitle,
    }))
    let maxValue = maxBy(data, 'value')?.value || 0
    const unit = Math.floor(maxValue / tickCount / 10) * 10 || 10
    maxValue = Math.ceil(maxValue / unit) * unit
    return { data, maxValue: maxValue }
  }, [convertData])
  const screens = useBreakpoint()

  return (
    <div className={`rounded-md p-5 mb-5 ${styles.shadowCard}`}>
      <div className="flex justify-between mb-3 gap-3 flex-col md:flex-row">
        <p className="text-base text-black font-bold">BIỂU ĐỒ DOANH THU</p>
        <div className="flex md:items-center gap-3 flex-col md:flex-row">
          <p>
            Tổng doanh thu: <b>{numberWithComma(totalRevenue)}</b>
          </p>
          <RangePicker
            format={'dd/MM/yyyy'}
            value={timePeriod}
            onChange={value => {
              if (value && value[0] && value[1]) {
                setTimePeriod([value[0], value[1]])
              }
            }}
            allowEmpty={[false, false]}
            allowClear={false}
          />
        </div>
      </div>
      <div>
        <Spin spinning={isLoadingRevenueStatistic}>
          <Chart
            scale={{
              value: { min: 0, max: chartData.maxValue, tickCount: tickCount },
            }}
            autoFit
            height={320}
            data={chartData.data}
            interactions={['element-active']}
          >
            <Interval
              position="date*value"
              // color={['lengendTitle', ['#116476']]}
            />
            <Tooltip
              shared
              showCrosshairs
              region={null}
              g2-tooltip-list-item={{ display: 'flex' }}
              customItems={items =>
                items.map(i => ({
                  ...i,
                  value: Number(i.value).toLocaleString('en-US'),
                }))
              }
            />

            <Axis name="date" />
            <Axis
              name="value"
              line={{
                style: {
                  fill: '#ffffff',
                  lineWidth: 1,
                },
              }}
              grid={false}
              label={{
                formatter(text) {
                  return numberWithComma(Number(text))
                },
              }}
            />

            <Legend
              visible={screens.lg}
              title={{
                text: 'Biều đồ lượng doanh thu trên hệ thống',
              }}
              maxWidthRatio={30}
              position="right"
            />
          </Chart>
        </Spin>
      </div>
    </div>
  )
}

export default RevenueChart

// // 数据源

import React, { useCallback, useMemo, useState } from 'react'
import { Axis, Chart, Legend, LineAdvance, Tooltip } from 'bizcharts'
import { numberWithComma } from '@/utils/helpers/convert.helper'
import { maxBy } from 'lodash'
import { Grid, Spin } from 'antd'
import { addDays, differenceInDays, format, isSameDay, subDays } from 'date-fns'
import DatePicker from '@/components/inputs/DatePicker'
import { useGetOrderStatisticQuery } from '@/services/dashboardApi'
import { zonedTimeToUtc } from 'date-fns-tz'
import styles from '../styles.module.scss'

const { RangePicker } = DatePicker

type Props = {}

const INIT_START_DATE = subDays(new Date(), 6)
const INIT_END_DATE = new Date()

const tickCount = 8
const { useBreakpoint } = Grid

const OrderAmountChart = (props: Props) => {
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
  const { data: orderStatistic, isLoading: isLoadingOrderStatistic } =
    useGetOrderStatisticQuery({
      query: apiQueryStr,
    })
  const totalOrder = useMemo(() => {
    return orderStatistic
      ? orderStatistic.reduce(
          (total, item) => (item.count ? total + Number(item.count) : total),
          0,
        )
      : 0
  }, [orderStatistic])
  const getOneDateData = useCallback(
    (date: Date) => {
      return orderStatistic &&
        orderStatistic.filter(i => isSameDay(date, new Date(i.date))) &&
        orderStatistic.filter(i => isSameDay(date, new Date(i.date)))?.length >
          0
        ? Number(
            orderStatistic.filter(i => isSameDay(date, new Date(i.date)))[0]
              .count,
          )
        : 0
    },
    [orderStatistic],
  )
  const convertData = useMemo(() => {
    let dateArr: Date[] = []
    for (let i = 0; i <= differenceInDays(timePeriod[1], timePeriod[0]); i++) {
      dateArr.push(addDays(timePeriod[0], i))
    }
    const convertedData = dateArr.map(item => ({
      date: format(item, 'dd/MM/yyyy'),
      count: getOneDateData(item),
    }))
    return convertedData
  }, [getOneDateData, timePeriod])
  const chartData = useMemo(() => {
    const lengendTitle = 'Số lượng đơn hàng'
    const data = convertData?.map(i => ({
      date: i.date,
      value: i.count,
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
        <p className="text-base text-black font-bold">BIỂU ĐỒ LƯỢNG ĐƠN HÀNG</p>
        <div className="flex md:items-center gap-3 flex-col md:flex-row">
          <p>
            Tổng số chuyến: <b>{numberWithComma(totalOrder)}</b>
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
      <div className="pr-5">
        <Spin spinning={isLoadingOrderStatistic}>
          <Chart
            scale={{
              value: { min: 0, max: chartData.maxValue, tickCount: tickCount },
            }}
            autoFit
            height={320}
            data={chartData.data}
            interactions={['element-active']}
          >
            <LineAdvance
              shape="smooth"
              point
              area
              position="date*value"
              color={['lengendTitle', ['red']]}
            />
            <Tooltip
              shared
              showCrosshairs
              region={null}
              g2-tooltip-list-item={{ display: 'flex' }}
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
            />
            <Legend
              visible={screens.lg}
              title={{
                text: 'Biều đồ lượng đơn hàng trên hệ thống',
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

export default OrderAmountChart

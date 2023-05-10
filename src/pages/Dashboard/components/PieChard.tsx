import React from 'react'
import { Chart, Interval, Tooltip, Axis, Coordinate } from 'bizcharts'
import { ColorAttrCallback } from 'bizcharts/lib/interface'

interface Props {
  data: { item: string; percent: Number; value: Number }[]
  color: [string, string | string[] | ColorAttrCallback]
}

const PieChartStatistic = ({ data, color }: Props) => {
  return (
    <Chart height={150} data={data} interactions={['element-active']} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        // color="item"
        color={color}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={[
          'item',
          item => {
            return {
              offset: 20,
              content: data => {
                return `${data.item}\n ${data.value}`
              },
              style: {
                fill: '#424F6F',
              },
            }
          },
        ]}
      />
    </Chart>
  )
}

export default PieChartStatistic

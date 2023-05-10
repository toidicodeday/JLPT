import Icon from '@ant-design/icons'
import { Tag, Typography } from 'antd'
import { format, isFuture } from 'date-fns'
import { isPast } from 'date-fns/esm'
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

interface Props {
  data: any
  dataSource: any
  setDataSource: (values: any) => void
}

const PromoCard = (props: Props) => {
  return (
    <Tag
      closable
      className="flex"
      closeIcon={
        <Icon
          component={AiFillCloseCircle}
          style={{ fontSize: '12px', color: '#2192FF' }}
        />
      }
      onClose={() => {
        props.setDataSource({
          ...props.dataSource,
          promo: props.dataSource.promo.filter(
            (item: any) => item.id !== props.data.id,
          ),
        })
      }}
    >
      <div className="grid grid-cols-3">
        <div className="col-span-1 border-r border-y-0 border-l-0 border-solid border-grayChip flex justify-center items-center">
          <Typography className="font-bold text-primary text-base">
            {props?.data?.code}
          </Typography>
        </div>
        <div className="col-span-2 pl-3">
          <Typography className="font-bold">{props?.data?.title}</Typography>
          <Typography>
            Giảm {props?.data?.offVal}
            {props?.data?.type} . Tối đa{' '}
            {props?.data?.maxOffVal?.toLocaleString('en-US')}
          </Typography>
          <Typography>
            Áp dụng từ {format(new Date(props?.data?.fromDate), 'dd/MM')} -
            {format(new Date(props?.data?.toDate), 'dd/MM')}
          </Typography>
          {isFuture(new Date(props?.data?.fromDate)) && (
            <Typography className="text-greenColor">Sắp diễn ra</Typography>
          )}
          {isFuture(new Date(props?.data?.toDate)) &&
            isPast(new Date(props?.data?.fromDate)) && (
              <Typography className="text-greenColor">Đang diễn ra</Typography>
            )}
          {isPast(new Date(props?.data?.toDate)) && (
            <Typography className="text-greenColor">Hết hạn</Typography>
          )}
        </div>
      </div>
    </Tag>
  )
}

export default PromoCard

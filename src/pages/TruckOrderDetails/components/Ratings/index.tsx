import { OrderDetailsType } from '@/services/orderApi/types'
import Icon from '@ant-design/icons'
import { Button, Rate, Spin, Tooltip, Typography } from 'antd'
import React from 'react'
import { AiFillAppstore } from 'react-icons/ai'
import { FaTruck } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'

interface Props {
  data?: OrderDetailsType
  isLoadingDetails?: boolean
  refetchOrder: () => void
}

const TruckOrderRatings = ({ data, isLoadingDetails, refetchOrder }: Props) => {
  return (
    <Spin spinning={isLoadingDetails}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon
            component={AiFillAppstore}
            style={{ fontSize: 20, color: '#F99233' }}
          ></Icon>
          <Typography className="ml-2 font-bold">
            Dịch vụ ứng dụng đặt chuyến
          </Typography>
        </div>
        <Tooltip title="Làm mới" placement="topRight">
          <Button
            icon={<MdRefresh className="text-xl" />}
            className="flex items-center justify-center ml-2"
            onClick={() => {
              refetchOrder()
            }}
            loading={isLoadingDetails}
          />
        </Tooltip>
      </div>
      <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
        {data?.applicationRateStar && (
          <Rate
            allowHalf
            defaultValue={data?.applicationRateStar}
            style={{ fontSize: 16 }}
          />
        )}
        {data?.applicationGuestReviews && (
          <Typography className="mt-2">
            {data?.applicationGuestReviews}
          </Typography>
        )}

        {!data?.applicationRateStar && !data?.applicationGuestReviews && (
          <Typography>Chưa có đánh giá, nhận xét nào</Typography>
        )}
      </div>
      <div className="flex mt-4">
        <Icon
          component={FaTruck}
          style={{ fontSize: 20, color: '#F99233' }}
        ></Icon>
        <Typography className="ml-2 font-bold">
          Tài xế và dịch vụ vận chuyển
        </Typography>
      </div>
      <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
        {data?.serviceRateStar && (
          <Rate
            allowHalf
            defaultValue={data?.serviceRateStar}
            style={{ fontSize: 16 }}
          />
        )}
        {data?.serviceGuestReviews && (
          <Typography className="mt-2">{data?.serviceGuestReviews}</Typography>
        )}

        {!data?.serviceRateStar && !data?.serviceGuestReviews && (
          <Typography>Chưa có đánh giá, nhận xét nào</Typography>
        )}
      </div>
    </Spin>
  )
}

export default TruckOrderRatings

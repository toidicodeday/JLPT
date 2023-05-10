import Icon from '@ant-design/icons'
import { Tabs, Typography } from 'antd'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link } from 'react-router-dom'
import DriverActivityLogs from './components/ActivityLogs'
import DriverInfo from './components/DriverInfo'
import DriverRatings from './components/DriverRatings'

const onChange = (key: string) => {
  console.log(key)
}

const DriverDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-xe/tai-xe">
          <div className="flex items-center">
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              THÔNG TIN TÀI XẾ
            </Typography>
          </div>
        </Link>
      </div>
      <Tabs
        defaultActiveKey="info"
        onChange={onChange}
        items={[
          {
            key: 'info',
            label: 'Thông tin tài xế',
            children: <DriverInfo />,
          },
          {
            key: 'history',
            label: 'Lịch sử hoạt động và doanh thu',
            children: <DriverActivityLogs />,
          },
          {
            key: 'review',
            label: 'Đánh giá hoạt động',
            children: <DriverRatings />,
          },
        ]}
      />
    </div>
  )
}

export default DriverDetails

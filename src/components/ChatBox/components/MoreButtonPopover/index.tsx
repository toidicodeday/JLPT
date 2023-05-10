import Icon from '@ant-design/icons'
import { Button, Divider, Menu, Popover } from 'antd'
import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

interface Props {
  data: any
}

const MoreButtonPopover = (props: Props) => {
  const navigate = useNavigate()
  const handleBlockUser = () => {}
  const content = (
    <div>
      <Menu>
        <Menu.Item
          onClick={() => {
            navigate(
              `/quan-ly-xe/tai-xe/chi-tiet?${props?.data?.relatedOrder?.orderId}`,
            )
          }}
        >
          Thông tin chuyến hàng
        </Menu.Item>
        <Menu.Item>Chat với tài xế chuyến hàng</Menu.Item>
        <Divider className="my-0" />
        <Menu.Item onClick={() => handleBlockUser()}>Chặn</Menu.Item>
      </Menu>
    </div>
  )
  return (
    <Popover content={content}>
      <Button type="text" icon={<Icon component={FiMoreVertical} />} />
    </Popover>
  )
}

export default MoreButtonPopover

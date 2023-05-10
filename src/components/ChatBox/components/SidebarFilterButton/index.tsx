import { Badge, Col, Row, Typography } from 'antd'
import React from 'react'

interface Props {
  propFilterList?: any
  setPropFilterList: (values: any) => void
  countUnread?: any
}

const SidebarFilterButton = (props: Props) => {
  return (
    <Row gutter={4}>
      {props?.propFilterList?.map((filterItem: any) => (
        <Col span={8}>
          <div
            className={`p-1 rounded hover:cursor-pointer ${
              filterItem?.isSelected ? 'bg-redButton' : 'bg-grayButton'
            }`}
            onClick={() =>
              props.setPropFilterList(
                props?.propFilterList?.map((item: any) => {
                  if (item?.value === filterItem?.value) {
                    return {
                      ...item,
                      isSelected: true,
                    }
                  } else {
                    return {
                      ...item,
                      isSelected: false,
                    }
                  }
                }),
              )
            }
          >
            <Badge
              dot
              count={props?.countUnread?.reduce(
                (total: number, eachGroup: any) =>
                  total + eachGroup?.totalUnread,
                0,
              )}
              className="w-full"
            >
              <Typography className="py-1 px-2 text-center">
                {filterItem?.label}
              </Typography>
            </Badge>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default SidebarFilterButton

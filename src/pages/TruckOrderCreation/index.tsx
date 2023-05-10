import Icon from '@ant-design/icons'
import { Button, Popover, Typography } from 'antd'
import React from 'react'
import TruckOrderCreatePage1 from './components/CreateOrderPage1'
import TruckOrderCreatePage2 from './components/CreateOrderPage2'
import { useNavigate } from 'react-router-dom'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import Cookies from 'js-cookie'
import { TEMP_ORDER_CODE } from '@/utils/constant/constant'
import { useGetOrderDetailsQuery } from '@/services/orderApi/order'
import AutoFillLocation from './components/AutoFillLocation'

export type AddressType = {
  id: string
  location: {
    key: string
    location: string
    locationDetail: string
    place_id: string
    value: string
    latitude: number
    longitude: number
  }
  name: string
  phone: string
  note: string
  time?: string
  selectedTime?: string
}

const TruckOrderCreate = () => {
  const navigate = useNavigate()
  const currOrderCode = Cookies.get(TEMP_ORDER_CODE.TEMP_TX_CODE)
  const [values, setValues] = React.useState<any>([])
  const [isNextPage, setIsNextPage] = React.useState<boolean>(false)
  const [isCopyDetails, setIsCopyDetails] = React.useState<boolean>(false)
  const {
    data: initialOrderDetails,
    isFetching: isLoadingOrderDetails,
    refetch: refetchOrderDetails,
  } = useGetOrderDetailsQuery(
    {
      code: currOrderCode,
    },
    { skip: !currOrderCode },
  )

  const handleChangePage = () => {
    if (isNextPage) setIsNextPage(false)
    if (!isNextPage) navigate('/chuyen-hang/taxi-tai/')
  }

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
          <div className="flex items-center" onClick={handleChangePage}>
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              TẠO CHUYẾN HÀNG
            </Typography>
          </div>
          {!isNextPage && (
            <Popover
              placement="bottomRight"
              content={
                <AutoFillLocation
                  orderDetails={initialOrderDetails?.data}
                  refetchOrderDetails={refetchOrderDetails}
                  setOpen={setIsCopyDetails}
                />
              }
              trigger="click"
              open={isCopyDetails}
              onOpenChange={(val: boolean) => setIsCopyDetails(val)}
            >
              <Button>Sao chép dữ liệu đơn hàng</Button>
            </Popover>
          )}
        </div>
        {!isNextPage && (
          <TruckOrderCreatePage1
            handleSubmit={(value: any) => setValues(value)}
            setIsNextPage={setIsNextPage}
            orderDetails={initialOrderDetails?.data}
            isLoadingOrderDetails={isLoadingOrderDetails}
          />
        )}
        {isNextPage && (
          <TruckOrderCreatePage2
            handleSubmit={setValues}
            setIsNextPage={setIsNextPage}
            page1Data={values}
            orderDetails={initialOrderDetails?.data}
          />
        )}
      </div>
    </>
  )
}

export default TruckOrderCreate

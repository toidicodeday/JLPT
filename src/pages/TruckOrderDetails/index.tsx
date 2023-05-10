import Icon from '@ant-design/icons'
import { Spin, Tabs, Typography } from 'antd'
import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import ActivityLogs from './components/ActivityLogs'
import OrderBill from './components/OrderBill'
import TruckOrderInfo from './components/TruckOrderInfo'
import TruckOrderRatings from './components/Ratings'
import {
  useGetOrderDetailsQuery,
  useUpdateOrderDetailsMutation,
} from '@/services/orderApi/order'
import { ORDER_STATUS, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'
import useGetPermission from '../../hooks/useGetPermission'
import { getLabelFromOps } from '@/utils/helpers/convert.helper'
import DetailsLayout from './components/DetailsLayout'
import CancelReasonModal from './components/TruckOrderInfo/components/CancelReasonModal'

const TruckOrderDetails = () => {
  const location = useLocation()
  const currOrderCode =
    new URLSearchParams(location.search).get('orderCode') || undefined
  const {
    data: orderDetailsData,
    refetch,
    isFetching: isFetchingDetails,
  } = useGetOrderDetailsQuery(
    {
      code: currOrderCode,
    },
    { skip: !currOrderCode },
  )

  const [updateOrderDetails, { isLoading: isUpdatingStatus }] =
    useUpdateOrderDetailsMutation()
  const [openCancelConfModal, setOpenCancelConfModal] =
    React.useState<boolean>(false)

  //handle Authorize
  const { editPermission } = useGetPermission(SYSTEM_ROLE_KEY.txOrder)
  const handleCancelOrder = async (reasonStr?: string) => {
    try {
      const cancelRes = await updateOrderDetails({
        id: currOrderCode,
        body: reasonStr
          ? {
              status: 8,
              orderCancelReasons: [{ reason: reasonStr }],
            }
          : {
              status: 8,
            },
      })
      if ('data' in cancelRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpenCancelConfModal(false)
      }
      if ('error' in cancelRes)
        toast.error(
          get(cancelRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }

  return (
    <React.Fragment>
      <Spin spinning={isFetchingDetails}>
        <div className="p-3">
          <div className="xl:flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
            <Link to="/chuyen-hang/taxi-tai">
              <div className="flex items-center">
                <Icon
                  component={MdOutlineArrowBackIosNew}
                  className="text-sm xl:text-lg text-black"
                />
                <Typography className="text-base xl:text-lg font-bold ml-2">
                  CHUYẾN HÀNG {orderDetailsData?.data?.code}
                </Typography>
              </div>
            </Link>
            <div className="xl:flex mt-2 xl:mt-0">
              <Typography className="text-[#D32F2F] text-right xl:text-left">
                Dịch vụ: Taxi tải
              </Typography>
              <Typography className="text-[#F99233] xl:ml-4 text-right xl:text-left">
                Trạng thái:{' '}
                {getLabelFromOps(orderDetailsData?.data?.status, ORDER_STATUS)}
              </Typography>
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Thông tin chuyến hàng',
                key: '1',
                children: (
                  <DetailsLayout
                    children={
                      <TruckOrderInfo
                        data={orderDetailsData?.data}
                        openCancelModal={setOpenCancelConfModal}
                        isLoadingDetails={isFetchingDetails}
                        editPermission={editPermission}
                        refetchOrder={refetch}
                      />
                    }
                    data={orderDetailsData?.data}
                  />
                ),
              },
              {
                label: 'Hoá đơn',
                key: '2',
                children: (
                  <DetailsLayout
                    children={
                      <OrderBill
                        data={orderDetailsData?.data}
                        isLoadingDetails={isFetchingDetails}
                        refetchOrder={refetch}
                      />
                    }
                    data={orderDetailsData?.data}
                  />
                ),
              },
              {
                label: 'Lịch sử giao hàng',
                key: '3',
                children: (
                  <DetailsLayout
                    children={
                      <ActivityLogs
                        data={orderDetailsData?.data}
                        isLoadingDetails={isFetchingDetails}
                        refetchOrder={refetch}
                      />
                    }
                    data={orderDetailsData?.data}
                  />
                ),
              },
              {
                label: 'Đánh giá',
                key: '4',
                children: (
                  <DetailsLayout
                    children={
                      <TruckOrderRatings
                        data={orderDetailsData?.data}
                        isLoadingDetails={isFetchingDetails}
                        refetchOrder={refetch}
                      />
                    }
                    data={orderDetailsData?.data}
                  />
                ),
              },
            ]}
          />

          <CancelReasonModal
            open={openCancelConfModal}
            setOpen={setOpenCancelConfModal}
            handleSubmit={handleCancelOrder}
            isCanceling={isUpdatingStatus}
          />
        </div>
      </Spin>
    </React.Fragment>
  )
}

export default TruckOrderDetails

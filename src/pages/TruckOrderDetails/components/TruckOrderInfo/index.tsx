import DriverLocation from '@/components/Order/DriverLocation'
import OrderDetailsLocation from '@/components/Order/OrderDetailsLocation'
import OrderDriverCpnt from '@/components/Order/OrderDriverChoose'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import useCreateChat from '@/hooks/useCreateChat'
import { useGetOneCustomerQuery } from '@/services/customerApi'
import { useUpdateOrderDetailsMutation } from '@/services/orderApi/order'
import { OrderDetailsType, OrderLocationType } from '@/services/orderApi/types'
import { STATUS_ORDER } from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { Button, Divider, message, Spin, Tag, Tooltip, Typography } from 'antd'
import { get, isNumber, orderBy } from 'lodash'
import React, { useMemo } from 'react'
import { FaFacebookMessenger, FaLocationArrow } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import { toast } from 'react-toastify'
import ChooseDriverModal from '../ChooseDriverModal/'
import GuestInfo from '../../../../components/Order/GuestInfo'
import TxPermanentDriverInfo from './components/PermanentDriverInfo'
import TruckVehicleCategory from './components/TruckOrderCategory'
import NoDriverInfo from './components/NoDriverInfo'
import { SyncOutlined } from '@ant-design/icons'

interface Props {
  data?: OrderDetailsType
  openCancelModal: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingDetails: boolean
  refetchOrder: () => void
  editPermission: boolean
}

const TruckOrderInfo = (props: Props) => {
  const [openModal, setOpenModal] = React.useState(false)
  const [openDriverLoc, setOpenDriverLoc] = React.useState<boolean>(false)
  const { currentUser } = useSbCurrentUser()
  const { openOrderChat } = useCreateChat()
  const sendInfo: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(props.data?.orderLocations, 'sort', 'asc')
    return sortedLocations.slice(0, 1) || []
  }, [props?.data?.orderLocations])
  const receiveInfo: OrderLocationType[] = useMemo(() => {
    const sortedLocations = orderBy(props.data?.orderLocations, 'sort', 'asc')
    return sortedLocations.slice(1) || []
  }, [props?.data?.orderLocations])
  const [updateOrder, { isLoading: isUpdating }] =
    useUpdateOrderDetailsMutation()
  const orderActionStatus: { [key: string]: boolean } = useMemo(
    () => ({
      canCancelOrder:
        props?.editPermission &&
        props?.data?.status !== STATUS_ORDER.COMPLETE &&
        props?.data?.status !== STATUS_ORDER.CANCEL &&
        props?.data?.status !== STATUS_ORDER.FAILURE,
      canModifyOrderVehicle:
        props?.editPermission &&
        props?.data?.status !== STATUS_ORDER.COMPLETE &&
        props?.data?.status !== STATUS_ORDER.CANCEL &&
        props?.data?.status !== STATUS_ORDER.FAILURE,
      canViewDriverLocation:
        props?.data?.status === STATUS_ORDER.RECEIVED ||
        props?.data?.status === STATUS_ORDER.ARRIVED ||
        props?.data?.status === STATUS_ORDER.DELIVERY ||
        props?.data?.status === STATUS_ORDER.ARRIVING,
    }),
    [props?.editPermission, props?.data?.status],
  )
  const orderVehicleStatus: { [key: string]: boolean } = useMemo(
    () => ({
      haveDriver:
        props?.data?.orderVehicleChooses &&
        props?.data?.orderVehicleChooses?.length > 0
          ? true
          : false,
    }),
    [props?.data?.orderVehicleChooses],
  )
  const isDisplayPermanentInfo: boolean = useMemo(() => {
    return (
      props?.data?.status === STATUS_ORDER.COMPLETE ||
      props?.data?.status === STATUS_ORDER.FAILURE ||
      props?.data?.status === STATUS_ORDER.CANCEL
    )
  }, [props?.data?.status])
  const { data: guestDetails, isFetching: isFetchingGuestDetails } =
    useGetOneCustomerQuery(
      {
        id: Number(props?.data?.guestId),
      },
      { skip: !isNumber(props?.data?.guestId) },
    )
  const handleAssignDriver = async (vehicleId: number) => {
    try {
      const assignRes = await updateOrder({
        id: props.data?.code,
        body: {
          assignListDriver: {
            orderVehicleChooses: [{ vehicleId: vehicleId }],
          },
        },
      })
      if ('data' in assignRes) {
        toast.success(MESSAGES.CALL_API_MODIFY_SUCCESS)
        setOpenModal(false)
      }
      if ('error' in assignRes)
        toast.error(
          get(assignRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
    } catch (error) {
      toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
    }
  }
  const openChat = async (order: any) => {
    const channelUrl = order.code
    if (channelUrl) {
      openOrderChat({
        adminSenbirdId: currentUser?.userId || '',
        orderCode: channelUrl,
        isReadOnly: [
          STATUS_ORDER.CANCEL,
          STATUS_ORDER.COMPLETE,
          STATUS_ORDER.FAILURE,
        ].includes(order.status),
      })
    } else {
      message.error('Có lỗi xảy ra')
    }
  }

  return (
    <React.Fragment>
      <div className="min-h-[calc(100vh-250px)] flex flex-col justify-between">
        <div>
          <div className="flex justify-end items-center">
            {props.data?.guestId && (
              <Button
                type="text"
                icon={
                  <FaFacebookMessenger className="text-blueColor text-xl hover:cursor-pointer hover:text-[#0080f7]" />
                }
                onClick={() => openChat(props.data)}
              />
            )}
            {orderActionStatus.canCancelOrder && (
              <Button
                className="ml-2"
                danger
                onClick={() => props.openCancelModal(() => true)}
              >
                Hủy chuyến
              </Button>
            )}
            <Tooltip title="Làm mới" placement="topRight">
              <Button
                icon={<MdRefresh className="text-xl" />}
                className="flex items-center justify-center ml-2"
                onClick={() => props.refetchOrder()}
                disabled={props.isLoadingDetails}
              />
            </Tooltip>
          </div>
          <Spin spinning={isFetchingGuestDetails}>
            <GuestInfo guestDetails={guestDetails} />
          </Spin>
          <Typography className="font-bold mt-4">Đơn hàng</Typography>
          <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
            {sendInfo?.map((item: OrderLocationType) => (
              <OrderDetailsLocation
                key={item.id}
                type="sender"
                hasDivider={true}
                orderDetails={props?.data}
                orderCode={props?.data?.code}
                editPermission={props.editPermission}
                locationDetails={item}
                pickupType={props?.data?.pickupType}
                pickupDate={props?.data?.pickupDate}
              />
            ))}
            {receiveInfo?.map((item: OrderLocationType, index: number) => (
              <OrderDetailsLocation
                key={item.id}
                type="receiver"
                hasDivider={index < receiveInfo?.length - 1}
                orderCode={props?.data?.code}
                editPermission={props.editPermission}
                locationDetails={item}
                orderDetails={props?.data}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <Typography className="font-bold">
              Phương tiện và dịch vụ
            </Typography>
            {orderActionStatus.canViewDriverLocation && (
              <Button
                icon={<FaLocationArrow />}
                className="flex items-center mr-2 text-blueColor hover:text-primary"
                onClick={() => setOpenDriverLoc(true)}
              >
                <span className=" ml-1">Theo dõi hành trình</span>
              </Button>
            )}
          </div>
          <div className="p-4 border border-solid border-grayButton rounded-md mt-2">
            <div className="xl:grid xl:grid-cols-2 xl:gap-4">
              <div className="xl:border-y-0 xl:border-l-0 xl:border-r xl:border-solid xl:border-grayButton pr-4">
                {props?.data?.orderVehicleCategories?.map(item => (
                  <TruckVehicleCategory categoryData={item} key={item.id} />
                ))}
              </div>
              <Divider className="xl:hidden" />
              {orderActionStatus.canModifyOrderVehicle ? (
                <div className="xl:px-4">
                  {!orderVehicleStatus.haveDriver && (
                    <NoDriverInfo
                      setOpen={setOpenModal}
                      orderCode={props?.data?.code}
                      autoFinding={props?.data?.driverFinding}
                    />
                  )}
                  {orderVehicleStatus.haveDriver &&
                    props?.data?.driverFinding &&
                    props?.data?.orderVehicleChooses[0].status !==
                      'PUBLISH' && (
                      <Tag color="green" className="mb-2">
                        <SyncOutlined spin />
                        <span>Hệ thống đang tìm tài xế</span>
                      </Tag>
                    )}
                  {orderVehicleStatus.haveDriver &&
                    props?.data?.orderVehicleChooses?.map((item, index) => (
                      <div key={item.id}>
                        <OrderDriverCpnt
                          key={item.id}
                          driverId={item?.vehicle?.driverId}
                          removable={orderActionStatus.canModifyOrderVehicle}
                          received={item?.status === 'PUBLISH'}
                          vehicleId={item?.id}
                          licensePlatese={item?.vehicle?.licensePlatese}
                          orderVehicleChoosesId={item.id}
                          editPermission={props.editPermission}
                          driverStatus={item?.driverStatus}
                        />
                        {props?.data?.orderVehicleChooses &&
                          index <
                            props?.data?.orderVehicleChooses?.length - 1 && (
                            <Divider />
                          )}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  {!isDisplayPermanentInfo ? (
                    <div>
                      {props?.data?.orderVehicleChooses &&
                      props?.data?.orderVehicleChooses?.length > 0 ? (
                        <>
                          {props?.data?.orderVehicleChooses?.map(
                            (item, index) => (
                              <div key={item.id}>
                                <OrderDriverCpnt
                                  key={item.id}
                                  driverId={item?.vehicle?.driverId}
                                  removable={false}
                                  received={item?.status === 'PUBLISH'}
                                  vehicleId={item?.vehicleId}
                                  licensePlatese={item?.vehicle?.licensePlatese}
                                  orderVehicleChoosesId={item.id}
                                  editPermission={props.editPermission}
                                  driverStatus={item?.driverStatus}
                                />
                                {props?.data?.orderVehicleChooses &&
                                  index <
                                    props?.data?.orderVehicleChooses?.length -
                                      1 && <Divider />}
                              </div>
                            ),
                          )}
                        </>
                      ) : (
                        <div>Chưa có tài xế nhận chuyến</div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {props?.data?.orderDriverVehicles?.map((i, idx) => (
                        <div key={i.id}>
                          <TxPermanentDriverInfo
                            key={i.id}
                            data={i}
                            received={i.status === 'PUBLISH'}
                          />
                          {props?.data?.orderDriverVehicles &&
                            idx <
                              props?.data?.orderDriverVehicles?.length - 1 && (
                              <Divider />
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChooseDriverModal
        open={openModal}
        setOpen={(type: boolean) => setOpenModal(type)}
        handleSubmit={(values: number) => handleAssignDriver(values)}
        orderCode={props?.data?.code}
        categoryId={props?.data?.orderVehicleCategories[0]?.id}
        isUpdating={isUpdating}
      />
      <DriverLocation
        open={openDriverLoc}
        setOpen={setOpenDriverLoc}
        orderCode={props?.data?.code}
      />
    </React.Fragment>
  )
}

export default TruckOrderInfo

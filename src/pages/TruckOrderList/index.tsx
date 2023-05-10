import Icon from '@ant-design/icons'
import {
  Button,
  message,
  Popconfirm,
  Rate,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FaFacebookMessenger, FaCheckCircle, FaCopy } from 'react-icons/fa'
import CRUD from '@/components/CRUD'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import {
  MdNewReleases,
  MdAutorenew,
  MdCancel,
  MdOutlineRule,
} from 'react-icons/md'
import {
  useCopyOrderDetailsMutation,
  useCreateTempOrderMutation,
  useGetOrderListQuery,
} from '@/services/orderApi/order'
import {
  FilterFieldsType,
  FilterTabsType,
  SortFieldType,
} from '@/services/tableBaseApi/types'
import { useGetVehicleCategoryOpsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'
import { useGetMainServiceListQuery } from '@/services/serviceApi/service'
import {
  ORDER_CANCEL_REASON,
  ORDER_CANCEL_REF,
  ORDER_STATUS,
  ORDER_STATUS_OPS,
  ORDER_TABLE_COL_SIZE,
  STATUS_ORDER,
  SYSTEM_ROLE_KEY,
  TEMP_ORDER_CODE,
} from '@/utils/constant/constant'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { format } from 'date-fns'
import { ColumnsType } from 'antd/lib/table'
import { CancelReasonType, OrderType } from '@/services/orderApi/types'
import { get, isEmpty, isString } from 'lodash'
import { formatDate, formatPhone } from '@/utils/helpers/convert.helper'
import { AiFillEdit } from 'react-icons/ai'
import { RiMapPinFill } from 'react-icons/ri'
import DriverLocation from '@/components/Order/DriverLocation'
import useCreateChat from '@/hooks/useCreateChat'
import useSbCurrentUser from '@/components/SendbirdChat/hooks/userHooks/useSbCurrentUser'
import useGetPermission from '@/hooks/useGetPermission'
import animationData from '../../assets/lotties/exclamationMark.json'
import Lottie from 'react-lottie'
import { MESSAGES } from '@/utils/constant/messages.constant'

const TruckOrderList = () => {
  const navigate = useNavigate()
  const txTableWidth = useMemo(
    () =>
      isString(localStorage.getItem(ORDER_TABLE_COL_SIZE.TX_TABLE_SIZE))
        ? JSON.parse(
            localStorage.getItem(ORDER_TABLE_COL_SIZE.TX_TABLE_SIZE) || '',
          )
        : [],
    [],
  )
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>(
    undefined,
  )
  const [openDriverLoc, setOpenDriverLoc] = useState<boolean>(false)
  const [isRefetchData, setIsRefetchData] = useState<boolean>(false)
  const [listFilterConditions, setListFilterConditions] = useState<any>()

  const queryCV = useMemo(() => {
    const query = `?page=1&limit=1000`
    if (
      listFilterConditions &&
      listFilterConditions?.filter(
        (item: any) => item.searchKey === 'workingAreaId',
      )[0]?.value
    )
      return (
        query +
        `&search=workingAreaId:=:${
          listFilterConditions?.filter(
            (item: any) => item.searchKey === 'workingAreaId',
          )[0]?.value
        }`
      )

    return query
  }, [listFilterConditions])

  const { data: categoryList, isFetching: isFetchingCategoryList } =
    useGetVehicleCategoryOpsQuery({
      query: `${queryCV}`,
    })
  const { data: mainServiceList, isFetching: isFetchingMainService } =
    useGetMainServiceListQuery()
  const currServiceId = useMemo(
    () =>
      mainServiceList?.find(item => item.type === 'tx')?.id
        ? mainServiceList?.find(item => item.type === 'tx')?.id
        : undefined,
    [mainServiceList],
  )
  const { data: locationList, isFetching: isFetchingLocationList } =
    useGetAreaOpsQuery({
      query: '?search=parentId:=:0',
    })
  const [createTempOrder, { isLoading: isCreatingTempOrder }] =
    useCreateTempOrderMutation()
  const [copyOrderDetails, { isLoading: isCopyingDetails }] =
    useCopyOrderDetailsMutation()

  const { openOrderChat } = useCreateChat()
  const { currentUser } = useSbCurrentUser()

  const openChat = useCallback(
    async (order: any) => {
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
    },
    [currentUser?.userId, openOrderChat],
  )
  const statusColumns = (values: any, record: any) => {
    switch (values) {
      case STATUS_ORDER.DRAFT:
        return null
      case STATUS_ORDER.NEW:
        return (
          <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.NEW].color}>
            {ORDER_STATUS_OPS[STATUS_ORDER.NEW].label}
          </Tag>
        )
      case STATUS_ORDER.WAITING_CONSULT:
        return (
          <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.WAITING_CONSULT].color}>
            {ORDER_STATUS_OPS[STATUS_ORDER.WAITING_CONSULT].label}
          </Tag>
        )
      case STATUS_ORDER.CONSULTED:
        return (
          <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.CONSULTED].color}>
            {ORDER_STATUS_OPS[STATUS_ORDER.CONSULTED].label}
          </Tag>
        )
      case STATUS_ORDER.ARRIVING:
        return (
          <>
            <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.ARRIVING]?.color}>
              {ORDER_STATUS_OPS[STATUS_ORDER.ARRIVING].label}
            </Tag>
            <Typography>
              Cập nhật: {format(new Date(record.updatedAt), 'dd/MM HH:mm')}
            </Typography>
            <Button
              type="text"
              icon={<RiMapPinFill className="text-primary" />}
              onClick={() => {
                setSelectedOrder(record.code)
                setOpenDriverLoc(true)
              }}
            />
          </>
        )
      case STATUS_ORDER.ARRIVED:
        return (
          <>
            <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.ARRIVED]?.color}>
              {ORDER_STATUS_OPS[STATUS_ORDER.ARRIVED]?.label}
            </Tag>
            <Typography>
              Cập nhật: {format(new Date(record.updatedAt), 'dd/MM HH:mm')}
            </Typography>
            <Button
              type="text"
              icon={<RiMapPinFill className="text-primary" />}
              onClick={() => {
                setSelectedOrder(record.code)
                setOpenDriverLoc(true)
              }}
            />
          </>
        )
      case STATUS_ORDER.DELIVERY:
        return (
          <>
            <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.DELIVERY]?.color}>
              {ORDER_STATUS_OPS[STATUS_ORDER.DELIVERY]?.label}
            </Tag>
            <Typography>
              Cập nhật: {format(new Date(record.updatedAt), 'dd/MM HH:mm')}
            </Typography>
            <Button
              type="text"
              icon={<RiMapPinFill className="text-primary" />}
              onClick={() => {
                setSelectedOrder(record.code)
                setOpenDriverLoc(true)
              }}
            />
          </>
        )
      case STATUS_ORDER.RECEIVED:
        return (
          <>
            <Tag color={ORDER_STATUS_OPS[STATUS_ORDER.RECEIVED]?.color}>
              {ORDER_STATUS_OPS[STATUS_ORDER.RECEIVED]?.label}
            </Tag>
            <Typography>
              Cập nhật: {format(new Date(record.updatedAt), 'dd/MM HH:mm')}
            </Typography>
            <Button
              type="text"
              icon={<RiMapPinFill className="text-primary" />}
              onClick={() => {
                setSelectedOrder(record.code)
                setOpenDriverLoc(true)
              }}
            />
          </>
        )
      case STATUS_ORDER.COMPLETE:
        return (
          <div>
            <div className="text-center">
              <FaCheckCircle className="text-[#35703B] text-[16px]" />
            </div>
            <Typography className="mt-1 text-center">
              Cập nhật: {format(new Date(record.updatedAt), 'dd/MM HH:mm')}
            </Typography>
            <Rate
              allowHalf
              defaultValue={record.serviceRateStar}
              disabled
              style={{ fontSize: 12 }}
            />
          </div>
        )
      case STATUS_ORDER.CANCEL:
        const handleGetCancelBy = () => {
          switch (record.orderCancelByRef) {
            case 'admin':
              return `${ORDER_CANCEL_REF.admin} - ${record.orderCancelBy?.name}`
            case 'driver':
              return `${ORDER_CANCEL_REF.driver} - ${record.orderCancelBy?.name}`
            case 'guest':
              return `${ORDER_CANCEL_REF.guest} - ${record.orderCancelBy?.name}`
            default:
              return 'Không rõ'
          }
        }
        const handleGetCancelReason = () => {
          if (
            record.orderCancelReasons &&
            record.orderCancelReasons?.length > 0
          ) {
            if (record.orderCancelByRef === 'admin') {
              return record.orderCancelReasons
                ?.map((item: CancelReasonType) => item.reason)
                .join(' - ')
            } else {
              return record.orderCancelReasons
                ?.map((item: CancelReasonType) => {
                  switch (item.reason) {
                    case '0':
                      return ORDER_CANCEL_REASON[0]
                    case '1':
                      return ORDER_CANCEL_REASON[1]
                    case '2':
                      return ORDER_CANCEL_REASON[2]
                    case '3':
                      return ORDER_CANCEL_REASON[3]
                    case '4':
                      return ORDER_CANCEL_REASON[4]
                    default:
                      return 'Không rõ'
                  }
                })
                .join(' - ')
            }
          } else {
            return 'Không rõ'
          }
        }
        return (
          <>
            <Typography>
              <span className="font-bold">
                Người huỷ: {handleGetCancelBy()}
              </span>
            </Typography>
            <Typography>
              <span className="font-bold">Lý do:</span>{' '}
              {handleGetCancelReason()}
            </Typography>
          </>
        )
      case STATUS_ORDER.FAILURE:
        return (
          <Typography>
            Lý do: {record?.failReason ? record?.failReason : 'Không rõ'}
          </Typography>
        )
      default:
        return null
    }
  }

  const defaultAnimationOps = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    [],
  )
  const lackDriverWarningCol = useCallback(
    (record: OrderType) => {
      return !record.enoughDriver &&
        !record.driverFinding &&
        record.status === STATUS_ORDER.NEW ? (
        <Tooltip title="Chuyến hàng chưa đủ tài xế" placement="topRight">
          <Lottie options={defaultAnimationOps} height={40} width={40} />
        </Tooltip>
      ) : (
        <React.Fragment></React.Fragment>
      )
    },
    [defaultAnimationOps],
  )
  const handleFindColumnsWidth = useCallback(
    (key: string) => {
      return txTableWidth &&
        txTableWidth?.length > 0 &&
        txTableWidth?.find((i: { key: string; width: Number }) => i.key === key)
        ? txTableWidth?.find(
            (i: { key: string; width: Number }) => i.key === key,
          )?.width
        : null
    },
    [txTableWidth],
  )
  const handleChangePage = useCallback(
    (orderCode: string) => {
      navigate({
        pathname: '/chuyen-hang/taxi-tai/chi-tiet',
        search: createSearchParams({
          orderCode: orderCode,
        }).toString(),
      })
    },
    [navigate],
  )
  const handleCreateTempOrder = useCallback(
    async (serviceId: number) => {
      const createRes = await createTempOrder({ serviceId: serviceId })
      if ('data' in createRes) {
        Cookies.set(TEMP_ORDER_CODE.TEMP_TX_CODE, createRes.data.data.code)
        return {
          orderCreated: true,
          newOrderCode: createRes.data.data.code,
        }
      }
      if ('error' in createRes) {
        toast.error(
          get(createRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
        return {
          orderCreated: false,
          newOrderCode: null,
        }
      }
    },
    [createTempOrder],
  )
  const handleCopyOrder = useCallback(
    async (oldOrderCode: string, newOrderCode: string) => {
      const copyOrderRes = await copyOrderDetails({
        oldOrderCode: oldOrderCode,
        newOrderCode: newOrderCode,
      })
      if ('data' in copyOrderRes) {
        navigate(
          `/chuyen-hang/taxi-tai/them-moi?orderCode=${Cookies.get(
            TEMP_ORDER_CODE.TEMP_TX_CODE,
          )}`,
        )
      }
      if ('error' in copyOrderRes) {
        toast.error(
          get(copyOrderRes.error, 'data.error.message') ||
            MESSAGES.CALL_API_ERROR,
        )
      }
    },
    [copyOrderDetails, navigate],
  )
  const handleCreateCopiedOrder = useCallback(
    async (record: OrderType) => {
      const createTempOrderRes = await handleCreateTempOrder(record.serviceId)
      if (createTempOrderRes?.orderCreated && createTempOrderRes?.newOrderCode)
        handleCopyOrder(record.code, createTempOrderRes?.newOrderCode)
    },
    [handleCopyOrder, handleCreateTempOrder],
  )
  const columnsMobile: ColumnsType<OrderType> = useMemo(
    () => [
      {
        key: 'code',
        className: 'cursor-pointer',
        render: (_, record) => {
          return (
            <div>
              <div>
                <span className="mr-3 font-bold">Order: {record?.code}</span>
              </div>
              <div className="flex items-center mt-1">
                {statusColumns(record?.status, record)}
                {lackDriverWarningCol(record)}
              </div>
              {isEmpty(record?.guest) && (
                <p className="mt-2">Khách hàng: Không rõ</p>
              )}
              {!isEmpty(record?.guest) && (
                <p className="mt-2">
                  Khách hàng:{' '}
                  {record?.guest?.name ? record?.guest?.name : 'Không rõ'}
                  {record?.guest?.phone
                    ? ` - ${formatPhone(record?.guest?.phone)}`
                    : ' -  Không rõ'}
                  <Button
                    type="text"
                    onClick={() => openChat(record)}
                    icon={
                      <FaFacebookMessenger className="text-base text-[#59AFFF]" />
                    }
                  />
                </p>
              )}
              {record?.createdByAdmin && (
                <Typography>
                  Người tạo: Admin:{' '}
                  {record?.createdByAdmin?.name
                    ? record?.createdByAdmin?.name
                    : 'Không rõ'}
                </Typography>
              )}
              {record?.createdByGuest && (
                <div>
                  Người tạo: Khách hàng:{' '}
                  {record?.createdByGuest?.name
                    ? record?.createdByGuest?.name
                    : 'Không rõ'}{' '}
                  -{' '}
                  {record?.createdByGuest?.phone
                    ? formatPhone(record?.createdByGuest?.phone)
                    : 'Không rõ'}
                </div>
              )}
              <p>
                Tài xế:{' '}
                {record?.orderVehicleChooses.length > 0
                  ? record?.orderVehicleChooses[0]?.vehicle?.driver?.name
                  : 'Chưa có'}
              </p>
              <p>
                Mã xe:{' '}
                {record?.orderVehicleChooses.length > 0
                  ? record?.orderVehicleChooses[0]?.vehicle?.vehicleCode ||
                    'Chưa có'
                  : 'Chưa có'}
              </p>
              <p>
                Thời gian gửi yêu cầu:{' '}
                {record?.createdAt &&
                  formatDate(record?.createdAt, 'dd-MM-yyyy HH:mm')}
              </p>
              <p>
                Thời gian vận chuyển:{' '}
                {record?.pickupDate && record?.pickupDate >= record?.createdAt
                  ? format(new Date(record?.pickupDate), 'dd-MM-yyyy HH:mm')
                  : format(new Date(record?.createdAt), 'dd-MM-yyyy HH:mm')}
              </p>
              <div className="flex-1">
                <Typography>
                  Điểm lấy: {record.orderLocationStart?.location}
                </Typography>
                <Typography>
                  Điểm giao: {record.orderLocationEnd?.location}
                </Typography>
                {record.orderVehicleCategories[0] && (
                  <>
                    <Typography>
                      Xe:{' '}
                      <span className="font-bold">
                        {record.orderVehicleCategories[0]?.name}
                      </span>
                    </Typography>
                    <Typography>
                      {record.orderVehicleCategories[0]?.length}x
                      {record.orderVehicleCategories[0]?.width}x
                      {record.orderVehicleCategories[0]?.height}m. Lên đến{' '}
                      {record.orderVehicleCategories[0]?.capacity}kg.
                    </Typography>
                  </>
                )}
                {!record.orderVehicleCategories[0] && (
                  <Typography>Xe: Không rõ</Typography>
                )}
              </div>
            </div>
          )
        },
      },
      {
        key: 'activity',
        align: 'right',
        render: (record: any) => {
          return (
            <React.Fragment>
              <Tooltip title="Xem và chỉnh sửa" placement="topRight">
                <Button
                  type="text"
                  icon={<AiFillEdit className="text-lg text-navyButton" />}
                  onClick={() => handleChangePage(record?.code)}
                />
              </Tooltip>
              <Popconfirm
                title={
                  <React.Fragment>
                    <span>Bạn đang sao chép đơn hàng</span>
                    <span className="text-primary font-bold">{` ${record.code}`}</span>
                    <span>. Bạn có muốn tiếp tục?</span>
                  </React.Fragment>
                }
                onConfirm={e => {
                  handleCreateCopiedOrder(record)
                }}
                okText="Tiếp tục"
                cancelText="Quay lại"
                okButtonProps={{
                  disabled: isCreatingTempOrder || isCopyingDetails,
                }}
              >
                <Button
                  icon={<FaCopy className="text-xl text-grayChip" />}
                  type="link"
                ></Button>
              </Popconfirm>
            </React.Fragment>
          )
        },
      },
    ],
    [
      handleChangePage,
      handleCreateCopiedOrder,
      isCopyingDetails,
      isCreatingTempOrder,
      lackDriverWarningCol,
      openChat,
    ],
  )
  const columns: ColumnsType<OrderType> = useMemo(
    () => [
      {
        title: 'Mã chuyến hàng',
        dataIndex: 'code',
        key: 'code',
        render: (value, record) => (
          <div
            className="cursor-pointer"
            onClick={() => handleChangePage(record?.code)}
          >
            {value}
          </div>
        ),
        width: handleFindColumnsWidth('code')
          ? handleFindColumnsWidth('code')
          : 170,
      },
      {
        title: 'Dịch vụ',
        dataIndex: 'serviceId',
        key: 'serviceId',
        align: 'center',
        render: () => <Tag color="#D32F2F">Taxi tải</Tag>,
        width: handleFindColumnsWidth('serviceId')
          ? handleFindColumnsWidth('serviceId')
          : 95,
      },
      {
        title: 'Thời gian gửi yêu cầu',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: value => {
          return (
            <Typography>
              {value ? format(new Date(value), 'dd-MM-yyyy HH:mm') : ''}
            </Typography>
          )
        },
        width: handleFindColumnsWidth('createdAt')
          ? handleFindColumnsWidth('createdAt')
          : 132,
      },
      {
        title: 'Thời gian vận chuyển',
        dataIndex: 'pickupDate',
        key: 'pickupDate',
        align: 'center',
        render: (value, record) => {
          return (
            <Typography>
              {value >= record?.createdAt
                ? format(new Date(value), 'dd-MM-yyyy HH:mm')
                : format(new Date(record?.createdAt), 'dd-MM-yyyy HH:mm')}
            </Typography>
          )
        },
        width: handleFindColumnsWidth('pickupDate')
          ? handleFindColumnsWidth('pickupDate')
          : 132,
      },
      {
        title: 'Chuyến hàng',
        dataIndex: '',
        key: 'details',
        render: (_, record) => {
          return (
            <div className="flex-1">
              <Typography>
                Điểm lấy: {record.orderLocationStart?.location}
              </Typography>
              <Typography>
                Điểm giao: {record.orderLocationEnd?.location}
              </Typography>
              {record.orderVehicleCategories[0] && (
                <>
                  <Typography>
                    Xe:{' '}
                    <span className="font-bold">
                      {record.orderVehicleCategories[0]?.name}
                    </span>
                  </Typography>
                  <Typography>
                    {record.orderVehicleCategories[0]?.length}x
                    {record.orderVehicleCategories[0]?.width}x
                    {record.orderVehicleCategories[0]?.height}m. Lên đến{' '}
                    {record.orderVehicleCategories[0]?.capacity}kg.
                  </Typography>
                </>
              )}
              {!record.orderVehicleCategories[0] && (
                <Typography>Xe: Không rõ</Typography>
              )}
            </div>
          )
        },
        width: handleFindColumnsWidth('details')
          ? handleFindColumnsWidth('details')
          : 520,
      },
      {
        title: 'Người tạo',
        key: 'id',
        render: (value, record) => {
          if (record?.createdByAdmin) {
            return (
              <>
                <Typography>
                  Admin:{' '}
                  {record?.createdByAdmin?.name
                    ? record?.createdByAdmin?.name
                    : 'Không rõ'}
                </Typography>
              </>
            )
          } else if (record?.createdByGuest) {
            return (
              <div>
                <Typography>
                  Khách hàng:{' '}
                  {record?.createdByGuest?.name
                    ? record?.createdByGuest?.name
                    : 'Không rõ'}
                </Typography>
                <Typography>
                  {record?.createdByGuest?.phone
                    ? formatPhone(record?.createdByGuest?.phone)
                    : 'Không rõ'}
                </Typography>
              </div>
            )
          }
        },
        width: handleFindColumnsWidth('id')
          ? handleFindColumnsWidth('id')
          : 129,
      },
      {
        title: 'Tài xế',
        key: 'driver',
        render: (_, record) => {
          if (record?.enoughDriver && record?.orderVehicleChooses.length > 0) {
            return (
              <p>{record?.orderVehicleChooses[0]?.vehicle?.driver?.name}</p>
            )
          } else return <p>Chưa có</p>
        },
        width: handleFindColumnsWidth('driver')
          ? handleFindColumnsWidth('driver')
          : 97,
      },
      {
        title: 'Mã xe',
        key: 'vehicleCode',
        render: (_, record) => {
          if (record?.enoughDriver && record?.orderVehicleChooses.length > 0) {
            return (
              record?.orderVehicleChooses[0]?.vehicle?.vehicleCode || 'Chưa có'
            )
          } else return <p>Chưa có</p>
        },
        width: handleFindColumnsWidth('vehicleCode')
          ? handleFindColumnsWidth('vehicleCode')
          : 80,
      },
      {
        title: 'Khách hàng',
        dataIndex: 'guest',
        key: 'guest',
        render: (value, record) => {
          if (!isEmpty(value)) {
            return (
              <div>
                <div>
                  <Typography>
                    {value?.name ? value?.name : 'Không rõ'}
                  </Typography>
                </div>
                <div className="flex xl:flex-row xl:items-center md:flex-col mt-1 ">
                  <Typography className="mr-2">
                    {value?.phone ? formatPhone(value?.phone) : 'Không rõ'}
                  </Typography>
                  <Button
                    type="text"
                    onClick={() => openChat(record)}
                    icon={
                      <FaFacebookMessenger className="text-base text-[#59AFFF]" />
                    }
                  />
                </div>
              </div>
            )
          } else {
            return <Typography>Không rõ</Typography>
          }
        },
        width: handleFindColumnsWidth('guest')
          ? handleFindColumnsWidth('guest')
          : 128,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (values, record) => {
          return statusColumns(values, record)
        },
        width: handleFindColumnsWidth('status')
          ? handleFindColumnsWidth('status')
          : 187,
      },
      {
        title: '',
        dataIndex: '',
        key: 'warning',
        align: 'center',
        render: (_: any, record) => lackDriverWarningCol(record),
        width: handleFindColumnsWidth('warning')
          ? handleFindColumnsWidth('warning')
          : 65,
      },
      {
        title: '',
        dataIndex: '',
        key: 'copyOrder',
        align: 'center',
        render: (_: any, record) => (
          <Popconfirm
            title={
              <React.Fragment>
                <span>Bạn đang sao chép đơn hàng</span>
                <span className="text-primary font-bold">{` ${record.code}`}</span>
                <span>. Bạn có muốn tiếp tục?</span>
              </React.Fragment>
            }
            onConfirm={e => {
              handleCreateCopiedOrder(record)
            }}
            okText="Tiếp tục"
            cancelText="Quay lại"
            okButtonProps={{
              disabled: isCreatingTempOrder || isCopyingDetails,
            }}
          >
            <Button
              icon={<FaCopy className="text-xl text-grayChip" />}
              type="link"
            ></Button>
          </Popconfirm>
        ),
      },
    ],
    [
      handleChangePage,
      handleCreateCopiedOrder,
      handleFindColumnsWidth,
      isCopyingDetails,
      isCreatingTempOrder,
      lackDriverWarningCol,
      openChat,
    ],
  )
  const filterField: FilterFieldsType[] = useMemo(
    () => [
      {
        filterType: 'normal',
        type: 'searchText',
        searchKey: 'code',
        placeholder: 'Tìm kiếm theo mã đơn hàng, số điện thoại, địa chỉ',
        width: 2,
      },
      {
        filterType: 'other',
        type: 'searchText',
        searchKey: 'vehicleCode',
        placeholder: 'Tìm kiếm theo mã xe',
        width: 1,
      },
      {
        filterType: 'other',
        type: 'filterSelection',
        searchKey: 'workingAreaId',
        placeholder: 'Tìm kiếm khu vực',
        options:
          !locationList || locationList?.length <= 0
            ? [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các khu vực',
                  isSelected: true,
                },
              ]
            : [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các khu vực',
                  isSelected: true,
                },
                ...locationList?.map(
                  (item: { value: string | number; label: string }) => ({
                    id: item.value,
                    value: item.value,
                    label: item.label,
                    isSelected: false,
                  }),
                ),
              ],
        width: 1,
      },
      {
        filterType: 'other',
        type: 'filterSelectionWSearch',
        searchKey: 'categoryId',
        placeholder: 'Chọn loại xe',
        options:
          !categoryList || categoryList?.length <= 0
            ? [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các loại xe',
                  isSelected: true,
                },
              ]
            : [
                {
                  id: 'all',
                  value: 'all',
                  label: 'Tất cả các loại xe',
                  isSelected: true,
                },
                ...categoryList?.map(
                  (item: { value: string | number; label: string }) => ({
                    id: item.value,
                    value: item.value,
                    label: item.label,
                    isSelected: false,
                  }),
                ),
              ],
        width: 1,
      },
      {
        filterType: 'normal',
        type: 'filterDateRange',
        searchKey: 'createdAt',
        width: 1,
        placeholder: 'Thời gian từ - đến',
      },
      {
        filterType: 'other',
        type: 'filterSelection',
        searchKey: 'statusSpecific',
        placeholder: 'Tìm kiếm trạng thái',
        options: [
          {
            id: 'all',
            value: 'all',
            label: 'Tất cả các trạng thái',
            isSelected: true,
          },
          ...ORDER_STATUS?.filter(
            i =>
              i.value !== STATUS_ORDER.DRAFT &&
              i.value !== STATUS_ORDER.FAILURE,
          )?.map(item => ({
            id: item.value,
            value: item.value,
            label: item.label,
            isSelected: false,
          })),
        ],
        width: 1,
      },
    ],
    [categoryList, locationList],
  )
  const filterTabs: FilterTabsType = useMemo(
    () => ({
      type: 'other',
      searchKey: 'listStatus',
      opt: '=',
      options: [
        {
          value: [
            STATUS_ORDER.NEW,
            STATUS_ORDER.WAITING_CONSULT,
            STATUS_ORDER.CONSULTED,
            STATUS_ORDER.ARRIVING,
            STATUS_ORDER.ARRIVED,
            STATUS_ORDER.DELIVERY,
            STATUS_ORDER.RECEIVED,
            STATUS_ORDER.COMPLETE,
            STATUS_ORDER.CANCEL,
            STATUS_ORDER.FAILURE,
          ].join(','),
          icon: MdOutlineRule,
          label: 'Tất cả chuyến hàng',
          isSearching: true,
        },
        {
          value: [
            STATUS_ORDER.NEW,
            STATUS_ORDER.WAITING_CONSULT,
            STATUS_ORDER.CONSULTED,
          ].join(','),
          icon: MdNewReleases,
          label: 'Chuyến hàng chưa được xử lý',
          isSearching: false,
        },
        {
          value: [
            STATUS_ORDER.ARRIVING,
            STATUS_ORDER.ARRIVED,
            STATUS_ORDER.DELIVERY,
            STATUS_ORDER.RECEIVED,
          ].join(','),
          icon: MdAutorenew,
          label: 'Chuyến hàng đang xử lý',
          isSearching: false,
        },
        {
          value: STATUS_ORDER.COMPLETE,
          icon: FaCheckCircle,
          label: 'Chuyến hàng hoàn thành',
          isSearching: false,
        },
        {
          value: STATUS_ORDER.CANCEL,
          icon: MdCancel,
          label: 'Chuyến hàng đã huỷ',
          isSearching: false,
        },
      ],
    }),
    [],
  )
  const SortField: SortFieldType = useMemo(() => {
    return {
      sortBy: 'createdAt',
      options: [
        {
          id: 'desc',
          sort: 'desc',
          label: 'Mới nhất',
          isSelected: true,
        },
        {
          id: 'asc',
          sort: 'asc',
          label: 'Cũ nhất',
          isSelected: false,
        },
      ],
    }
  }, [])
  //handle Authorize
  const { createPermission } = useGetPermission(SYSTEM_ROLE_KEY.txOrder)

  const handleCreateNewOrder = async () => {
    try {
      const response = await createTempOrder({
        serviceId: currServiceId,
      })
      if ('data' in response) {
        Cookies.set(TEMP_ORDER_CODE.TEMP_TX_CODE, response.data.data.code)
        setTimeout(() => {
          navigate(
            `/chuyen-hang/taxi-tai/them-moi?orderCode=${response.data.data.code}`,
          )
        }, 300)
      }
      if ('error' in response) {
        toast.error('Có lỗi. Vui lòng thử lại')
      }
    } catch (error) {
      toast.error('Có lỗi. Vui lòng thử lại')
    }
  }

  useEffect(() => {
    let intervalId: any
    intervalId = setInterval(() => {
      setIsRefetchData(true)
    }, 30000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Spin
      spinning={
        isFetchingCategoryList ||
        isFetchingLocationList ||
        isFetchingMainService
      }
    >
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          QUẢN LÝ CHUYẾN HÀNG TAXI TẢI
        </Typography>

        {createPermission && (
          <div className="flex items-center">
            <Tooltip title="Thêm mới chuyến hàng taxi tải" placement="topRight">
              <Button
                type="text"
                icon={
                  <Icon
                    component={MdAddCircle}
                    className="text-2xl text-primary"
                  />
                }
                onClick={() => {
                  handleCreateNewOrder()
                }}
                loading={isCopyingDetails}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <CRUD
        columns={columns}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetOrderListQuery }}
        filterTabs={filterTabs}
        enableDownloadFile
        initialFilter={
          currServiceId
            ? {
                type: 'normal',
                searchKey: 'serviceId',
                opt: ':=:',
                value: currServiceId,
              }
            : undefined
        }
        sortField={SortField}
        rowKey="code"
        hiddenTotal
        columnsMobile={columnsMobile}
        refetchTable={true}
        rtkSkip={!currServiceId}
        rtkInterval={{
          isRefetchData: isRefetchData,
          setIsRefetchData: setIsRefetchData,
        }}
        listFilterConditions={setListFilterConditions}
        isDisplayListFiterCOndition={true}
        rowClassName={(record: any, index: number) =>
          !record.enoughDriver &&
          !record.driverFinding &&
          record.status === STATUS_ORDER.NEW
            ? 'bg-[#F6ECEC]'
            : ''
        }
        isResizable
      />

      <DriverLocation
        open={openDriverLoc}
        setOpen={setOpenDriverLoc}
        orderCode={selectedOrder}
      />
    </Spin>
  )
}

export default TruckOrderList

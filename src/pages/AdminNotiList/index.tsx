import CRUD from '@/components/CRUD'
import Icon from '@ant-design/icons'
import { Button, Popconfirm, Tag, Tooltip, Typography } from 'antd'
import React, { useMemo } from 'react'
import { MdAddCircle, MdNotifications, MdRemoveRedEye } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FilterFieldsType } from '@/services/tableBaseApi/types'
import { ColumnsType } from 'antd/lib/table'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import {
  ADMIN_NOTI_RECEIVER_NAME,
  SYSTEM_ROLE_KEY,
} from '@/utils/constant/constant'
import {
  useDeleteAdminNotiMutation,
  useGetListAdminNotificationQuery,
} from '@/services/adminNotificationApi'
import {
  AdminNotiType,
  GroupMemberType,
} from '@/services/adminNotificationApi/types'
import {
  addAllOpsToFilterOps,
  formatDateString,
} from '@/utils/helpers/convert.helper'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { toast } from 'react-toastify'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { get } from 'lodash'

export const getReceiverName = (receiverName: GroupMemberType) => {
  if (
    ADMIN_NOTI_RECEIVER_NAME.filter(i => i.value === receiverName) &&
    ADMIN_NOTI_RECEIVER_NAME.filter(i => i.value === receiverName).length > 0
  )
    return ADMIN_NOTI_RECEIVER_NAME.filter(i => i.value === receiverName)[0]
      .label
  else return 'Chưa rõ'
}

const AdminNotificationList = () => {
  //handle Authorize
  const adminInfo = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.notification,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.notification,
        'delete',
      ),
    }
  }, [adminInfo])

  const location = useLocation()
  const navigate = useNavigate()
  const { data: locationOps } = useGetAreaOpsQuery({
    query: `?search=${encodeURIComponent(`parentId:=:0`)}`,
  })

  const [deleteAdminNoti] = useDeleteAdminNotiMutation()

  const renderAction = (status: boolean, recordId: number) => {
    return (
      <>
        {!status && (
          <Tooltip title="Xem và chỉnh sửa thông báo" placement="topRight">
            <Link to={`${location.pathname}/chi-tiet?id=${recordId}`}>
              <Button
                type="text"
                icon={
                  <Icon
                    component={AiFillEdit}
                    className="text-lg text-navyButton"
                  />
                }
              />
            </Link>
          </Tooltip>
        )}
        {status && (
          <Tooltip title="Xem thông báo" placement="topRight">
            <Link to={`${location.pathname}/chi-tiet?id=${recordId}`}>
              <Button
                type="text"
                icon={
                  <Icon
                    component={MdRemoveRedEye}
                    className="text-lg text-navyButton"
                  />
                }
              />
            </Link>
          </Tooltip>
        )}
        {authorizeStatus.canDelete && !status && (
          <Tooltip title="Xoá thông báo" placement="topRight">
            <Popconfirm
              title={`Bạn có chắc chắn xoá thông báo ${recordId}?`}
              placement="bottomRight"
              okText="Tiếp tục"
              cancelText="Quay lại"
              onConfirm={() => handleDeleteNoti(recordId)}
            >
              <Button
                type="text"
                icon={<Icon component={AiFillDelete} className="text-lg" />}
                disabled={status}
              />
            </Popconfirm>
          </Tooltip>
        )}
      </>
    )
  }
  const columns: ColumnsType<AdminNotiType> = [
    {
      title: 'Nội dung thông báo',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (_: any, record: any) => (
        <div className="flex items-center">
          <div>
            <Icon
              component={MdNotifications}
              className="text-lg text-primary"
            />
          </div>
          <div className="ml-3">
            <Typography className="font-bold">{record.title}</Typography>
            {/* <div
              className="truncate overflow-hidden max-h-20"
              dangerouslySetInnerHTML={{ __html: record.content }}
            ></div> */}
          </div>
        </div>
      ),
    },
    {
      title: 'Đối tượng nhận',
      dataIndex: 'groupMemberSetup',
      key: 'groupMemberSetup',
      width: 300,
      render: (_, record) => {
        if (
          record.selectAll ||
          (!record.selectAll && record.groupMemberSetup?.selectAll)
        ) {
          return <Tag color="#108ee9">Tất cả mọi người</Tag>
        } else {
          return (
            <div className="flex flex-wrap">
              {record.groupMemberSetup?.groupMemberSelected.map(
                (i: GroupMemberType) => (
                  <Tag color="blue" className="mr-1 mt-1">
                    {getReceiverName(i)}
                  </Tag>
                ),
              )}
            </div>
          )
        }
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      align: 'center',
      render: value => <>{formatDateString(value)}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'sent',
      align: 'center',
      width: 120,
      key: 'sent',
      render: value => {
        switch (value) {
          case true:
            return <Tag color="#35703B">Đã gửi</Tag>
          case false:
            return <Tag color="#F99233">Chưa gửi</Tag>
        }
      },
    },
    {
      dataIndex: '',
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        return renderAction(record.sent, record.id)
      },
    },
  ]
  const columnsMobile: ColumnsType<AdminNotiType> = [
    {
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <div className="flex">
          <div className="flex-1">
            <div>
              {record.sent ? (
                <Tag color="#35703B">Đã gửi</Tag>
              ) : (
                <Tag color="#F99233">Chưa gửi</Tag>
              )}
            </div>
            <div className="font-bold mt-2">{record.title}</div>
            {/* <div
              className="truncate overflow-hidden max-h-20 mt-2"
              dangerouslySetInnerHTML={{ __html: record.content }}
            ></div> */}
            <div className="mt-2 flex flex-wrap">
              {record.selectAll ||
              (!record.selectAll && record.groupMemberSetup?.selectAll) ? (
                <Tag color="#108ee9">Tất cả mọi người</Tag>
              ) : (
                <div className="flex flex-wrap">
                  {record.groupMemberSetup?.groupMemberSelected.map(
                    (i: GroupMemberType) => (
                      <Tag color="blue" className="mr-1 mt-1">
                        {getReceiverName(i)}
                      </Tag>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return renderAction(record.sent, record.id)
      },
    },
  ]
  const filterField: FilterFieldsType[] = [
    {
      filterType: 'normal',
      type: 'searchText',
      searchKey: 'title,content',
      placeholder: 'Tìm kiếm',
      width: 1,
    },
    {
      filterType: 'other',
      type: 'filterSelection',
      searchKey: 'workingAreaId',
      placeholder: 'Tìm kiếm khu vực',
      width: 1,
      options: addAllOpsToFilterOps(locationOps, 'Tất cả các khu vực'),
    },
    {
      filterType: 'normal',
      type: 'filterDateRange',
      searchKey: 'createdAt',
      width: 1,
    },
  ]
  const handleDeleteNoti = async (deletedId: number | null) => {
    if (deletedId) {
      try {
        const deleteRes = await deleteAdminNoti({ id: deletedId })
        if ('data' in deleteRes) {
          toast.success(MESSAGES.CALL_API_DELETE_SUCCESS)
          navigate('/thong-bao')
        }
        if ('error' in deleteRes) {
          toast.error(
            get(deleteRes.error, 'data.error.message') ||
              MESSAGES.CALL_API_ERROR,
          )
        }
      } catch (error) {
        toast.error(get(error, 'data.error.message') || MESSAGES.CALL_API_ERROR)
      }
    } else toast.error(MESSAGES.CALL_API_ERROR)
  }
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">GỬI THÔNG BÁO</Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới thông báo" placement="topRight">
              <Link to="/thong-bao/them-moi">
                <Button
                  type="text"
                  icon={
                    <Icon
                      component={MdAddCircle}
                      className="text-2xl text-primary"
                    />
                  }
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <CRUD
        columns={columns}
        columnsMobile={columnsMobile}
        filterFields={filterField}
        rtk={{ useGetQuery: useGetListAdminNotificationQuery }}
        hiddenTotal
        initialSort={{ sort: 'desc', sortBy: 'id' }}
        rowKey="id"
        refetchTable={true}
      />
    </>
  )
}

export default AdminNotificationList

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Col,
  Row,
  Select,
  Tooltip,
  Typography,
  Input,
  Modal,
  Form,
  Spin,
  message,
} from 'antd'
import { MdAddCircle } from 'react-icons/md'
import { ColumnsType } from 'antd/lib/table'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  useCreateForbiddenRoadMutation,
  useDeleteForbiddenRoadMutation,
  useGetForbiddenRoadQuery,
  useGetOneForbiddenRoadQuery,
  useUpdateForbiddenRoadMutation,
} from '@/services/forbiddenRoadApi'
import { debounce } from 'lodash'
import TableResponsive from '@/components/Table'
import DragListForbiddenRoadTime from './components/ForbiddenRoadTime'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { formatDate } from '@/utils/helpers/convert.helper'
import { useGetVehicleCategoryOptionsQuery } from '@/services/vehicleCategoryApi/vehicleCategory'

type DataType = {
  id?: number
  forbiddenRoad: string
  area: string
}

const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const ForbiddenRoad = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.forbiddenRoad,
        'create',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.forbiddenRoad,
        'delete',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.forbiddenRoad,
        'edit',
      ),
    }
  }, [adminInfo])
  const [form] = Form.useForm()
  const workingAreaId = Form.useWatch('workingAreaId', form)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenDel, setIsModalOpenDel] = useState(false)
  const [idRoad, setIdRoad] = useState(null)
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)
  const [searchText, setSearchText] = useState('')
  const [workingAreaIdSearch, setWorkingAreaIdSearch] = useState<number>()

  const { data: locationOps } = useGetAreaOpsQuery({
    query: `?search=${encodeURIComponent(`parentId:=:0`)}`,
  })

  const { data: districtAreaOps } = useGetAreaOpsQuery(
    {
      query: `?search=parentId:=:${workingAreaId}`,
    },
    { skip: !workingAreaId },
  )

  const { data: opsVehicleCategory } = useGetVehicleCategoryOptionsQuery({
    query: '?limit=1000',
  })

  const searchQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''
    if (searchText) queryEncode += `name:ilike:%${searchText}%;`
    if (workingAreaIdSearch)
      queryEncode += `workingAreaId:=:${workingAreaIdSearch};`

    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [page, rowsPerPage, searchText, workingAreaIdSearch])

  const { data: listRoad, isLoading } = useGetForbiddenRoadQuery({
    query: searchQuery,
  })

  const { data: detailRoad, isLoading: isLoadingDetail } =
    useGetOneForbiddenRoadQuery(
      { id: idRoad },
      { skip: !idRoad || !isModalOpen },
    )

  const [deleteRoad] = useDeleteForbiddenRoadMutation()
  const [createForbiddenRoad] = useCreateForbiddenRoadMutation()
  const [updateForbiddenRoad] = useUpdateForbiddenRoadMutation()

  const formatDateHourMinute = (dateString?: string) => {
    try {
      if (!dateString) return null
      const [hour, minute] = dateString.split(':')
      const date = new Date()
      date.setHours(Number(hour))
      date.setMinutes(Number(minute))
      return date
    } catch (error) {
      message.error('Có lỗi xảy ra với giờ cấm đường')
      return null
    }
  }

  useEffect(() => {
    if (idRoad && isModalOpen && detailRoad?.data && !isLoadingDetail) {
      form.setFieldsValue({
        name: detailRoad?.data.name,
        districtId: detailRoad?.data?.districtId,
        workingAreaId: detailRoad?.data.workingAreaId,
        vehicleCategoryId:
          detailRoad?.data.vehicleCategories === null
            ? []
            : detailRoad?.data.vehicleCategories?.map((i: any) => i.id),
        forbiddenRoadTime: detailRoad?.data?.forbiddenRoadTime.map(
          (item: any) => {
            return {
              from: formatDateHourMinute(item?.from),
              to: formatDateHourMinute(item?.to),
            }
          },
        ),
      })
    }
  }, [detailRoad?.data, form, idRoad, isLoadingDetail, isModalOpen])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Đường cấm',
      render: (record: any) =>
        record?.name === '*' ? 'Tất cả các đường' : record?.name,
    },
    {
      title: 'Giờ cấm',
      render: (record: any) =>
        record?.forbiddenRoadTime.length > 0 ? (
          record?.forbiddenRoadTime?.map((item: any) => {
            return (
              <p>
                {item?.from} - {item?.to}
              </p>
            )
          })
        ) : (
          <p>Tất cả các giờ</p>
        ),
    },
    {
      title: 'Loại xe',
      render: (record: any) =>
        record?.vehicleCategories.length > 0 ? (
          record?.vehicleCategories?.map((item: any, key: any) => {
            if (key < 3) {
              return <p>{item?.name}</p>
            } else if (key === 3) {
              return <p>More...</p>
            }
          })
        ) : (
          <p>Tất cả các loại xe</p>
        ),
    },
    {
      title: 'Khu vực',
      render: (record: any) => record?.workingArea?.name,
    },
    {
      align: 'right',
      render: (record: any) => {
        return (
          <>
            {authorizeStatus.canEdit && (
              <Tooltip
                title="Xem và chỉnh sửa thông tin đường cấm"
                placement="topRight"
              >
                <Button
                  type="text"
                  icon={<AiFillEdit className="text-lg text-navyButton" />}
                  onClick={() => {
                    setIdRoad(record?.id)
                    showModalAddForbiddenRoad()
                  }}
                />
              </Tooltip>
            )}
            {authorizeStatus.canDelete && (
              <Tooltip title="Xoá thông tin đường cấm" placement="topRight">
                <Button
                  type="text"
                  icon={<AiFillDelete className="text-lg" />}
                  onClick={() => {
                    setIdRoad(record?.id)
                    setIsModalOpenDel(true)
                  }}
                />
              </Tooltip>
            )}
          </>
        )
      },
    },
  ]

  const showModalAddForbiddenRoad = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIdRoad(null)
    setIsModalOpen(false)
    form.resetFields()
  }

  const handleDelRoad = async (id: number) => {
    try {
      const deleteResponse = await deleteRoad({ id: id })
      if ('data' in deleteResponse) {
        toast.success('Xóa đường cấm thành công!')
      }
      if ('error' in deleteResponse) toast.error('Xóa đường cấm thất bại!')
      setIdRoad(null)
      setIsModalOpenDel(false)
    } catch (error) {
      toast.warning('Xóa đường cấm thất bại!')
    }
  }

  const handleCancelDelRoad = () => {
    setIsModalOpenDel(false)
  }

  const onFormFinish = (values: any) => {
    try {
      console.log(values)
      const body = {
        name: values?.name,
        districtId: values?.districtId || null,
        workingAreaId: values?.workingAreaId,
        vehicleCategories: values?.vehicleCategoryId?.map((i: any) => {
          return {
            id: i,
          }
        }),
        forbiddenRoadTime:
          values?.forbiddenRoadTime &&
          values?.forbiddenRoadTime?.map((item: any) => {
            return {
              from: formatDate(item?.from, 'HH:mm'),
              to: formatDate(item?.to, 'HH:mm'),
            }
          }),
      }
      if (idRoad) {
        updateForbiddenRoad({
          id: idRoad,
          body: body,
        }).then((response: any) => {
          if ('data' in response) {
            toast.success('Chỉnh sửa đường cấm thành công!')
          } else if ('error' in response) {
            toast.error('Chỉnh sửa đường cấm thất bại!')
          }
          setIdRoad(null)
        })
      } else {
        createForbiddenRoad(body).then((response: any) => {
          if (response.data) {
            toast.success('Tạo mới đường cấm thành công!')
          } else if (response.error) {
            toast.error('Tạo mới đường cấm thất bại!')
          }
          setIdRoad(null)
        })
      }
      setIsModalOpen(false)
      form.resetFields()
    } catch (error) {
      console.log(error)

      toast.error('Tạo mới đường cấm thất bại!!!')
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchNameString = useCallback(
    debounce(value => setSearchText(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider mb-5">
        <Typography className="text-lg font-bold">ĐƯỜNG CẤM</Typography>
        {authorizeStatus.canCreate && (
          <div>
            <Tooltip title="Thêm mới đường cấm" placement="topRight">
              <Button
                type="text"
                icon={<MdAddCircle className="text-2xl text-primary" />}
                onClick={() => {
                  setIdRoad(null)
                  showModalAddForbiddenRoad()
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <Row
        gutter={16}
        className="my-4 border border-solid border-grayBorder py-4 px-2"
      >
        <Col className="rounded" xs={12} sm={12} md={5}>
          <Input
            allowClear
            placeholder="Tìm kiếm"
            onChange={event => {
              setPage(initPage)
              debouncSearchNameString(event.target.value)
            }}
          />
        </Col>
        <Col xs={12} sm={12} md={5}>
          <Select
            options={locationOps}
            className="w-full"
            placeholder="Tất cả khu vực"
            allowClear
            onChange={(value: any) => {
              setPage(initPage)
              setWorkingAreaIdSearch(value)
            }}
          />
        </Col>
      </Row>
      {/* <div className="flex justify-end">
        <div className="w-36 h-9">
          <Upload>
            <Button className="font-bold" icon={<FileExcelOutlined />}>
              Tải file mẫu
            </Button>
          </Upload>
        </div>
        {authorizeStatus.canCreate && (
          <div>
            <Upload>
              <Button className="font-bold" icon={<UploadOutlined />}>
                Tải lên danh sách
              </Button>
            </Upload>
          </div>
        )}
      </div> */}
      <TableResponsive
        columns={columns}
        dataSource={listRoad?.data}
        loading={isLoading}
        totalData={listRoad?.total}
        handleChangePage={handleChangePage}
        currentPage={page}
      />
      <Modal
        title={idRoad ? 'Chỉnh sửa đường cấm' : 'Thêm mới đường cấm'}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Lưu"
        onOk={form.submit}
        cancelText="Hủy"
      >
        <Spin spinning={isLoadingDetail}>
          <Form
            layout="vertical"
            onFinish={onFormFinish}
            form={form}
            validateMessages={{ required: MESSAGES.REQUIRED_ERROR }}
          >
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  label="Khu vực"
                  name="workingAreaId"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={locationOps}
                    onChange={() => form.setFieldValue('districtId', undefined)}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={2}>
                <Form.Item label="Quận" name="districtId">
                  <Select
                    options={districtAreaOps}
                    disabled={!workingAreaId}
                    allowClear
                    placeholder={
                      workingAreaId && (
                        <p className="text-black font-normal">
                          Tất cả các quận
                        </p>
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Tên đường cấm"
                  name="name"
                  rules={[
                    { required: true, message: 'Hãy nhập tên đường cấm!' },
                  ]}
                >
                  <Input placeholder="Nhập tên đường, Nhập * nếu áp dụng cho tất cả các đường" />
                </Form.Item>
              </Col>
            </Row>
            <p className="font-medium mb-2">ÁP DỤNG</p>
            <div className="bg-[#F5F5F5] p-2 rounded">
              <Row>
                <Col span={24}>
                  <Form.Item label="Loại xe áp dụng" name="vehicleCategoryId">
                    <Select
                      options={opsVehicleCategory}
                      mode="multiple"
                      allowClear
                      placeholder={
                        <p className="text-black font-normal">
                          Tất cả các loại xe
                        </p>
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p className="text-[#000000d9] mb-1">Khung giờ cấm</p>
                </Col>
                <DragListForbiddenRoadTime
                  form={form}
                  name="forbiddenRoadTime"
                />
              </Row>
            </div>
          </Form>
        </Spin>
      </Modal>
      <Modal
        title="Xác nhận xóa đường cấm"
        open={isModalOpenDel}
        onOk={() => idRoad && handleDelRoad(idRoad)}
        onCancel={handleCancelDelRoad}
        okText="Tiếp tục"
        cancelText="Quay lại"
      >
        <p>Bạn có chắc chắn xóa đường cấm hiện tại?</p>
      </Modal>
    </>
  )
}
export default ForbiddenRoad

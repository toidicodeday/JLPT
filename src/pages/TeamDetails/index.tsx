import {
  Button,
  Col,
  Input,
  Row,
  Tooltip,
  Typography,
  Select,
  Divider,
  Form,
  Spin,
} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiFillDelete } from 'react-icons/ai'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import { useGetDriverOpsQuery } from '@/services/driverApi'
import {
  useGetOneVehicleQuery,
  useGetVehilcleOpsQuery,
} from '@/services/vehicleApi'
import { formatPhone } from '@/utils/helpers/convert.helper'
import {
  useGetOneVehicleGroupQuery,
  useUpdateVehicleGroupMutation,
} from '@/services/vehicleGroup'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import TableResponsive from '@/components/Table'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const TeamDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()

  const idVehicleGroup = new URLSearchParams(location.search).get('id')

  const [listVehicleSelected, setListVehicleSelected] = useState<any>([])
  const [idVehicleSelect, setIdVehicleSelect] = useState<number>()

  const { data: detailVehicleGroup, isLoading: loadingDetail } =
    useGetOneVehicleGroupQuery({ id: Number(idVehicleGroup) })

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: vehicleById, isFetching: loading } = useGetOneVehicleQuery(
    { id: idVehicleSelect },
    { skip: !idVehicleSelect },
  )

  const [updateVehicleGroup, { isLoading: isUpdating }] =
    useUpdateVehicleGroupMutation()

  useEffect(() => {
    form.setFieldsValue({
      teamName: detailVehicleGroup?.data?.name,
      captainName:
        detailVehicleGroup?.data?.captain &&
        detailVehicleGroup?.data?.captainId,
      area: detailVehicleGroup?.data?.workingAreaId,
    })
    setListVehicleSelected(detailVehicleGroup?.data?.vehicles)
  }, [detailVehicleGroup?.data, form])

  const columnsMoblie = [
    {
      key: 'id',
      render: (_: any, record: any) => {
        return (
          <>
            <div className="flex gap-3 flex-wrap font-bold">
              <p className="text-sm">{record?.driver?.name} </p>
              <p>{formatPhone(record?.driver?.phone)}</p>
            </div>
            <p>
              {record?.licensePlatese} - {record?.vehicleCategory?.name}
            </p>
            <p>
              Chủ sở hữu:{' '}
              {record?.systemVehicleType === 'THANHHUNG'
                ? 'Xe Thành Hưng'
                : 'Đối tác'}
            </p>
          </>
        )
      },
    },
    {
      render: (_: any, record: any) => {
        return (
          <Tooltip title="Xoá khỏi danh sách" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-2xl" />}
              onClick={() => deleteVehicleSelected(record)}
            />
          </Tooltip>
        )
      },
    },
  ]

  const columns = [
    {
      title: 'Loại xe',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => {
        return (
          <Typography className="text-sm">
            {record?.vehicleCategory?.name}
          </Typography>
        )
      },
    },
    {
      title: 'Biển số',
      dataIndex: 'phone',
      key: 'phone',
      render: (_: any, record: any) => {
        return (
          <Typography className="text-sm">{record?.licensePlatese}</Typography>
        )
      },
    },
    {
      title: 'Chủ sở hữu',
      key: 'systemVehicleType',
      render: (_: any, record: any) => {
        return (
          <div className="flex">
            <Typography
              className={`rounded-full text-white py-1 px-2 text-center ${
                record?.systemVehicleType === 'THANHHUNG'
                  ? 'bg-primary'
                  : 'bg-[#fbb02d]'
              }`}
            >
              {record?.systemVehicleType === 'THANHHUNG'
                ? 'Xe Thành Hưng'
                : 'Đối tác'}
            </Typography>
          </div>
        )
      },
    },
    {
      title: 'Tên tài xế',
      key: 'name',
      render: (_: any, record: any) => {
        return (
          <Typography className="text-sm">{record?.driver?.name}</Typography>
        )
      },
    },
    {
      title: 'Liên hệ',
      key: 'phone',
      render: (_: any, record: any) => {
        return (
          <Typography className="text-sm">
            {formatPhone(record?.driver?.phone)}
          </Typography>
        )
      },
    },
    {
      render: (_: any, record: any) => {
        return (
          <Tooltip title="Xoá khỏi danh sách" placement="topRight">
            <Button
              type="text"
              icon={<AiFillDelete className="text-2xl" />}
              onClick={() => deleteVehicleSelected(record)}
            />
          </Tooltip>
        )
      },
    },
  ]

  const getVehicleIds = () => {
    let arr: any[] = []
    listVehicleSelected.filter((item: any) => arr.push(item?.id))
    return arr
  }
  const addVehicleSelected = () => {
    let tmp = listVehicleSelected.filter(
      (item: any) => item.id === idVehicleSelect,
    )
    if (!tmp.length) {
      setListVehicleSelected([...listVehicleSelected, vehicleById?.data])
    }
  }

  const deleteVehicleSelected = (record: any) => {
    setListVehicleSelected([
      ...listVehicleSelected.filter((item: any) => item.id !== record.id),
    ])
  }

  const onFinish = (values: any) => {
    try {
      const body = {
        name: values?.teamName,
        captainId: values?.captainName,
        workingAreaId: values?.area,
        vehicleIds: getVehicleIds(),
      }
      if (
        idVehicleGroup != null &&
        Number.isInteger(parseInt(idVehicleGroup))
      ) {
        updateVehicleGroup({ id: parseInt(idVehicleGroup), body: body }).then(
          response => {
            if ('data' in response) {
              toast.success('Thêm mới đội xe thành công!')
              navigate('/quan-ly-xe/doi-xe')
            } else if ('error' in response) {
              toast.error('Thêm mới đội xe thất bại!')
            }
          },
        )
      }
    } catch (error) {
      toast.error('Thêm mới đội xe thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.driverTeam,
        'edit',
      ),
    }
  }, [adminInfo])

  return (
    <div className="text-sm">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Link to="/quan-ly-xe/doi-xe">
          <div className="flex items-center">
            <MdOutlineArrowBackIosNew className="text-xl text-black" />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT ĐỘI XE
            </Typography>
          </div>
        </Link>
      </div>
      <Spin spinning={loadingDetail}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          disabled={!authorizeStatus.canEdit}
        >
          <Row gutter={12} className="py-4">
            <Col xs={12} sm={6}>
              <p>
                Tên đội xe <span className="text-primary">*</span>
              </p>
            </Col>
            <Col xs={24} sm={18}>
              <Form.Item
                name="teamName"
                rules={[{ required: true, message: 'Hãy nhập tên đội!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <p>Tên đội trưởng </p>
            </Col>
            <Col xs={24} sm={18}>
              <Form.Item name="captainName">
                <DebounceSelect
                  optionQuery={useGetDriverOpsQuery}
                  convertQueryString={searchString =>
                    searchString
                      ? '?search=' +
                        encodeURIComponent(`name:ilike:%${searchString}%`)
                      : ''
                  }
                  initSelected={[
                    {
                      label: detailVehicleGroup?.data?.captain?.name,
                      value: detailVehicleGroup?.data?.captain?.id,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <p>
                Khu vực hoạt động <span className="text-primary">*</span>
              </p>
            </Col>
            <Col xs={24} sm={18}>
              <Form.Item
                name="area"
                rules={[
                  { required: true, message: 'Hãy chọn khu vực hoạt động!' },
                ]}
              >
                <Select allowClear options={vietnamCityOps} />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6} className="pb-4">
              <p>Danh sách xe thuộc đội xe</p>
            </Col>
            <Col xs={19} sm={15} className="pb-4">
              <DebounceSelect
                optionQuery={useGetVehilcleOpsQuery}
                convertQueryString={searchString =>
                  searchString
                    ? '?search=' +
                      encodeURIComponent(
                        `driver.status:=:2;licensePlatese:ilike:%${searchString}%`,
                      )
                    : '?search=driver.status:=:2'
                }
                className="w-full"
                onChange={value => setIdVehicleSelect(value)}
              />
            </Col>
            <Col xs={5} sm={3}>
              <Button
                type="primary"
                className="w-full"
                onClick={() => {
                  addVehicleSelected()
                }}
                disabled={!idVehicleSelect}
              >
                Thêm
              </Button>
            </Col>
            {listVehicleSelected && listVehicleSelected?.length > 0 && (
              <Col span={24}>
                <TableResponsive
                  columns={columns}
                  dataSource={listVehicleSelected}
                  loading={loading || loadingDetail}
                  columnsMobile={columnsMoblie}
                />
              </Col>
            )}
          </Row>
          <Divider />
          <div className="pb-8 flex justify-end gap-x-2">
            <Button
              onClick={() => navigate('/quan-ly-xe/doi-xe')}
              disabled={isUpdating}
            >
              Huỷ
            </Button>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
}

export default TeamDetails

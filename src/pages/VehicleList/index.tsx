/* eslint-disable no-restricted-globals */
import Icon from '@ant-design/icons'
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Spin,
  Tooltip,
  Typography,
} from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { HiTruck } from 'react-icons/hi'
import { FaHandshake } from 'react-icons/fa'
import { useGetAreaOpsQuery } from '@/services/areaApi/area'
import {
  useGetVehicleCategoryListQuery,
  useGetVehicleCategoryOpsQuery,
} from '@/services/vehicleCategoryApi/vehicleCategory'
import {
  STATUS_DRIVER,
  SYSTEM_ROLE_KEY,
  VEHICLE_STATUS_OPS,
} from '@/utils/constant/constant'
import { debounce } from 'lodash'
import { useGetVehicleListQuery } from '@/services/vehicleApi'
import { VehicleType } from '@/services/vehicleApi/type'
import { ColumnsType } from 'antd/lib/table'
import { formatPhone } from '@/utils/helpers/convert.helper'
import DebounceSelect from '@/components/inputs/DebounceSelect'
import TableResponsive from '@/components/Table'
import { querySearch } from '@/utils/helpers/search.helper'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'

const DEBOUNCE_TIME = 500
const initPage = 1
const initPageSize = 10

const filterTabs = [
  {
    value: 'THANHHUNG',
    icon: HiTruck,
    label: 'Xe Liên Minh',
  },
  {
    value: 'PARTNER',
    icon: FaHandshake,
    label: 'Xe đối tác',
  },
]

const VehicleList = () => {
  const location = useLocation()

  const VC_Active = new URLSearchParams(location.search).get('VC_Active')
  const V_Active = new URLSearchParams(location.search).get('V_Active')

  const [activeVehicleCategory, setActiveVehicleCategory] = useState<number>()
  const [activeVehicleType, setActiveVehicleType] = useState('THANHHUNG')
  const [nameCategorySearch, setNameCategorySearch] = useState('')
  const [nameVehicleSearch, setNameVehicleSearch] = useState<string>('')
  const [workingAreaIdSearch, setWorkingAreaIdSearch] = useState<number>()
  const [statusSearch, setStatusSearch] = useState<string>('')
  const [page, setPage] = useState(initPage)
  const [rowsPerPage, setRowsPerPage] = useState(initPageSize)

  const { data: vietnamCityOps } = useGetAreaOpsQuery({
    query: `?search=parentId:=:0`,
  })

  const { data: vehicleCategory, isLoading: loadingVehicleCategory } =
    useGetVehicleCategoryListQuery({
      query: `?page=1&limit=1000&search=${nameCategorySearch}`,
    })

  const detailVCSelected = useMemo(() => {
    return vehicleCategory?.filter(item => item.id === activeVehicleCategory)[0]
  }, [activeVehicleCategory, vehicleCategory])

  useEffect(() => {
    if (vehicleCategory && !VC_Active && !V_Active) {
      setActiveVehicleCategory(vehicleCategory?.[0]?.id)
      window.history.replaceState(
        {},
        '',
        `/quan-ly-xe/danh-sach-xe?VC_Active=${vehicleCategory?.[0]?.id}&V_Active=THANHHUNG`,
      )
    }
    if (VC_Active && V_Active) {
      setActiveVehicleCategory(Number(VC_Active))
      setActiveVehicleType(String(V_Active))
    }
  }, [VC_Active, V_Active, vehicleCategory])

  const searchVehicleQuery = useMemo(() => {
    let query = `?page=${page}&limit=${rowsPerPage}&search=`
    let queryEncode = ''

    if (workingAreaIdSearch)
      queryEncode += `workingAreaId:=:${workingAreaIdSearch};`

    if (statusSearch) queryEncode += `status:=:${statusSearch};`

    if (nameVehicleSearch)
      queryEncode += `${querySearch.textInput(
        ['driver.name', 'driver.phone', 'licensePlatese', 'vehicleCode'],
        nameVehicleSearch,
      )};`

    if (activeVehicleType)
      queryEncode += `systemVehicleType:=:${activeVehicleType};`

    if (activeVehicleType === 'PARTNER')
      queryEncode += `driver.status:=:${STATUS_DRIVER?.ACTIVE};`

    if (activeVehicleCategory)
      queryEncode += `categoryId:=:${activeVehicleCategory};`

    return (
      query +
      encodeURIComponent(queryEncode.substring(0, queryEncode.length - 1))
    )
  }, [
    activeVehicleCategory,
    activeVehicleType,
    nameVehicleSearch,
    page,
    rowsPerPage,
    statusSearch,
    workingAreaIdSearch,
  ])

  const { data: vehicleData, isLoading: loadingVehicle } =
    useGetVehicleListQuery({
      query: searchVehicleQuery,
    })

  const statusVehicle = (status: string) => {
    let className = 'text-[#116476]'
    let text = 'Đang bảo dưỡng'
    if (status === 'PUBLISH') {
      className = 'text-[#35703B]'
      text = 'Đang hoạt động'
    }
    if (status === 'UNPUBLISH') {
      className = 'text-orangeButton'
      text = 'Dừng hoạt động'
    }
    return <Typography className={className}>{text}</Typography>
  }

  const columnsMobile: ColumnsType<VehicleType> = [
    {
      key: 'name',
      render: record => (
        <Link to={`/quan-ly-xe/danh-sach-xe/chi-tiet?id=${record?.id}`}>
          <div className="flex justify-between">
            <Typography className="font-bold">
              {record?.vehicleCode && `Mã ${record?.vehicleCode} | `} Biển số:{' '}
              {record?.licensePlatese}
            </Typography>
            <div>{statusVehicle(record?.status)}</div>
          </div>
          {record?.driverId && (
            <Typography>
              Tài xế: {record?.driver?.name},{' '}
              {formatPhone(record?.driver?.phone)}
            </Typography>
          )}
          {!record?.driverId && <Typography>Chưa có tài xế</Typography>}
        </Link>
      ),
    },
  ]

  const columns: ColumnsType<VehicleType> = [
    {
      key: 'name',
      render: record => (
        <Link to={`/quan-ly-xe/danh-sach-xe/chi-tiet?id=${record?.id}`}>
          <Typography className="font-bold">
            {record?.vehicleCode && `Mã ${record?.vehicleCode} | `} Biển số:{' '}
            {record?.licensePlatese}
          </Typography>
          {record?.driverId && (
            <Typography>
              Tài xế: {record?.driver?.name},{' '}
              {formatPhone(record?.driver?.phone)}
            </Typography>
          )}
          {!record?.driverId && <Typography>Chưa có tài xế</Typography>}
        </Link>
      ),
    },
    {
      key: 'status',
      align: 'right',
      render: record => statusVehicle(record?.status),
    },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchVehicleCategory = useCallback(
    debounce(
      value =>
        setNameCategorySearch(encodeURIComponent(`name:ilike:%${value}%`)),
      DEBOUNCE_TIME,
    ),
    [],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncSearchVehicleString = useCallback(
    debounce(value => setNameVehicleSearch(value), DEBOUNCE_TIME),
    [],
  )

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page)
    setRowsPerPage(pageSize)
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicle,
        'create',
      ),
    }
  }, [adminInfo])

  return (
    <div className="font-sans">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ XE</Typography>
        {authorizeStatus.canCreate && (
          <div className="flex items-center">
            <Tooltip title="Thêm mới xe" placement="topRight">
              <Link to="/quan-ly-xe/danh-sach-xe/them-moi">
                <Button
                  type="text"
                  icon={<MdAddCircle className="text-2xl text-primary" />}
                />
              </Link>
            </Tooltip>
          </div>
        )}
      </div>
      <Row gutter={16}>
        <Col
          span={6}
          className="my-4 border border-solid border-grayBorder py-4 px-2 hidden md:block"
        >
          <div>
            <Input
              allowClear
              placeholder="Tìm kiếm"
              onChange={(values: any) =>
                debounceSearchVehicleCategory(values?.target?.value)
              }
            />
          </div>
          <Spin spinning={loadingVehicleCategory}>
            <div className="mt-7 h-[calc(100vh-200px)] overflow-auto">
              {vehicleCategory?.map((item: any, index: any) => (
                <Button
                  key={index}
                  className={`${
                    item?.id === activeVehicleCategory
                      ? 'bg-[#80B2CE]'
                      : 'bg-white'
                  } rounded-none h-fit text-left text-black  border-b border-t-0 border-x-0 border-solid border-grayDivider`}
                  type="default"
                  block
                  onClick={() => {
                    setPage(initPage)
                    setActiveVehicleCategory(item?.id)
                    window.history.replaceState(
                      {},
                      '',
                      `/quan-ly-xe/danh-sach-xe?VC_Active=${item?.id}&V_Active=${activeVehicleType}`,
                    )
                  }}
                >
                  <p className="font-bold text-base">{item?.name}</p>
                  <p className="whitespace-pre-wrap">
                    Dài {item.length}, Rộng {item.width}, Cao {item.height}, Thể
                    tích {item.capacity} (m3)
                  </p>
                </Button>
              ))}
            </div>
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Row
            gutter={16}
            className="my-4 border border-solid border-grayBorder py-4 px-2"
          >
            <Col className="rounded" xs={12} sm={12} md={6}>
              <Input
                allowClear
                placeholder="Tìm kiếm xe, tài xế"
                onChange={event => {
                  setPage(initPage)
                  debouncSearchVehicleString(event.target.value)
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={0}>
              <DebounceSelect
                optionQuery={useGetVehicleCategoryOpsQuery}
                convertQueryString={searchString =>
                  searchString
                    ? '?search=' +
                      encodeURIComponent(`name:ilike:%${searchString}%`)
                    : ''
                }
                initSelected={[
                  {
                    label: detailVCSelected ? detailVCSelected?.name : '',
                    value: detailVCSelected ? detailVCSelected?.id : '',
                  },
                ]}
                value={detailVCSelected?.id}
                className="w-full mb-2"
                placeholder="Tìm kiếm loại xe"
                onChange={item => setActiveVehicleCategory(item)}
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Select
                options={vietnamCityOps}
                className="w-full"
                placeholder="Tất cả khu vực"
                allowClear
                onChange={(value: any) => {
                  setPage(initPage)
                  setWorkingAreaIdSearch(value)
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Select
                options={VEHICLE_STATUS_OPS}
                className="w-full"
                placeholder="Tất cả trạng thái"
                allowClear
                onChange={(value: any) => {
                  setPage(initPage)
                  setStatusSearch(value)
                }}
              />
            </Col>
          </Row>
          <div>
            {filterTabs?.map((item: any, index: number) => {
              return (
                <Button
                  key={index}
                  className={`${
                    item?.value === activeVehicleType
                      ? 'bg-primary text-white'
                      : 'bg-grayButton text-black'
                  } rounded-none border-none `}
                  type="primary"
                  onClick={() => {
                    setPage(initPage)
                    setActiveVehicleType(item.value)
                    window.history.replaceState(
                      {},
                      '',
                      '/quan-ly-xe/danh-sach-xe' +
                        `?VC_Active=${activeVehicleCategory}&V_Active=${item?.value}`,
                    )
                  }}
                >
                  <Icon component={item?.icon} />
                  {item?.label}
                </Button>
              )
            })}
          </div>

          <TableResponsive
            columns={columns}
            dataSource={vehicleData?.data}
            loading={loadingVehicle}
            totalData={vehicleData?.total}
            handleChangePage={handleChangePage}
            columnsMobile={columnsMobile}
            currentPage={page}
            showHeader={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default VehicleList

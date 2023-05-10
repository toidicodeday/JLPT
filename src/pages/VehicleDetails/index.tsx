import ConfirmModal from '@/components/modals/ConfirmModal'
import { AdminMeType } from '@/services/accountApi/types'
import {
  useGetOneVehicleQuery,
  useDeleteVehicleByIdMutation,
} from '@/services/vehicleApi'
import { selectUserMe } from '@/store/authSlice/selector'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import Icon from '@ant-design/icons'
import { Button, Tabs, Tooltip, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import VehicleActivityLogs from './components/VehicleActivityLogs'
import VehicleInfo from './components/VehicleInfo'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

const VehicleDetails = () => {
  const location = useLocation()
  const [isOpenConfirmModel, setIsOpenConfirmModel] = useState<boolean>(false)
  const idVehicle = new URLSearchParams(location.search).get('id')

  const { data: detailVehicle, isLoading: loading } = useGetOneVehicleQuery({
    id: Number(idVehicle),
  })

  const [deleteVehicle] = useDeleteVehicleByIdMutation()

  const handleDeleteVehicle = async (id: number) => {
    try {
      const deleteResponse = await deleteVehicle({ id: id })
      if ('data' in deleteResponse) toast.success('Xóa xe thành công!')
      if ('error' in deleteResponse) toast.error('Xóa xe thất bại!')
      setIsOpenConfirmModel(false)
      window.history.back()
      // navigate('/quan-ly-xe/danh-sach-xe')
    } catch (error) {
      toast.error('Xóa loại xe thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicle,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.vehicle,
        'delete',
      ),
    }
  }, [adminInfo])

  return (
    <div className="p-3">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        {/* <Link to="/quan-ly-xe/danh-sach-xe"> */}
        <Button onClick={() => window.history.back()} className="border-0">
          <div className="flex items-center">
            <Icon
              component={MdOutlineArrowBackIosNew}
              style={{ fontSize: '18px', color: '#000' }}
            />
            <Typography className="text-lg font-bold ml-2">
              CHI TIẾT THÔNG TIN XE {detailVehicle?.data?.licensePlatese}
            </Typography>
          </div>
        </Button>
        {/* </Link> */}
        {authorizeStatus.canDelete &&
          detailVehicle?.data?.systemVehicleType === 'THANHHUNG' && (
            <div className="flex items-center">
              <Tooltip title="Xóa xe" placement="topRight">
                <Button
                  type="text"
                  icon={<AiFillDelete className="text-2xl text-grayColor" />}
                  onClick={() => setIsOpenConfirmModel(true)}
                />
              </Tooltip>
            </div>
          )}
      </div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Thông tin xe" key="1">
          <VehicleInfo
            detailVehicle={detailVehicle}
            idVehicle={idVehicle}
            loading={loading}
            authorizeStatus={authorizeStatus}
          />
        </TabPane>
        <TabPane tab="Lịch sử hoạt động" key="2">
          <VehicleActivityLogs
            idVehicle={idVehicle}
            detailVehicle={detailVehicle}
          />
        </TabPane>
      </Tabs>
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) => setIsOpenConfirmModel(isOpen)}
        isModalOpen={isOpenConfirmModel}
        onSubmit={() => {
          if (idVehicle != null) handleDeleteVehicle(parseInt(idVehicle))
        }}
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá xe"
        message="Bạn có chắc chắn muốn xoá xe hiện tại?"
      />
    </div>
  )
}

export default VehicleDetails

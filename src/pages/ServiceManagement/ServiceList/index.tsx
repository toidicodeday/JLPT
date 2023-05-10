import {
  useCreateProductAdminMutation,
  useGetProductAdminQuery,
} from '@/services/serviceApi/service'
import { Button, Spin, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddNewService from './components/AddNewService'
import ServiceCard from './components/ServiceCard'

const ServiceList = () => {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const { data: listProduct, isLoading } = useGetProductAdminQuery({
    query: '?search=parentId:=:0;type:=:tx',
  })
  const [createProduct] = useCreateProductAdminMutation()

  const handleCreateNewService = (values: any) => {
    try {
      const body = {
        icon: values?.avatar[0]?.response?.url,
        name: values?.name,
      }
      createProduct(body).then(response => {
        if ('data' in response) {
          toast.success('Thêm mới dịch vụ thành công!')
          navigate('/quan-ly-dich-vu/dich-vu/')
        } else if ('error' in response) {
          toast.error('Thêm mới dịch vụ thất bại')
        }
      })
    } catch (error) {
      toast.error('Thêm mới dịch vụ thất bại')
    }
  }
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">QUẢN LÝ DỊCH VỤ</Typography>
        <div>
          <Tooltip title="Thêm mới dịch vụ" placement="topRight">
            <Button
              type="text"
              icon={<MdAddCircle className="text-2xl text-primary" />}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      </div>
      <div className="pb-6">
        <Spin spinning={isLoading}>
          {listProduct?.data &&
            listProduct?.data.map((item: any, index: number) => (
              <ServiceCard data={item} />
            ))}
        </Spin>
      </div>
      <AddNewService
        isModalOpen={isModalOpen}
        setIsModalOpen={(type: boolean) => setIsModalOpen(type)}
        onCreate={handleCreateNewService}
      />
    </>
  )
}

export default ServiceList

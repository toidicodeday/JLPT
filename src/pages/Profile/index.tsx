import { Avatar, Typography, Tabs, Spin, message } from 'antd'
import React from 'react'
import BasicInfo from './components/BasicInfo'
import ChangeProfilePass from './components/ChangePassword'
import { useGetMeQuery } from '@/services/accountApi/account'
import {
  useCreateDocumentMutation,
  useGetDocumentQuery,
  useUploadDocumentMutation,
} from '@/services/documentApi'
import { CameraOutlined, UserOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import { DOCUMENT_TYPE } from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'

const Profile = () => {
  const { data: adminInfo, isLoading } = useGetMeQuery()
  const {
    data: documents,
    refetch: reGetAvatar,
    isLoading: isLoadingAvatar,
  } = useGetDocumentQuery(
    {
      ref: 'admin',
      refId: Number(adminInfo?.data.id),
      query: 'limit=1&order=id:desc&search=type:=:0',
    },
    { skip: !adminInfo?.data.id },
  )

  const [updateUserAvatar, { isLoading: isCreateDoc }] =
    useCreateDocumentMutation()
  const [uploadAvatar, { isLoading: isUpdatingAvatar }] =
    useUploadDocumentMutation()

  const handleChangeAvatar = (e: any) => {
    const file = get(e.target, 'files.[0]')
    uploadAvatar(file).then(uploadRes => {
      if ('data' in uploadRes) {
        updateUserAvatar({
          userId: Number(adminInfo?.data.id),
          ref: 'admin',
          type: [DOCUMENT_TYPE.AVATAR],
          docs: [uploadRes?.data.createdDocs?.[0]?.id],
        }).then(docRes => {
          if ('data' in docRes) {
            message.success('Cập nhật thành công')
            reGetAvatar()
          }
          if ('error' in docRes) {
            message.error(
              get(docRes.error, 'data.error.message') ||
                MESSAGES.CALL_API_ERROR,
            )
          }
        })
      }
      if ('error' in uploadRes) {
        message.error(
          get(uploadRes.error, 'data.error.message') || MESSAGES.CALL_API_ERROR,
        )
      }
    })
  }

  return (
    <div className="font-sans">
      <Typography className="text-lg font-bold  py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        THÔNG TIN CÁ NHÂN
      </Typography>
      <div className="flex flex-col items-center justify-center py-6 ">
        <label className="relative cursor-pointer rounded-full">
          <Spin spinning={isLoadingAvatar || isCreateDoc || isUpdatingAvatar}>
            <Avatar src={documents?.data?.[0]?.document.url} size={144}>
              <UserOutlined />
            </Avatar>
            <div className="absolute top-0 left-0 w-36 h-36 rounded-full transition-all delay-100 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center">
              <CameraOutlined className="text-white text-3xl mt-3" />
            </div>
            <input
              accept="image/*"
              type="file"
              value=""
              onChange={handleChangeAvatar}
              className="hidden"
            />
          </Spin>
        </label>

        <Typography className="text-lg font-bold uppercase mt-3">
          {adminInfo?.data?.name}
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="w-[42rem]">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Thông tin cá nhân" key="1">
              {isLoading && <Spin />}
              {!isLoading && <BasicInfo dataSource={adminInfo?.data} />}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đổi mật khẩu" key="2">
              <ChangeProfilePass />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile

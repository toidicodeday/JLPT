import {
  useCreateDocumentMutation,
  useGetDocumentQuery,
  useUploadDocumentMutation,
} from '@/services/documentApi'
import { DOCUMENT_TYPE } from '@/utils/constant/constant'
import { MESSAGES } from '@/utils/constant/messages.constant'
import { message } from 'antd'
import { debounce, get } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

const useAvatarUpdator = (userId: string | number) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    data: documents,
    refetch: reGetAvatar,
    isLoading: isLoadingAvatar,
  } = useGetDocumentQuery(
    {
      ref: 'admin',
      refId: Number(userId),
      query: 'limit=1&order=id:desc&search=type:=:0',
    },
    { skip: !userId },
  )
  const [updateUserAvatar, { isLoading: isCreateDoc }] =
    useCreateDocumentMutation()
  const [uploadAvatar, { isLoading: isUpdatingAvatar }] =
    useUploadDocumentMutation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateLoading = useCallback(
    debounce(() => {
      setIsLoading(isLoadingAvatar || isCreateDoc || isUpdatingAvatar)
    }, 200),
    [isLoadingAvatar, isCreateDoc, isUpdatingAvatar],
  )
  useEffect(() => {
    updateLoading()
  }, [updateLoading])

  const handleChangeAvatar = (file?: File) => {
    if (!file) return
    uploadAvatar(file).then(uploadRes => {
      if ('data' in uploadRes) {
        updateUserAvatar({
          userId: Number(userId),
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

  return {
    avatarUrl: documents?.data?.[0]?.document?.url,
    handleChangeAvatar,
    loading: isLoading,
  }
}

export default useAvatarUpdator

import { useEffect } from 'react'
import { useGetMeQuery } from '@/services/accountApi/account'
import { useGetDocumentQuery } from '@/services/documentApi'
import { UserUpdateParams } from '@sendbird/chat'
import { get } from 'lodash'
import {
  ACCOUNT_META,
  ACCOUNT_METADATA_KEY,
} from '../../constant/sendbird.constant'
import { useSendbirdContext } from '../../Provider'

const useSbUserInit = () => {
  const { data: adminInfo } = useGetMeQuery()
  const { data: documents } = useGetDocumentQuery(
    {
      ref: 'admin',
      refId: Number(adminInfo?.data.id),
      query: 'limit=1&order=id:desc&search=type:=:0',
    },
    { skip: !adminInfo?.data.id },
  )

  const ctx = useSendbirdContext()

  useEffect(() => {
    const updateInitUserSendbirdInfo = () => {
      const avatar = documents?.data?.[0]?.document?.url
      if (
        !get(ctx?.sendbird?.currentUser?.metaData, ACCOUNT_METADATA_KEY.ROLES)
      ) {
        ctx?.sendbird?.currentUser?.createMetaData({
          [ACCOUNT_METADATA_KEY.ROLES]: ACCOUNT_META.ADMIN,
        })
      } else {
        ctx?.sendbird?.currentUser?.updateMetaData({
          [ACCOUNT_METADATA_KEY.ROLES]: ACCOUNT_META.ADMIN,
        })
      }

      if (avatar && ctx?.connectionState === 'OPEN') {
        const params: UserUpdateParams = {
          profileUrl: avatar,
          nickname: adminInfo?.data?.name,
        }
        ctx?.sendbird.updateCurrentUserInfo(params)
      }
    }
    updateInitUserSendbirdInfo()
  }, [
    adminInfo?.data?.name,
    ctx?.connectionState,
    ctx?.sendbird,
    documents?.data,
  ])
}

export default useSbUserInit

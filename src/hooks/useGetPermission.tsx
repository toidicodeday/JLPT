import { AdminMeType } from '@/services/accountApi/types'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { useSelector } from 'react-redux'

const useGetPermission = (key: string) => {
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const adminSystemFuncs = getAdminSystemFunction(adminInfo)
  const readPermission = checkAuthorize(adminSystemFuncs, key, 'read')
  const editPermission = checkAuthorize(adminSystemFuncs, key, 'edit')
  const deletePermission = checkAuthorize(adminSystemFuncs, key, 'delete')
  const createPermission = checkAuthorize(adminSystemFuncs, key, 'create')
  return { readPermission, editPermission, deletePermission, createPermission }
}

export default useGetPermission

import IRoute from '@/core/objects/IRoute'
import { AdminMeType, MeSystemFuncType } from '@/services/accountApi/types'
import { AuthorizeMeType } from '@/store/authSlice/types'

export const checkAuthorize = (
  systemRole: { systemFunctions: MeSystemFuncType[] | undefined }[] | undefined,
  menuKey: string,
  checkedFunc: string,
) => {
  if (systemRole && systemRole?.length > 0) {
    const currSystemFunc = systemRole?.map(item => ({
      canExecute: item.systemFunctions
        ?.filter(func => func.key === menuKey)[0]
        ?.systemActions.filter(action => action.actionKey === checkedFunc)[0]
        ?.canExecute,
    }))
    if (
      currSystemFunc?.filter(item => item.canExecute) &&
      currSystemFunc?.filter(item => item.canExecute)?.length > 0
    )
      return true
    else return false
  } else return false
}

export const shortenRoutes = (
  routes: IRoute[],
  accessStatus: AuthorizeMeType | null,
) => {
  return accessStatus
    ? (routes
        .filter(item => {
          return !item.accessKey || accessStatus[item.accessKey]
        })
        .map(item => ({
          ...item,
          children: item.children
            ? item.children
                .filter(
                  child => !child.accessKey || accessStatus[child.accessKey],
                )
                .map(child => ({
                  ...child,
                  children: child.children
                    ? child.children.filter(
                        child2 =>
                          !child2.accessKey || accessStatus[child2.accessKey],
                      )
                    : [],
                }))
            : [],
        })) as IRoute[])
    : []
}

export const getAdminSystemFunction = (adminInfo: AdminMeType) => {
  return adminInfo?.isAdmin
    ? [
        {
          systemFunctions: adminInfo?.superAdminFunctionAction,
        },
      ]
    : adminInfo?.systemRoles?.map((item: any) => ({
        systemFunctions: item?.systemFunctions,
      }))
}

import { AdminMeType } from '@/services/accountApi/types'
import { useGetRolesQuery, useUpdateRoleMutation } from '@/services/roleApi'
import {
  useGetPermissionByRoleQuery,
  useGetSystemFunctionQuery,
} from '@/services/systemApi/system'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  PERMISSION_ACTION_KEY,
  ROLE_PERMISSION_STATUS,
  SYSTEM_ROLE_KEY,
} from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { Button, Col, Menu, message, Row, Typography } from 'antd'
import { isUndefined } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import AuthorizeTable from './components/AuthorizeTable'

type ColTitleType = { title: string; key: PERMISSION_ACTION_KEY }
type RoleTitleType = { title: string; key: string; id: number }

const Authorization = () => {
  const [roleIdSelected, setRoleIdSelected] = useState<string>()
  const [permission, setPermission] = useState<any>({})
  const [colTitle, setColTitle] = useState<ColTitleType[]>([])

  const [updatePermission, { isLoading: isUpdating }] = useUpdateRoleMutation()
  const { data: functionList } = useGetSystemFunctionQuery()
  const { data: roleListApi } = useGetRolesQuery()
  const { data: permissionByRole, refetch: refreshPermission } =
    useGetPermissionByRoleQuery(
      { roleId: Number(roleIdSelected) },
      { skip: isUndefined(roleIdSelected) },
    )
  const rowTitle: RoleTitleType[] = useMemo(() => {
    if (functionList?.data) {
      return functionList?.data.map(item => ({
        title: item.name,
        key: item.key,
        id: item.id,
      }))
    }
    return []
  }, [functionList?.data])
  const roleListMenus = useMemo(() => {
    return roleListApi?.data?.map(item => ({
      label: item.name,
      key: item.id?.toString(),
    }))
  }, [roleListApi?.data])
  const initPermissionPage = useCallback(() => {
    const initRowRecord = rowTitle.reduce((prev, nextItem) => {
      prev[nextItem.key] = {}
      return prev
    }, {} as Record<string, any>)
    const cols: any[] = []
    const permissionConvert = permissionByRole?.data?.reduce(
      (prev, nextItem) => {
        const rowKey = nextItem.key
        prev[rowKey] = {}

        nextItem.systemActions.forEach((action: any) => {
          const colKey = action.actionKey
          prev[rowKey][colKey] = {
            isChecked: action.canExecute,
            id: action.id,
            systemFunctionId: action.systemFunctionId,
          }
          if (cols.findIndex(col => col.key === colKey) < 0) {
            cols.push({
              title: action.name,
              key: colKey as PERMISSION_ACTION_KEY,
            })
          }
        })
        return prev
      },
      initRowRecord,
    )

    setColTitle(cols)
    setPermission(permissionConvert)
  }, [permissionByRole?.data, rowTitle])
  const isAdminRoleSelected = useMemo(() => {
    return roleListApi &&
      roleListApi.data?.filter(i => i.id === Number(roleIdSelected)) &&
      roleListApi.data?.filter(i => i.id === Number(roleIdSelected))?.length >
        0 &&
      roleListApi.data?.filter(i => i.id === Number(roleIdSelected))[0].name ===
        'Admin'
      ? true
      : false
  }, [roleIdSelected, roleListApi])

  useEffect(() => {
    initPermissionPage()
  }, [initPermissionPage])

  useEffect(() => {
    if (roleListApi?.data) {
      setRoleIdSelected(roleListApi?.data?.[0]?.id?.toString())
    }
  }, [roleListApi?.data])

  const handleCancel = () => {
    initPermissionPage()
  }
  const handleSubmit = () => {
    if (!permission) return
    const bodyRequest: { id: number; status: string }[] = Object.values(
      permission,
    ).reduce((prev: { id: number; status: string }[], row: any) => {
      Object.values(row).forEach((value: any) => {
        if (value?.id) {
          prev.push({
            id: value?.id,
            status: value?.isChecked
              ? ROLE_PERMISSION_STATUS.PUBLISH
              : ROLE_PERMISSION_STATUS.UNPUBLISH,
          })
        }
      })
      return prev
    }, [])

    updatePermission({
      id: Number(roleIdSelected),
      body: { data: bodyRequest },
    }).then(response => {
      if ('data' in response) {
        message.success('Cập nhật thành công')
        refreshPermission()
      } else if ('error' in response) {
        message.error('Cập nhật thất bại')
      }
    })
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.authorize,
        'edit',
      ),
    }
  }, [adminInfo])

  return (
    <>
      <div className="py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">PHÂN QUYỀN</Typography>
      </div>
      <div className="py-8">
        <Row gutter={16}>
          <Col span={24} md={{ span: 4 }}>
            <Typography>DANH SÁCH QUYỀN</Typography>
            <Menu
              selectedKeys={roleIdSelected ? [roleIdSelected] : []}
              onClick={item => setRoleIdSelected(item.key)}
              items={roleListMenus}
            />
          </Col>
          <Col span={24} md={{ span: 20 }}>
            <AuthorizeTable
              rowTitle={rowTitle}
              data={permission}
              colTitle={colTitle}
              setData={setPermission}
              authorizeStatus={authorizeStatus}
            />
          </Col>
        </Row>
        <div
          className={`flex justify-end mt-4 ${
            isAdminRoleSelected ? 'hidden' : ''
          }`}
        >
          <Button onClick={handleCancel}>Huỷ</Button>
          <Button
            className="ml-2"
            type="primary"
            onClick={handleSubmit}
            disabled={!authorizeStatus.canEdit || isAdminRoleSelected}
            loading={isUpdating}
          >
            Lưu
          </Button>
        </div>
      </div>
    </>
  )
}

export default Authorization

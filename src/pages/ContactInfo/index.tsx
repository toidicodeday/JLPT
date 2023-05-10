import { AdminMeType } from '@/services/accountApi/types'
import {
  useCreateContactMutation,
  useDeleteContactMutation,
  useLazyGetContactQuery,
  useUpdateContactMutation,
} from '@/services/contactApi'
import { selectUserMe } from '@/store/authSlice/selector'
import { HOT_LINE_AREA, SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { Typography, Form, Button } from 'antd'
import { every, orderBy } from 'lodash'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import DragListPhone from './components/DragListPhone'

const ContactInfo = () => {
  const [form] = Form.useForm()
  const [getContacts, { data: hotLineData }] = useLazyGetContactQuery()
  const [creatHotLine, { isLoading: isCreating }] = useCreateContactMutation()
  const [updateHotLine, { isLoading: isUpdating }] = useUpdateContactMutation()
  const [deleteHotLine, { isLoading: isDeleting }] = useDeleteContactMutation()

  const getContactsInfo = useCallback(() => {
    getContacts({ query: '' }).then(({ data }) => {
      if (data?.data) {
        const phoneHN: { id?: number; phone: string }[] = []
        const phoneHCM: { id?: number; phone: string }[] = []
        const phoneFREE: { id?: number; phone: string }[] = []
        orderBy(data.data, 'sort', 'asc').forEach(item => {
          const data = {
            id: item.id,
            phone: item.telephone,
            sort: item.sort,
          }
          if (item.area === HOT_LINE_AREA.HANOI) phoneHN.push(data)
          if (item.area === HOT_LINE_AREA.HCM) phoneHCM.push(data)
          if (item.area === HOT_LINE_AREA.FREE) phoneFREE.push(data)
        })
        form.setFieldsValue({
          phoneHN,
          phoneHCM,
          phoneFREE,
        })
      }
    })
  }, [form, getContacts])

  useEffect(() => {
    getContactsInfo()
  }, [getContactsInfo])

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  const handleOnDragEnd = (result: any, name: string) => {
    if (!result.destination) {
      return
    }
    const rawValues = form.getFieldValue(name)
    const items = reorder(
      rawValues,
      result.source.index,
      result.destination.index,
    )
    form.setFieldValue(name, items)
  }

  const onFinish = async (values: any) => {
    const convertListReq = (list: any[], area: HOT_LINE_AREA) => {
      return list?.map((i: any, index: number) => ({
        id: i?.id || null,
        telephone: i.phone,
        area,
        sort: index + 1,
      }))
    }
    const listPhoneHN = convertListReq(values.phoneHN, HOT_LINE_AREA.HANOI)
    const listPhoneHCM = convertListReq(values.phoneHCM, HOT_LINE_AREA.HCM)
    const listPhoneFREE = convertListReq(values.phoneFREE, HOT_LINE_AREA.FREE)
    const listPhone = listPhoneHN.concat(listPhoneHCM).concat(listPhoneFREE)

    const listDelete: number[] = []
    hotLineData?.data.forEach(item => {
      const index = listPhone.findIndex(newItem => newItem.id === item.id)
      if (index < 0) listDelete.push(item.id)
    })

    const response = await Promise.all([
      ...listPhone.map(phoneItem => {
        if (phoneItem.id)
          return updateHotLine({ id: phoneItem.id, data: phoneItem })
        return creatHotLine(phoneItem)
      }),
      ...listDelete.map(id => deleteHotLine({ id })),
    ])

    if (every(response, item => 'data' in item && item.data.status === 200)) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error('Cập nhật không thành công')
    }
    getContactsInfo()
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.contact,
        'edit',
      ),
    }
  }, [adminInfo])

  return (
    <>
      <div className="flex justify-between items-center mb-8 py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold ml-2">
          THÔNG TIN LIÊN HỆ
        </Typography>
      </div>
      <Form
        name="form-info"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        disabled={!authorizeStatus.canEdit}
      >
        <DragListPhone
          handleOnDragEnd={handleOnDragEnd}
          title="Số hotline khu vực Hà Nội"
          name="phoneHN"
        />
        <DragListPhone
          handleOnDragEnd={handleOnDragEnd}
          title="Số hotline khu vực Hồ Chí Minh"
          name="phoneHCM"
        />
        <DragListPhone
          handleOnDragEnd={handleOnDragEnd}
          title="Tổng đài chăm sóc miễn phí"
          name="phoneFREE"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="mb-4"
          loading={isCreating || isUpdating || isDeleting}
        >
          Cập nhật
        </Button>
      </Form>
    </>
  )
}
export default ContactInfo

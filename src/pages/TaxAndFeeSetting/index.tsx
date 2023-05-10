import { AdminMeType } from '@/services/accountApi/types'
import {
  useGetTaxAndFeeSettingQuery,
  useUpdateTaxAndFeeMutation,
} from '@/services/feeApi/fee'
import { selectUserMe } from '@/store/authSlice/selector'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { formatDate } from '@/utils/helpers/convert.helper'
import { Button, Form, InputNumber, Spin, Typography } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const TaxAndFeeSetting = () => {
  const [form] = Form.useForm()
  const { data: feeDetails, isLoading } = useGetTaxAndFeeSettingQuery({})
  const [updateFee, { isLoading: isUpdating }] = useUpdateTaxAndFeeMutation()

  useEffect(() => {
    form.setFieldsValue({
      VAT: feeDetails?.settings?.VAT,
      WAY_BACK_FEES: feeDetails?.settings?.WAY_BACK_FEES,
      HARD_ROAD_FEES: feeDetails?.settings?.HARD_ROAD_FEES,
    })
  }, [feeDetails, form])
  const onFinish = (values: any) => {
    try {
      const body = {
        VAT: Number(values?.VAT),
        WAY_BACK_FEES: Number(values?.WAY_BACK_FEES),
        HARD_ROAD_FEES: Number(values?.HARD_ROAD_FEES),
      }
      updateFee(body).then(response => {
        if ('data' in response) {
          toast.success('Chỉnh sửa cài đặt Thuế Phí thành công!')
        } else if ('error' in response) {
          toast.error('Chỉnh sửa cài đặt Thuế Phí thất bại!')
        }
      })
    } catch (error) {
      toast.error('Chỉnh sửa cài đặt Thuế Phí thất bại!')
    }
  }

  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.taxSettings,
        'edit',
      ),
    }
  }, [adminInfo])
  return (
    <div>
      <div className="flex justify-between items-center py-2 mb-5 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">CÀI ĐẶT THUẾ, PHÍ</Typography>
      </div>
      <Spin spinning={isLoading}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="md:w-1/2 lg:w-1/3"
          disabled={!authorizeStatus.canEdit}
        >
          <Form.Item label="Thuế giá trị gia tăng (VAT)" name="VAT">
            <InputNumber
              addonAfter="%"
              min={0}
              className="w-full"
              precision={2}
            />
          </Form.Item>
          <Form.Item label="Phí chiều về" name="WAY_BACK_FEES">
            <InputNumber
              addonAfter="%"
              min={0}
              className="w-full"
              precision={2}
            />
          </Form.Item>
          <label htmlFor="HARD_ROAD_FEES">
            <p>Phí xe chạy ở các tỉnh miền núi</p>
            <p>
              Các tỉnh miền núi: Cao Bằng, Điện Biên, Hà Giang, Lai Châu, Sơn
              La, Lào Cai
            </p>
          </label>
          <Form.Item name="HARD_ROAD_FEES">
            <InputNumber
              addonAfter="%"
              min={0}
              className="w-full"
              precision={2}
            />
          </Form.Item>

          <Button
            type="primary"
            className="mb-2"
            htmlType="submit"
            loading={isUpdating}
          >
            Lưu
          </Button>
          <p>
            Cập nhật lần cuối bởi {feeDetails?.updatedAccount?.name} lúc{' '}
            {feeDetails?.updatedAt &&
              formatDate(feeDetails?.updatedAt, 'hh:mm dd/MM/yyyy')}
          </p>
        </Form>
      </Spin>
    </div>
  )
}

export default TaxAndFeeSetting

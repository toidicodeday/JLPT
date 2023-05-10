import { useGetOrderDetailsQuery } from '@/services/orderApi/order'
import { TYPE_SERVICE_ORDER } from '@/utils/constant/constant'
import { isJsonString } from '@/utils/helpers/convert.helper'
import { Modal, notification, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OneSignal from 'react-onesignal'
import React from 'react'
import {
  useGetCountAccountNotifyNotSeenQuery,
  useUpdatePlayerIdMutation,
  useUpdateStatusSeenNotifyMutation,
} from '@/services/notificationApi'
import { ContentNotiType } from '@/services/notificationApi/types'
import runOneSignal from './runOneSignal'

const useOnesignal = () => {
  const navigate = useNavigate()
  const [orderCode, setOrderCode] = useState()
  const [updatePlayerIdMutation] = useUpdatePlayerIdMutation()
  const [updateStatusSeenNotify] = useUpdateStatusSeenNotifyMutation()

  const { data: countMessageNotSeen, refetch: refetchCountMessageNotSeen } =
    useGetCountAccountNotifyNotSeenQuery({
      query: '',
    })

  const { data: orderDetails } = useGetOrderDetailsQuery(
    {
      code: orderCode,
    },
    { skip: !orderCode },
  )
  // run onesignal
  useEffect(() => {
    runOneSignal()
  }, [])

  useEffect(() => {
    OneSignal.on('subscriptionChange', function (isSubscribed) {
      if (isSubscribed) {
        OneSignal.isPushNotificationsEnabled(isEnabled => {
          if (isEnabled) {
            OneSignal.getUserId(async userId => {
              console.log('userId', userId)
              localStorage.setItem('player_id', userId || '')
              await updatePlayerIdMutation({
                player_id: `${userId}`,
              })
            })
          }
        })
      }
    })
  }, [updatePlayerIdMutation])

  useEffect(() => {
    OneSignal.isPushNotificationsEnabled(isEnabled => {
      if (isEnabled) {
        OneSignal.getUserId(async userId => {
          console.log('userId', userId)
          localStorage.setItem('player_id', userId || '')
          await updatePlayerIdMutation({
            player_id: `${userId}`,
          })
        })
      }
    })
  }, [updatePlayerIdMutation])

  const infoNoti = (content: ContentNotiType, title: string) => {
    Modal.info({
      title: title,
      content: (
        <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
      ),
      onOk() {},
    })
  }

  const handleChangePage = useCallback(
    (params: ContentNotiType, messageNoti: string) => {
      updateStatusSeenNotify({ id: params?.id }).then((response: any) => {
        if ('error' in response) {
          message.error('Có lỗi xảy ra!')
        } else {
          if (params?.serviceType === TYPE_SERVICE_ORDER.TAXI_TRUCK) {
            navigate(`/chuyen-hang/taxi-tai/chi-tiet?orderCode=${params.code}`)
          } else if (params?.serviceType === TYPE_SERVICE_ORDER.MOVING_OFFICE) {
            navigate(
              `/chuyen-hang/chuyen-nha/chi-tiet?orderCode=${params.code}`,
            )
          } else if (params?.type === 'PRM') {
            navigate(`/quan-ly-dich-vu/khuyen-mai/chi-tiet?id=${params.id}`)
          } else if (params?.type === 'NOTIFICATION') {
            infoNoti(params, messageNoti)
          } else if (params.driverId && params.vehicleId) {
            navigate(
              `/doi-tac/chi-tiet?driverId=${params.driverId}&vehicleId=${params.vehicleId}`,
            )
          }
        }
      })
    },
    [navigate, updateStatusSeenNotify],
  )
  useEffect(() => {
    OneSignal.on('notificationDisplay', function (event) {
      console.log("The user's subscription state is now:", event)
      if (event?.data?.data && isJsonString(event?.data?.data)) {
        const newData = JSON.parse(event?.data?.data)
        console.warn('json', newData)
        setOrderCode(newData?.params?.code)
        refetchCountMessageNotSeen()
        notification.open({
          message: (
            <div className="font-bold">
              {newData?.params?.code
                ? `Đơn hàng ${newData?.params?.code}`
                : 'Thông báo'}
            </div>
          ),
          key: `${newData?.params?.code}`,
          description: <div className="font-bold">{newData?.message}</div>,
          duration: 10,
          onClick: () => {
            handleChangePage(newData?.params, newData?.message)
            notification.close(`${newData?.params?.code}`)
          },
        })
      }
    })
    OneSignal.on('notificationDismiss', function (event) {
      console.warn('OneSignal notification dismissed:', event)
    })

    OneSignal.addListenerForNotificationOpened(event => {
      console.warn('addListenerForNotificationOpened', event)
      console.log('addListenerForNotificationOpened', event)

      if (event?.data?.data && isJsonString(event?.data?.data)) {
        const newData = JSON.parse(event?.data?.data)
        handleChangePage(newData?.params, newData?.message)
      }
    })
  }, [handleChangePage, orderCode, orderDetails, refetchCountMessageNotSeen])
}

export default useOnesignal

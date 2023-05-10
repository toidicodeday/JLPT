import { useGetOrderVehicleLocationQuery } from '@/services/orderApi/order'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { Modal } from 'antd'
import React, { useMemo } from 'react'
import { useEffect } from 'react'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  orderCode: string | undefined
}

const DriverLocation = ({ open, setOpen, orderCode }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  })
  const containerStyle = {
    width: '100%',
    height: '600px',
  }

  const { data: vehicleList, refetch } = useGetOrderVehicleLocationQuery(
    {
      code: orderCode,
    },
    { skip: !orderCode || !open },
  )

  const center = useMemo(() => {
    if (vehicleList && vehicleList?.length > 0) {
      return {
        lat: Number(vehicleList[0].lastLat),
        lng: Number(vehicleList[0].lastLng),
      }
    } else {
      return {
        lat: 21.0287,
        lng: 105.8521,
      }
    }
  }, [vehicleList])

  useEffect(() => {
    let intervalId: any
    if (open && orderCode) {
      intervalId = setInterval(() => {
        refetch()
      }, 30000)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [open, orderCode, refetch])

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      width="600px"
    >
      {isLoaded && orderCode && (
        <GoogleMap mapContainerStyle={containerStyle} zoom={15} center={center}>
          {vehicleList &&
            vehicleList?.length > 0 &&
            vehicleList?.map(item => (
              <Marker
                key={item.id}
                position={{
                  lat: Number(item.lastLat),
                  lng: Number(item.lastLng),
                }}
                options={{ label: 'tx' }}
              ></Marker>
            ))}
        </GoogleMap>
      )}
    </Modal>
  )
}

export default DriverLocation

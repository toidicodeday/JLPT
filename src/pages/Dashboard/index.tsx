import React, { useMemo } from 'react'
import { Row, Col } from 'antd'
import OrderAmountChart from './components/OrderAmountChart'
import { useGetGeneralStatisticQuery } from '@/services/dashboardApi'
import StatisticCard from './components/StatisticCard'
import RevenueChart from './components/RevenueChart'

const getGuestByLocation = (
  locationName: string,
  guestArr?: { name: string; count: number }[],
) => {
  return guestArr &&
    guestArr.filter(item => item.name === locationName) &&
    guestArr.filter(item => item.name === locationName)?.length > 0
    ? Number(guestArr.filter(item => item.name === locationName)[0]?.count)
    : 0
}

const Dashboard = () => {
  const { data: generalStatistic, isLoading: isLoadingStatistic } =
    useGetGeneralStatisticQuery()
  const statistic = useMemo(() => {
    const customer = {
      count: generalStatistic?.guest ? generalStatistic?.guest : 0,
      subInfos: [
        {
          title: 'Hà Nội',
          value: getGuestByLocation('Hà Nội', generalStatistic?.guest_by_area),
        },
        {
          title: 'Hồ Chí Minh',
          value: getGuestByLocation('Tp HCM', generalStatistic?.guest_by_area),
        },
      ],
    }
    const order = {
      count: generalStatistic?.order ? generalStatistic?.order : 0,
      subInfos: [
        {
          title: 'Taxi tải',
          value: generalStatistic?.order_by_service_id?.count_tx
            ? Number(generalStatistic?.order_by_service_id?.count_tx)
            : 0,
        },
        {
          title: 'Chuyển trọn gói',
          value: generalStatistic?.order_by_service_id?.count_cn
            ? Number(generalStatistic?.order_by_service_id?.count_cn)
            : 0,
        },
      ],
    }
    const vehicle = {
      count: generalStatistic?.driver ? generalStatistic?.driver : 0,
      subInfos: [
        {
          title: 'Xe Liên Minh',
          value: generalStatistic?.driver_by_unit_key?.count_staff
            ? generalStatistic?.driver_by_unit_key?.count_staff
            : 0,
        },
        {
          title: 'Xe Đối tác',
          value: generalStatistic?.driver_by_unit_key?.count_partner
            ? generalStatistic?.driver_by_unit_key?.count_partner
            : 0,
        },
      ],
    }
    return { customer, order, vehicle }
  }, [generalStatistic])

  return (
    <div>
      <Row gutter={[16, 16]} className="my-8">
        <Col span={24} md={12} lg={8}>
          <StatisticCard
            title="Khách hàng"
            mainNumber={statistic.customer.count}
            subInfos={statistic.customer.subInfos}
            isLoading={isLoadingStatistic}
            pieColor={['item', '#EDF9FF-#0CA4A5-#0892A5']}
          />
        </Col>
        <Col span={24} md={12} lg={8}>
          <StatisticCard
            title="Chuyến hàng"
            mainNumber={statistic.order.count}
            subInfos={statistic.order.subInfos}
            isLoading={isLoadingStatistic}
            pieColor={['item', '#E55934-#FA7921-#FDE74C']}
          />
        </Col>
        <Col span={24} md={12} lg={8}>
          <StatisticCard
            title="Phương tiện"
            mainNumber={statistic.vehicle.count}
            subInfos={statistic.vehicle.subInfos}
            isLoading={isLoadingStatistic}
            pieColor={['item', '#59344F-#E8EBF7-#526760']}
          />
        </Col>
      </Row>

      <OrderAmountChart />

      <RevenueChart />
    </div>
  )
}

export default Dashboard

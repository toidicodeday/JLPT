import Typography from 'antd/lib/typography/Typography'
import React from 'react'
import QRcode from '../../../assets/img/images/qrcode.png'
import GGplay from '../../../assets/img/images/google-play.png'
import APPStore from '../../../assets/img/images/app-store.png'
import { Col, Row } from 'antd'
import './style.scss'
import { Link } from 'react-router-dom'

const categoryList = [
  {
    id: '1',
    name: 'Luyện cùng bài tập tuhocjlpt.com',
    levelList: [
      {
        id: '1',
        name: 'N1',
      },
      {
        id: '2',
        name: 'N2',
      },
      {
        id: '3',
        name: 'N3',
      },
      {
        id: '4',
        name: 'N4',
      },
    ],
  },
  {
    id: '2',
    name: 'Luyện theo sách',
    levelList: [
      {
        id: '1',
        name: 'N1',
      },
      {
        id: '2',
        name: 'N2',
      },
      {
        id: '3',
        name: 'N3',
      },
      {
        id: '4',
        name: 'N4',
      },
    ],
  },
  {
    id: '3',
    name: 'Luyện đề',
    levelList: [
      {
        id: '1',
        name: 'N1',
      },
      {
        id: '2',
        name: 'N2',
      },
      {
        id: '3',
        name: 'N3',
      },
      {
        id: '4',
        name: 'N4',
      },
    ],
  },
  {
    id: '4',
    name: 'Phòng thi thử',
    levelList: [
      {
        id: '1',
        name: 'N1',
      },
      {
        id: '2',
        name: 'N2',
      },
      {
        id: '3',
        name: 'N3',
      },
      {
        id: '4',
        name: 'N4',
      },
    ],
  },
]

const AFooter = () => {
  return (
    <div className="w-full">
      <div className="md:py-14 max-md:px-5 max-md:py-5 footer-bg p-14">
        <Typography className="text-center text-white font-semibold md:text-3xl max-md:text-xl">
          Tải app ngay!
        </Typography>
        <div className="flex justify-center max-sm:flex-col max-lg:items-center gap-14 mx-auto mt-14">
          <div className="">
            <Typography className="text-white font-semibold text-sm mb-5 max-md:text-center">
              Quét mã QR
            </Typography>
            <img src={QRcode} />
          </div>
          <div className="flex flex-col gap-5 items-center max-md:hidden">
            <div className="w-1 h-16 bg-white rounded-sm"></div>
            <Typography className="w-6 h-6 rounded-[50%] bg-white text-black font-bold text-sm flex items-center justify-center">
              or
            </Typography>
            <div className="w-1 h-16 bg-white rounded-sm"></div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <img className="mb-5" src={APPStore} alt="" />
              <img src={GGplay} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[294px] py-12 lg:px-28 md:px-20 sm:px-20 max-sm:px-5 mb-3">
        <Row>
          <Col lg={12} md={12} sm={24} xl={12}>
            <Typography className="font-semibold text-[#FB3357] text-5xl max-md:hidden  max-sm:hidden">
              tuhocjlpt
            </Typography>
          </Col>
          <Col lg={12} md={12} sm={24} xl={12}>
            <Row className="max-sm:text-xs" gutter={[20, 0]}>
              {categoryList.map(item => (
                <Col key={item.id} span={6}>
                  <div className="flex flex-col justify-between h-full">
                    <Typography className="font-bold text-sm text-[#707070] min-h-[40px]">
                      {item.name}
                    </Typography>
                    <div className="flex flex-col mt-5 gap-2">
                      {item.levelList.map(item => (
                        <Link
                          key={item.id}
                          className="cursor-pointer hover:text-[#FB3357] text-[#707070]"
                          to={''}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      <div className="h-10 py-4">
        <Typography className="font-normal text-xs text-center">
          tuhocjlpt @2023
        </Typography>
      </div>
    </div>
  )
}

export default AFooter

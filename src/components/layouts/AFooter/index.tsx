import Typography from 'antd/lib/typography/Typography'
import React from 'react'
import QRcode from '../../../assets/img/images/qrcode.png'
import GGplay from '../../../assets/img/images/google-play.png'
import APPStore from '../../../assets/img/images/app-store.png'
import { Col, Row } from 'antd'
import './style.scss'

const AFooter = () => {
  return (
    <div className="w-full">
      <div className="h-[437px] footer-bg p-14">
        <Typography className="text-center text-white font-semibold text-3xl">
          Tải app ngay!
        </Typography>
        <div className="flex gap-14 w-[474px] mx-auto mt-14">
          <div className="">
            <Typography className="text-white font-semibold text-sm mb-5">
              Quét mã QR
            </Typography>
            <img src={QRcode} />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <div className="w-1 h-16 bg-white rounded-sm"></div>
            <Typography className="w-6 h-6 rounded-[50%] bg-white text-black font-bold text-sm flex items-center justify-center">
              or
            </Typography>
            <div className="w-1 h-16 bg-white rounded-sm"></div>
          </div>
          <div className="flex items-center">
            <div className="">
              <img className="mb-5" src={APPStore} alt="" />
              <img src={GGplay} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[294px] py-12 lg:px-28 md:px-20 sm:px-20 max-sm:px-10">
        <Row>
          <Col lg={12} md={12} sm={24} xl={12}>
            <Typography className="font-semibold text-[#FB3357] text-5xl max-md:hidden  max-sm:hidden">
              tuhocjlpt
            </Typography>
          </Col>
          <Col lg={12} md={12} sm={24} xl={12}>
            <Row className="" gutter={[20, 0]}>
              <Col span={6}>
                <div className="flex flex-col justify-between h-full">
                  <Typography className="font-bold text-sm text-[#707070] min-h-[40px]">
                    Luyện cùng bài tập tuhocjlpt.com
                  </Typography>
                  <div className="flex flex-col mt-5 gap-2">
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N1
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N2
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N3
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N4
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="flex flex-col justify-between h-full">
                  <Typography className="font-bold text-sm text-[#707070]  min-h-[40px]">
                    Luyện theo sách
                  </Typography>
                  <div className="flex flex-col mt-5 gap-2">
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N1
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N2
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N3
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N4
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="flex flex-col justify-between h-full">
                  <Typography className="font-bold text-sm text-[#707070] min-h-[40px]">
                    Luyện đề
                  </Typography>
                  <div className="flex flex-col mt-5 gap-2">
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N1
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N2
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N3
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N4
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className="flex flex-col justify-between h-full">
                  <Typography className="font-bold text-sm text-[#707070] min-h-[40px]">
                    Phòng thi thử
                  </Typography>
                  <div className="flex flex-col mt-5 gap-2">
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N1
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N2
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N3
                    </span>
                    <span className="cursor-pointer hover:text-[#FB3357]">
                      N4
                    </span>
                  </div>
                </div>
              </Col>
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

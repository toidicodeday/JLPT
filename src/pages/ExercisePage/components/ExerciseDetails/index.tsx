import { Button, Col, Row, Typography } from 'antd'
import React from 'react'
import { FaCrown } from 'react-icons/fa'
import LoadIcon from '../../../../assets/img/images/load-icon.png'
import { useNavigate } from 'react-router-dom'

const ExerciseDetail = () => {
  const navigate = useNavigate()
  const handleMoveLessonDetail = () => {
    navigate('/exercise/lesson-details')
  }
  return (
    <div className="w-full">
      <div className="bg-[#FFCAD4] py-5 text-center">
        <Typography className="font-semibold text-[#FB3357] text-5xl">
          Cách đọc Kanji N4
        </Typography>
      </div>
      <div className="py-12 px-32 relative">
        <div className="">
          <Row className="mb-5">
            <Col span={4}>
              <div
                onClick={handleMoveLessonDetail}
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                  <img src={LoadIcon} alt="" className="w-4 h-4" />
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                  <img src={LoadIcon} alt="" className="w-4 h-4" />
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                  <img src={LoadIcon} alt="" className="w-4 h-4" />
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                  <img src={LoadIcon} alt="" className="w-4 h-4" />
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col span={4}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [1 ~ 10] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [11 ~ 20] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [21 ~ 30] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5  rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span>
                    <FaCrown className="border border-solid border-[#FFB800] text-[#FFB800] rounded py-[2px] px-[3px] text-xl w-[30px] h-[20px]" />
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [31 ~ 40] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div
                className="border border-solid border-[#D9D9D9] py-4 px-5 rounded-[20px] cursor-pointer"
                onClick={handleMoveLessonDetail}
              >
                <div className="flex justify-between mb-5">
                  <span className="border border-solid border-[#16DB93] text-[#16DB93] rounded py-[2px] px-[3px] text-[10px] font-normal">
                    FREE
                  </span>
                </div>
                <Typography className="font-normal text-[10px] text-black">
                  [41 ~ 50] Cách đọc Kanji N4
                </Typography>
              </div>
            </Col>
          </Row>
        </div>
        <Button
          type="dashed"
          className="rounded-[20px] text-[#FB3357] border border-dashed border-[#FB3357] font-normal text-sm w-[150px] h-[40px] absolute bottom-[2%] left-[50%] translate-x-[-50%] hover:bg-[#FB3357] hover:text-white"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  )
}

export default ExerciseDetail

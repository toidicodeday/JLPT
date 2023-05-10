import { Modal } from 'antd'
import React from 'react'
import { MdWarning } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ForbiddenRoadErrModal = ({ open, setOpen }: Props) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      destroyOnClose
      title={
        <div className="text-primary flex items-center">
          <MdWarning className="text-base" />
          <span className="ml-3">Lỗi đường cấm</span>
        </div>
      }
      footer={false}
    >
      <p>
        Lộ trình bạn chọn có đi qua đường cấm xe tải. Vui lòng chỉnh sửa địa
        điểm lấy hàng, trả hàng, thời gian lấy hàng hoặc chọn loại xe khác. Chi
        tiết về đường cấm tại đây:
      </p>
      <div className="mt-3">
        <Link to="/quan-ly-he-thong/duong-cam">
          https://thanhhung-admin.tek4.vn/quan-ly-he-thong/duong-cam
        </Link>
      </div>
    </Modal>
  )
}

export default ForbiddenRoadErrModal

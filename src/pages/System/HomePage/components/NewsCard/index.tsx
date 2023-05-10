import ConfirmModal from '@/components/modals/ConfirmModal'
import { useDeleteNewsMutation } from '@/services/newsApi'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Link from 'antd/lib/typography/Link'
import React from 'react'
import { toast } from 'react-toastify'
import EditNewsModal from '../EditNews'
interface Props {
  data: any
  authorizeStatus: { [key: string]: boolean }
}

const NewsCard = ({ data, authorizeStatus }: Props) => {
  const [openConfirmModal, setOpenConfirmModal] = React.useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false)

  const [deleteNews] = useDeleteNewsMutation()

  const handleDeleteNews = async (id: number) => {
    try {
      const deleteResponse = await deleteNews({ id: id })
      if ('data' in deleteResponse) toast.success('Xóa tin tức thành công!')
      if ('error' in deleteResponse) toast.error('Xóa tin tức thất bại!')
      setOpenConfirmModal(false)
    } catch (error) {
      toast.error('Xóa tin tức thất bại!')
    }
  }

  return (
    <>
      <Card
        cover={
          <Link
            href={data.link}
            className={`w-full h-48 ${data.url ? '' : 'bg-grayChip'}`}
          >
            {data.url && (
              <img alt="example" src={data.url} className="h-48 w-full" />
            )}
          </Link>
        }
        actions={
          authorizeStatus.canEdit
            ? [
                <EditOutlined
                  key="edit"
                  onClick={() => setOpenEditModal(true)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => setOpenConfirmModal(true)}
                />,
              ]
            : []
        }
      >
        <Link href={data.link} className="h-48 w-full text-black">
          <p>{data?.title}</p>
        </Link>
      </Card>
      <EditNewsModal
        initialVal={data}
        open={openEditModal}
        setOpen={(type: boolean) => setOpenEditModal(type)}
      />
      <ConfirmModal
        modalTitle="Xác nhận xoá"
        isModalOpen={openConfirmModal}
        setIsModalOpen={(type: boolean) => setOpenConfirmModal(type)}
        onSubmit={() => handleDeleteNews(data?.id)}
        okText="Tiếp tục"
        cancelText="Quay lại"
        message="Bạn có chắc chắn xoá tin tức hiện tại?"
      />
    </>
  )
}

export default NewsCard

import DebounceSelect from '@/components/inputs/DebounceSelect'
import ConfirmModal from '@/components/modals/ConfirmModal'
import ToastContainerComponent from '@/components/ToastContainer'
import {
  useGetPromotionHomeListQuery,
  useGetPromotionOpsQuery,
  useUpdatePromotionMutation,
} from '@/services/feeApi/fee'
import { PromoType } from '@/services/feeApi/types'
import { useGetNewsListQuery } from '@/services/newsApi'
import {
  useDeleteVideoConfigMutation,
  useGetVideoConfigQuery,
} from '@/services/systemApi/system'
import { formatDate, numberWithComma } from '@/utils/helpers/convert.helper'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Typography, Row, Col, Tooltip, message, Spin } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useCallback, useMemo, useState } from 'react'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { MdUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import AddNewsModal from './components/AddNews'
import NewsCard from './components/NewsCard'
import ReactPlayer from 'react-player'
import AddVideoModal from './components/AddVideos'
import TableResponsive from '@/components/Table'
import { AdminMeType } from '@/services/accountApi/types'
import { useSelector } from 'react-redux'
import { selectUserMe } from '@/store/authSlice/selector'
import {
  checkAuthorize,
  getAdminSystemFunction,
} from '@/utils/helpers/authorize.helper'
import { SYSTEM_ROLE_KEY } from '@/utils/constant/constant'

const HomePageSettings = () => {
  //handle Authorize
  const adminInfo: AdminMeType = useSelector(selectUserMe)
  const authorizeStatus = useMemo(() => {
    const adminSystemFuncs = getAdminSystemFunction(adminInfo)
    return {
      canCreate: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.homeSettings,
        'create',
      ),
      canEdit: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.homeSettings,
        'edit',
      ),
      canDelete: checkAuthorize(
        adminSystemFuncs,
        SYSTEM_ROLE_KEY.homeSettings,
        'delete',
      ),
    }
  }, [adminInfo])
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [idPromotionSelected, setIdPromotionSelected] = useState<number>()
  const [infoConfirmDelModal, setInfoConfirmDelModal] = useState<{
    isOpen: boolean
    id: number
    type: string
  }>({
    isOpen: false,
    id: 0,
    type: '',
  })
  const [openVideoModal, setOpenVideoModal] = useState<boolean>(false)
  const { data: initPromotionList, isFetching: fetching } =
    useGetPromotionHomeListQuery({
      query: '?search=homepage:=:true',
    })

  const [updatePromotion, { isLoading: isUpdating }] =
    useUpdatePromotionMutation()

  const { data: listNews } = useGetNewsListQuery({ query: '' })

  const { data: listVideo, isFetching } = useGetVideoConfigQuery({ query: '' })

  const [deleteVideo] = useDeleteVideoConfigMutation()

  const actionColumns = (record: any) => {
    return (
      <Tooltip title="Xoá khỏi danh sách" placement="topRight">
        <Button
          type="text"
          icon={<AiFillDelete className="text-2xl" />}
          onClick={() => {
            setInfoConfirmDelModal({
              isOpen: true,
              id: record?.id,
              type: 'promotion',
            })
          }}
          disabled={!authorizeStatus.canEdit}
        />
      </Tooltip>
    )
  }

  const columnsMobile: ColumnsType<PromoType> = [
    {
      key: 'id',
      render: (value: any, record: any) => {
        return (
          <>
            <div>
              <span className="text-primary text-base">{record?.code}</span> -{' '}
              <span className="font-bold">{record?.name}</span>
            </div>
            <p>
              {`Giảm ${numberWithComma(record?.discount)} ${
                record?.discountType === 'VND' ? 'VND' : '%'
              }. Tối đa ${numberWithComma(record?.maxDiscount)} VND`}
            </p>
            {!record.applyFrom && !record?.applyTo && (
              <p>Áp dụng: Vô thời hạn</p>
            )}
            {record.applyFrom && record?.applyTo && (
              <p>
                Áp dụng: {formatDate(record?.applyFrom)} -{' '}
                {formatDate(record?.applyTo)}
              </p>
            )}
            {genStatusPromotion(
              formatDate(record?.applyFrom, 'yyyy-MM-dd'),
              formatDate(record?.applyTo, 'yyyy-MM-dd'),
            )}
          </>
        )
      },
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => actionColumns(record),
    },
  ]

  const columns: ColumnsType<PromoType> = [
    {
      title: 'Mã chương trình',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tiêu đề chương trình',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (value: any, record: any) =>
        `${numberWithComma(value)} ${
          record?.discountType === 'VND' ? 'VND' : '%'
        }`,
    },
    {
      title: 'Tối đa',
      dataIndex: 'maxDiscount',
      key: 'maxDiscount',
      render: v => numberWithComma(v),
    },
    {
      title: 'Thời gian áp dụng',
      key: 'date',
      render: (record: any) => {
        if (!record.applyFrom && !record?.applyTo) return <p>Vô thời hạn</p>
        else
          return (
            <p>
              {formatDate(record?.applyFrom)} - {formatDate(record?.applyTo)}
            </p>
          )
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (record: any) =>
        genStatusPromotion(
          formatDate(record?.applyFrom, 'yyyy-MM-dd'),
          formatDate(record?.applyTo, 'yyyy-MM-dd'),
        ),
    },
    {
      key: 'activity',
      align: 'right',
      render: (record: any) => actionColumns(record),
    },
  ]

  const genStatusPromotion = useCallback(
    (applyFrom: string, applyTo: string) => {
      const today = formatDate(Date(), 'yyyy-MM-dd')

      if (
        (today >= applyFrom && today <= applyTo) ||
        (applyFrom === null && applyTo === null)
      )
        return <div className="text-greenButton font-bold">Đang chạy</div>
      if (today < applyFrom)
        return <div className="text-blueColor font-bold">Chưa diễn ra</div>
      if (today > applyTo)
        return <div className="text-orangeButton font-bold">Hết hạn</div>
    },
    [],
  )

  const addPromotionSelected = (id: number) => {
    const isIdPromoDuplicate = initPromotionList?.data?.filter(
      (item: any) => item.id === id,
    )?.length

    if (!isIdPromoDuplicate) {
      const body = {
        homepage: true,
      }
      updatePromotion({ id, body }).then(response => {
        if ('data' in response) {
          toast.success(
            'Thêm mới chương trình khuyến mãi cho trang chủ thành công!',
          )
        } else if ('error' in response) {
          toast.error('Có lỗi xãy ra!')
        }
      })
    } else message.error('Mã khuyến mãi đã được hiển thị trang chủ trước đó')
  }

  const deleteTypeSelected = (type: string, id: number) => {
    if (type === 'promotion') deletePromotionSelected(id)
    else deleteVideoConfig(id)
  }

  const deletePromotionSelected = (id: number) => {
    const body = {
      homepage: false,
    }
    updatePromotion({ id, body }).then(response => {
      if ('data' in response) {
        toast.success(
          'Xóa chương trình khuyến mãi hiển thị trang chủ thành công!',
        )
        setInfoConfirmDelModal({
          ...infoConfirmDelModal,
          isOpen: false,
          type: '',
        })
      } else if ('error' in response) {
        toast.error('Có lỗi xãy ra!')
      }
    })
  }

  const deleteVideoConfig = async (id: number) => {
    try {
      const response = await deleteVideo({ id: id })
      if ('data' in response)
        toast.success('Xóa video hiển thị trang chủ thành công!')
      if ('error' in response)
        toast.error('Xóa video hiển thị trang chủ thất bại!')
      setInfoConfirmDelModal({
        ...infoConfirmDelModal,
        isOpen: false,
        type: '',
      })
    } catch (error) {
      toast.success('Có lỗi xảy ra!')
    }
  }

  return (
    <div className="pb-4">
      <div className="flex justify-between items-center py-2 border-b border-t-0 border-x-0 border-solid border-grayDivider">
        <Typography className="text-lg font-bold">
          CẤU HÌNH TRANG CHỦ
        </Typography>
      </div>
      <div className="bg-obotBlueBg p-2 mt-4 font-bold flex justify-between items-center">
        <Typography>Video giới thiệu</Typography>
        {authorizeStatus.canEdit && (
          <Button
            type="primary"
            icon={<MdUpload className="text-base" />}
            onClick={() => setOpenVideoModal(true)}
            className="flex items-center"
          >
            Thêm mới video
          </Button>
        )}
      </div>
      {listVideo?.total === 0 ? (
        <div className="mt-4">
          <Typography>Chưa có video nào</Typography>
        </div>
      ) : (
        <Spin spinning={isFetching}>
          {listVideo?.total && listVideo?.total > 0 && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-5">
              {listVideo?.data?.map((item: any) => {
                return (
                  <div className="relative group min-h-[200px] bg-black">
                    <ReactPlayer
                      url={item?.url}
                      controls
                      width="100%"
                      height={200}
                    />
                    <Button
                      className="hidden group-hover:block group-hover:absolute group-hover:top-0 group-hover:right-0 rounded-none"
                      type="primary"
                      onClick={() => {
                        setInfoConfirmDelModal({
                          isOpen: true,
                          id: item?.id,
                          type: 'video',
                        })
                      }}
                    >
                      <CloseOutlined className="hidden group-hover:block group-hover:text-base" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </Spin>
      )}

      <div className="bg-obotBlueBg p-2 my-4 font-bold flex justify-between items-center">
        <Typography>Chương trình khuyến mại hiển thị cho khách hàng</Typography>
      </div>
      <Row gutter={16}>
        {authorizeStatus.canEdit && (
          <>
            <Col xs={24} sm={24} md={6} className="pb-4">
              <p>Chương trình khuyến mại</p>
            </Col>
            <Col xs={18} sm={18} md={16} className="pb-4">
              <DebounceSelect
                optionQuery={useGetPromotionOpsQuery}
                convertQueryString={searchString =>
                  searchString
                    ? '?search=' +
                      encodeURIComponent(`name:ilike:%${searchString}%`)
                    : ''
                }
                className="w-full"
                onChange={value => setIdPromotionSelected(value)}
                allowClear
              />
            </Col>
            <Col xs={6} sm={6} md={2}>
              <Button
                type="primary"
                className="w-full"
                onClick={() => {
                  idPromotionSelected &&
                    addPromotionSelected(idPromotionSelected)
                }}
                disabled={!idPromotionSelected}
              >
                Thêm
              </Button>
            </Col>
          </>
        )}

        {initPromotionList?.total === 0 && (
          <div className="mt-4 p-2">
            <Typography>
              Chưa có chương trình khuyến mại nào được chọn
            </Typography>
          </div>
        )}
        {initPromotionList && initPromotionList?.total > 0 && (
          <Col span={24}>
            <TableResponsive
              columns={columns}
              dataSource={initPromotionList?.data}
              loading={isUpdating || fetching}
              columnsMobile={columnsMobile}
            />
          </Col>
        )}
      </Row>
      <div className="bg-obotBlueBg p-2 mt-4 font-bold flex justify-between items-center">
        <Typography>Tin tức</Typography>
        {authorizeStatus.canEdit && (
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            onClick={() => setOpenModal(true)}
            className="flex items-center"
          >
            Thêm tin tức mới
          </Button>
        )}
      </div>
      {listNews?.total === 0 && (
        <div className="mt-4">
          <Typography>Chưa có tin tức nào được hiển thị</Typography>
        </div>
      )}
      {listNews && listNews?.total > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-6">
          {listNews?.data?.map((item: any) => (
            <div className="col-span-1">
              <NewsCard data={item} authorizeStatus={authorizeStatus} />
            </div>
          ))}
        </div>
      )}
      <AddNewsModal
        open={openModal}
        setOpen={(type: boolean) => setOpenModal(type)}
      />
      <AddVideoModal
        open={openVideoModal}
        setOpen={(type: boolean) => setOpenVideoModal(type)}
      />
      <ConfirmModal
        setIsModalOpen={(isOpen: boolean) =>
          setInfoConfirmDelModal({ ...infoConfirmDelModal, isOpen: isOpen })
        }
        isModalOpen={infoConfirmDelModal.isOpen}
        onSubmit={() =>
          deleteTypeSelected(infoConfirmDelModal?.type, infoConfirmDelModal?.id)
        }
        okText="Tiếp tục"
        cancelText="Quay lại"
        modalTitle="Xác nhận xoá"
        message="Bạn có chắc chắn muốn xoá?"
      />
      <ToastContainerComponent />
    </div>
  )
}

export default HomePageSettings

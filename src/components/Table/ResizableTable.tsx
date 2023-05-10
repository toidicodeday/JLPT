import { ORDER_TABLE_COL_SIZE } from '@/utils/constant/constant'
import Table from 'antd/lib/table'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ResizableTitle from './ResizableTitle'

interface Props {
  initColumns: any
  dataSource: any
  loading?: boolean
  className?: string
  showHeader?: boolean
  pagination?: boolean
  columnsMobile?: any
  totalData?: number | undefined
  handleChangePage?: (page: number, pageSize: number) => void
  rowKey?: string
  currentPage?: number
  bordered?: boolean
  rowClassName?: any
}

const ResizableTable = ({
  initColumns,
  dataSource,
  loading,
  className,
  showHeader,
  pagination = true,
  totalData,
  handleChangePage,
  rowKey,
  currentPage,
  bordered,
  rowClassName,
}: Props) => {
  const location = useLocation()
  const [columns, setColumns] = React.useState<any>(initColumns)
  const isTxService: boolean = useMemo(
    () => (location.pathname === '/chuyen-hang/taxi-tai' ? true : false),
    [location.pathname],
  )
  const isCnService: boolean = useMemo(
    () => (location.pathname === '/chuyen-hang/chuyen-nha' ? true : false),
    [location.pathname],
  )
  const tableComponents = {
    header: {
      cell: ResizableTitle,
    },
  }
  const handleResizeColumns =
    (index: any) =>
    (e: any, { size }: any) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      }
      setColumns(nextColumns)
    }
  const tableColumns = columns.map((col: any, index: any) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: handleResizeColumns(index),
    }),
  }))
  const handleSaveColumWidth = useCallback(() => {
    if (isTxService) {
      localStorage.setItem(
        ORDER_TABLE_COL_SIZE.TX_TABLE_SIZE,
        JSON.stringify(
          columns.map((item: any) => ({
            key: item.key,
            width: item.width,
          })),
        ),
      )
    }
    if (isCnService) {
      localStorage.setItem(
        ORDER_TABLE_COL_SIZE.CN_TABLE_SIZE,
        JSON.stringify(
          columns.map((item: any) => ({
            key: item.key,
            width: item.width,
          })),
        ),
      )
    }
  }, [columns, isCnService, isTxService])
  useEffect(() => {
    handleSaveColumWidth()
  }, [handleSaveColumWidth])

  return (
    <React.Fragment>
      <Table
        rowKey={rowKey}
        columns={tableColumns}
        dataSource={dataSource}
        components={tableComponents}
        loading={loading}
        className={`hidden sm:block ${className}`}
        showHeader={showHeader}
        bordered={bordered}
        rowClassName={rowClassName}
        pagination={
          pagination
            ? {
                current: currentPage,
                total: totalData,
                pageSizeOptions: [10, 20, 50, 100],
                defaultPageSize: 10,
                showSizeChanger: true,
                onChange(page: number, pageSize: number) {
                  handleChangePage && handleChangePage(page, pageSize)
                },
              }
            : false
        }
      ></Table>
    </React.Fragment>
  )
}

export default ResizableTable

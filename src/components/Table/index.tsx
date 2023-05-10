import { Table } from 'antd'
import React from 'react'
import ResizableTable from './ResizableTable'
import './style.scss'
interface Props {
  columns: any
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
  isResizable?: boolean
}

const TableResponsive = ({
  columns,
  dataSource,
  loading,
  className,
  showHeader,
  pagination = true,
  columnsMobile,
  totalData,
  handleChangePage,
  rowKey,
  currentPage,
  bordered,
  isResizable,
  rowClassName,
}: Props) => {
  return (
    <div>
      {isResizable ? (
        <ResizableTable
          rowKey={rowKey}
          initColumns={columns}
          dataSource={dataSource}
          loading={loading}
          className={`hidden sm:block ${className}`}
          showHeader={showHeader}
          bordered={bordered}
          rowClassName={rowClassName}
          pagination={pagination}
          currentPage={currentPage}
          totalData={totalData}
          handleChangePage={handleChangePage}
        />
      ) : (
        <Table
          rowKey={rowKey}
          columns={columns}
          dataSource={dataSource}
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
        />
      )}

      <Table
        rowKey={rowKey}
        columns={columnsMobile || columns}
        dataSource={dataSource}
        loading={loading}
        className={`xs:block sm:hidden ${className}`}
        showHeader={false}
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
                position: ['topLeft', 'bottomRight'],
              }
            : false
        }
      />
    </div>
  )
}

export default TableResponsive

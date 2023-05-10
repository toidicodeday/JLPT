import { Typography } from 'antd'
import React from 'react'
import CheckboxesGroup from '../Checkboxes'

interface Props {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
  rowTitle: { title: string; key: string; id: number }[]
  colTitle: { title: string; key: string }[]
  authorizeStatus: { [key: string]: boolean }
}

const AuthorizeTable = ({
  data,
  rowTitle,
  colTitle,
  setData,
  authorizeStatus,
}: Props) => {
  const handleSetData = (rowData: any, rowKey: any) => {
    let editData = { ...data }
    editData[rowKey] = rowData
    setData(editData)
  }

  return (
    <>
      <Typography>THIẾT LẬP QUYỀN</Typography>
      <div className="bg-grayButton mt-2 flex items-center">
        <div className="py-2 px-2 w-64">Chức năng</div>
        {colTitle.map(({ key, title }) => {
          return (
            <div key={key} className="py-2 px-2 text-center w-32">
              {title}
            </div>
          )
        })}
      </div>
      {rowTitle.map(({ key: rowKey, title }) => {
        return (
          <div
            className="py-2 border flex items-center border-solid border-grayButton"
            key={rowKey}
          >
            <div className="py-2 px-2 w-64">{title}</div>
            <CheckboxesGroup
              rowData={data?.[rowKey] || {}}
              handleSetData={(rowData: any) => handleSetData(rowData, rowKey)}
              colTitle={colTitle}
              checkDisabled={!authorizeStatus.canEdit}
            />
          </div>
        )
      })}
    </>
  )
}

export default AuthorizeTable

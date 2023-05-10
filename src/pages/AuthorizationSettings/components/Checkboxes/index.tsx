import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import { PERMISSION_ACTION_KEY } from '@/utils/constant/constant'
import { every } from 'lodash'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface Props {
  rowData: any
  handleSetData: (values: any) => void
  colTitle: { title: string; key: string }[]
  checkDisabled: boolean
}

const CheckboxesGroup = ({
  rowData,
  colTitle,
  handleSetData,
  checkDisabled,
}: Props) => {
  const isRowCheckAll = (row: Record<string, { isChecked: boolean }>) => {
    let isCheckedAll = true
    Object.keys(row).forEach(key => {
      if (key !== PERMISSION_ACTION_KEY.FULL && row[key].isChecked === false)
        isCheckedAll = false
    })
    return isCheckedAll
  }

  const onChange = (e: CheckboxChangeEvent, colKey: string) => {
    const checked = e.target.checked
    const newRowData = { ...rowData }
    if (colKey === PERMISSION_ACTION_KEY.FULL) {
      Object.keys(newRowData).forEach(key => {
        newRowData[key].isChecked = checked
      })
    } else if (newRowData[colKey]) {
      newRowData[colKey].isChecked = checked
      newRowData[PERMISSION_ACTION_KEY.FULL].isChecked =
        isRowCheckAll(newRowData)
    } else {
      newRowData[colKey] = {
        isChecked: checked,
      }
      newRowData[PERMISSION_ACTION_KEY.FULL].isChecked =
        isRowCheckAll(newRowData)
    }

    handleSetData(newRowData)
  }

  const checkAllIndeterminate = useMemo(() => {
    const listChecked: boolean[] = []
    if (!rowData) return false
    Object.keys(rowData).forEach(actionKey => {
      if (actionKey === PERMISSION_ACTION_KEY.FULL) return
      listChecked.push(rowData[actionKey].isChecked)
    })
    if (every(listChecked, false)) return false
    if (every(listChecked, true)) return false
    return false
  }, [rowData])

  return (
    <>
      {colTitle.map(({ key: colKey }) => {
        return (
          <div key={colKey} className="text-center w-32 px-2 py-2">
            <Checkbox
              value={colKey}
              checked={rowData?.[colKey]?.isChecked}
              indeterminate={
                colKey === PERMISSION_ACTION_KEY.FULL
                  ? checkAllIndeterminate
                  : false
              }
              onChange={e => onChange(e, colKey)}
              disabled={checkDisabled}
            />
          </div>
        )
      })}
    </>
  )
}

export default CheckboxesGroup

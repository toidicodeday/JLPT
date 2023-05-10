import { DatePicker } from '@/components/inputs'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Tooltip } from 'antd'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { endOfMinute, isAfter, startOfMinute } from 'date-fns'
import { isBefore } from 'date-fns/esm'

type Props = {
  name: string
  form: any
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
const handleOnDragEnd = (result: any, name: string, form: any) => {
  if (!result.destination) {
    return
  }
  const rawValues = form.getFieldValue(name)
  const items = reorder(
    rawValues,
    result.source.index,
    result.destination.index,
  )
  form.setFieldValue(name, items)
}

const disabledHourApplyStart = (current: any, hourApplyEnd?: any) => {
  return !isAfter(endOfMinute(new Date(hourApplyEnd)), endOfMinute(current))
}

const disabledHourApplyEnd = (current: any, hourApplyStart?: any) => {
  return !isBefore(
    startOfMinute(new Date(hourApplyStart)),
    startOfMinute(current),
  )
}

const DragListForbiddenRoadTime = ({ name, form }: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            <DragDropContext
              onDragEnd={result => handleOnDragEnd(result, name, form)}
            >
              <Droppable droppableId="droppable">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.key}
                        draggableId={String(field.key)}
                        index={index}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center flex-wrap gap-x-4 border border-solid border-slate-200 rounded-lg p-2 mb-3 w-fit"
                          >
                            <div className="w-40">
                              <Form.Item
                                label="Từ giờ"
                                rules={[
                                  { required: true },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      const dateTo = getFieldValue([
                                        name,
                                        field.name,
                                        'to',
                                      ])

                                      if (value && dateTo && value >= dateTo)
                                        return Promise.reject(
                                          new Error('Thời gian không hợp lệ'),
                                        )

                                      return Promise.resolve()
                                    },
                                  }),
                                ]}
                                name={[field.name, 'from']}
                              >
                                <DatePicker.TimePicker
                                  className="w-full h-8 rounded border-grayDivider"
                                  format="HH:mm"
                                  showNow={false}
                                  disabledDate={current =>
                                    form.getFieldValue([
                                      name,
                                      field.name,
                                      'to',
                                    ]) &&
                                    disabledHourApplyStart(
                                      current,
                                      form.getFieldValue([
                                        name,
                                        field.name,
                                        'to',
                                      ]),
                                    )
                                  }
                                />
                              </Form.Item>
                            </div>
                            <div className="w-40">
                              <Form.Item
                                label="Đến giờ"
                                rules={[
                                  { required: true },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      const dateFrom = getFieldValue([
                                        name,
                                        field.name,
                                        'from',
                                      ])

                                      if (value && dateFrom && value < dateFrom)
                                        return Promise.reject(
                                          new Error('Thời gian không hợp lệ'),
                                        )

                                      return Promise.resolve()
                                    },
                                  }),
                                ]}
                                name={[field.name, 'to']}
                              >
                                <DatePicker.TimePicker
                                  className="w-full h-8 rounded border-grayDivider"
                                  format="HH:mm"
                                  showNow={false}
                                  disabledDate={current =>
                                    form.getFieldValue([
                                      name,
                                      field.name,
                                      'from',
                                    ]) &&
                                    disabledHourApplyEnd(
                                      current,
                                      form.getFieldValue([
                                        name,
                                        field.name,
                                        'from',
                                      ]),
                                    )
                                  }
                                />
                              </Form.Item>
                            </div>

                            <MinusCircleOutlined
                              className="dynamic-delete-button m-2 text-red-500"
                              onClick={() => {
                                remove(field.name)
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="w-full">
              <Tooltip title="Thêm giờ cấm" placement="topRight">
                <Button type="dashed" onClick={() => add()}>
                  Thêm giờ
                </Button>
              </Tooltip>
            </div>
          </>
        )
      }}
    </Form.List>
  )
}

export default DragListForbiddenRoadTime

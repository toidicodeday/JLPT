import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { AreaSetupEnum } from '@/utils/constant/constant'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Tooltip } from 'antd'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
  name: string
  form: any
  typeArea: string
}
const { Option } = Select

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

const DragListMileageQuote = ({ name, form, typeArea }: Props) => {
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
                                key={field.key}
                                label="Từ (km)"
                                rules={[{ required: true }]}
                                name={[field.name, 'from']}
                              >
                                <InputNumber className="w-full" min={0} />
                              </Form.Item>
                            </div>
                            <div className="w-40">
                              <Form.Item
                                key={field.key}
                                label="Đến (km)"
                                rules={[{ required: true }]}
                                name={[field.name, 'to']}
                              >
                                <InputNumber className="w-full" min={0} />
                              </Form.Item>
                            </div>
                            <div className="flex gap-4">
                              <div className="w-30">
                                <Form.Item
                                  key={field.key}
                                  label="Giá cước (vnd)"
                                  name={[field.name, 'type']}
                                  // initialValue="FIX"
                                  className="w-full"
                                  rules={[{ required: true }]}
                                >
                                  <Select>
                                    {typeArea === AreaSetupEnum.IN_CITY && (
                                      <Option value="FIX">Tổng</Option>
                                    )}
                                    <Option value="KM">/1 km</Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div className="w-40">
                                <Form.Item
                                  key={field.key}
                                  name={[field.name, 'price']}
                                  className="mt-7 w-full"
                                  rules={[{ required: true }]}
                                >
                                  <InputNumberFormatMoney
                                    className="rounded-md w-full"
                                    min={0}
                                  />
                                </Form.Item>
                              </div>
                              <div className="hidden">
                                <Form.Item
                                  key={field.key}
                                  name={[field.name, 'areaSetup']}
                                  initialValue={typeArea}
                                >
                                  <Input className="w-full" />
                                </Form.Item>
                              </div>
                              <MinusCircleOutlined
                                className="dynamic-delete-button m-2 text-red-500"
                                onClick={() => {
                                  remove(field.name)
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Form.Item>
              <Tooltip
                title="Thêm dòng công thức tính giá cước"
                placement="topRight"
              >
                <Button type="dashed" onClick={() => add()}>
                  Thêm dòng
                </Button>
              </Tooltip>
            </Form.Item>
          </>
        )
      }}
    </Form.List>
  )
}

export default DragListMileageQuote

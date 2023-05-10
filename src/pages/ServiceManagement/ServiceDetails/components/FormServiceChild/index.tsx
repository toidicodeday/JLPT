import InputNumberFormatMoney from '@/components/inputs/InputNumberFormatMoney'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Tooltip } from 'antd'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type Props = {
  name: (string | number)[]
  form: any
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
const handleOnDragEnd = (result: any, name: (string | number)[], form: any) => {
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

const FormServiceChild = ({ name, form }: Props) => {
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
                          <Row
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center border border-solid border-slate-200 rounded-lg p-2 mb-3"
                            gutter={16}
                          >
                            <Col span={0}>
                              <Form.Item
                                key={field.key}
                                name={[field.name, 'id']}
                              >
                                <Input className="w-full" />
                              </Form.Item>
                            </Col>
                            <Col xs={22} sm={22} md={5}>
                              <Form.Item
                                key={field.key}
                                rules={[{ required: true }]}
                                name={[field.name, 'name']}
                              >
                                <Input className="w-full" />
                              </Form.Item>
                            </Col>
                            <Col xs={22} sm={22} md={4}>
                              <Form.Item
                                key={field.key}
                                rules={[{ required: true }]}
                                name={[field.name, 'price']}
                              >
                                <InputNumberFormatMoney
                                  className="rounded-md w-full"
                                  min={0}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={22} sm={22} md={13}>
                              <Form.Item
                                key={field.key}
                                name={[field.name, 'desc']}
                              >
                                <Input className="w-full" />
                              </Form.Item>
                            </Col>
                            <Col xs={2} sm={2} md={1}>
                              <DeleteOutlined
                                className="dynamic-delete-button  text-red-500"
                                onClick={() => {
                                  remove(field.name)
                                }}
                              />
                            </Col>
                          </Row>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Tooltip title="Thêm dịch vụ con" placement="topRight">
              <Button
                type="primary"
                className="h-6 w-6 flex justify-center items-center"
                onClick={() => add()}
              >
                <PlusOutlined />
              </Button>
            </Tooltip>
          </>
        )
      }}
    </Form.List>
  )
}

export default FormServiceChild

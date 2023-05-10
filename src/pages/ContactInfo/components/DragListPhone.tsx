import React from 'react'
import {
  PhoneOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

type Props = {
  name: string
  handleOnDragEnd: any
  title: string
}

const DragListPhone = ({ name, handleOnDragEnd, title }: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            <p className="font-bold text-sm">{title}</p>
            <div className="flex">
              <DragDropContext
                onDragEnd={result => handleOnDragEnd(result, name)}
              >
                <Droppable droppableId="droppable">
                  {provided => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="md:w-2/5 sm:w-3/5 "
                    >
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
                              className="flex items-center justify-center mb-6"
                            >
                              <PhoneOutlined className="m-2 text-sm" />
                              <Form.Item
                                key={field.key}
                                name={[field.name, 'phone']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Trường này là bắt buộc',
                                  },
                                  { min: 8, message: 'Yêu cầu ít nhất 8 số' },
                                  {
                                    validator(_, value) {
                                      const regexString = new RegExp(
                                        /^([+|0-9])+([0-9]{7,11})\b/g,
                                      )
                                      if (regexString.test(value) || !value) {
                                        return Promise.resolve()
                                      }
                                      return Promise.reject(
                                        new Error(
                                          'Số điện thoại chưa đúng định dạng',
                                        ),
                                      )
                                    },
                                  },
                                ]}
                                className="w-full mb-0"
                              >
                                <Input maxLength={12} />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  style={{ margin: '8px' }}
                                  onClick={() => {
                                    remove(field.name)
                                  }}
                                />
                              ) : null}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Form.Item className="mx-8">
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                >
                  <PlusOutlined />
                </Button>
              </Form.Item>
            </div>
          </>
        )
      }}
    </Form.List>
  )
}

export default DragListPhone

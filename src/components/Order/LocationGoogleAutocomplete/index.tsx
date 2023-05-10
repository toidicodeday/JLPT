import { AutoComplete, Form } from 'antd'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import {
  useGetLocationAutocompleteQuery,
  useLazyGetLocationDetailsQuery,
} from '@/services/mapApi/map'
import { OrderLocationType } from '@/services/orderApi/types'

interface Props {
  propName: string
  formRef: any
  initialValue?: OrderLocationType
  value?: any
  label: string
}

const GoogleAutocomplete = (props: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [googleQuery, setGoogleQuery] = useState<string>('')
  const { data: googleAutocompleteOptions } = useGetLocationAutocompleteQuery(
    {
      query: googleQuery,
    },
    { skip: googleQuery === '' },
  )

  const [getLatLong] = useLazyGetLocationDetailsQuery()

  const handleSearch = useCallback((searchText: string) => {
    setGoogleQuery(searchText)
  }, [])

  const onSelect = async (_: any, option: any) => {
    const response = await getLatLong({ placeId: option?.place_id })
    props.formRef.setFieldValue(props.propName, {
      ...option,
      latitude: response?.data?.latitude,
      longitude: response?.data?.longitude,
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), [])

  useEffect(() => {
    setInputValue(props.value)
  }, [props.value])

  return (
    <Form.Item
      name={props.propName}
      label={props.label}
      rules={[{ required: true }]}
    >
      <AutoComplete
        options={googleAutocompleteOptions}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text: string) => {
          setInputValue(text)
          debounceSearch(text)
        }}
        className="w-full"
        value={inputValue}
        placeholder={
          props?.initialValue?.location ? props?.initialValue?.location : null
        }
      />
    </Form.Item>
  )
}

export default GoogleAutocomplete

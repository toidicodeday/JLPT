import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseApi'

export const vehicleTypeApi = createApi({
  reducerPath: 'base',
  baseQuery: baseQuery,
  tagTypes: ['VEHICLETYPE'],
  endpoints: builder => ({
    //TODO Get
    get: builder.query({
      query: data => 'accounts',
    }),
  }),
})

export const { useGetQuery } = vehicleTypeApi

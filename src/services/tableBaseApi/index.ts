import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseApi'

export const tableBaseApi = createApi({
  reducerPath: 'base',
  baseQuery: baseQuery,
  tagTypes: ['CRUD'],
  endpoints: builder => ({
    //TODO Get
    get: builder.query({
      query: data => `${data.endPoint}${data?.query}`,
      providesTags: ['CRUD'],
    }),
    //TODO Get One
    getOne: builder.query({
      query: data => ({
        url: `${data.endPoint}/${data.id}`,
      }),
    }),
    //TODO Create
    create: builder.mutation({
      query: data => ({
        method: 'POST',
        url: `${data.endPoint}`,
        body: data.body,
      }),
      invalidatesTags: ['CRUD'],
    }),
    //TODO Update
    update: builder.mutation({
      query: data => ({
        method: 'PUT',
        url: `${data.endPoint}/${data.id}`,
        body: data.body,
      }),
      invalidatesTags: ['CRUD'],
    }),
    //TODO Delete
    delete: builder.mutation({
      query: data => ({
        method: 'DELETE',
        url: `${data.endPoint}/${data.id}`,
      }),
      invalidatesTags: ['CRUD'],
    }),
  }),
})

export const {
  useGetQuery,
  useGetOneQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = tableBaseApi

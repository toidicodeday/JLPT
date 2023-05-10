import { GetAreaListRequest, GetAreaListResponse } from './types'
import { baseAPI } from '../baseApi'

export const workingAreaAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['area'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getAreaList: builder.query<GetAreaListResponse, GetAreaListRequest>({
        query: data => `/system/v1/user/working-area/${data?.query}`,
        providesTags: ['area'],
      }),
      getAreaOps: builder.query<
        { label: string; value: string | number }[],
        GetAreaListRequest | void
      >({
        query: data => `/system/v1/user/working-area/${data?.query || ''}`,
        providesTags: ['area', { type: 'area', id: 'option' }],
        transformResponse: (response: GetAreaListResponse) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
      }),
    }),
  })

export const { useGetAreaListQuery, useGetAreaOpsQuery } = workingAreaAPI

import { ListWithPageOf } from '@/services/commonResposntType'
import { RecordType } from './types'
import { baseAPI } from '../baseApi'

const TAG = 'RECORD'

export const audioRecordAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getRecordList: builder.query<
        ListWithPageOf<RecordType>,
        { query: string } | void
      >({
        query: data => `/order/admin/records/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
    }),
  })

export const { useGetRecordListQuery } = audioRecordAPI

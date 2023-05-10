import { baseAPI } from '../baseApi'
import {
  GetOneDriverRequest,
  GetOneDriverResponse,
  GetDriverListRequest,
  GetDriverListResponse,
  ActiveDriverRequest,
  RejectDriverRequest,
  ActiveDriverResponse,
} from './types'

const TAG = 'PARTNER'

export const partnerApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getDriver: builder.query<GetDriverListResponse, GetDriverListRequest>({
        query: data => `/account/driver/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getSubcribeDriver: builder.query<
        GetDriverListResponse,
        GetDriverListRequest
      >({
        query: data =>
          `/account/driver/${
            data.query.includes('&search=')
              ? `${data.query};status:<>:0`
              : `${data.query}&search=status:<>:0`
          }`,
        providesTags: [{ type: TAG }],
      }),
      getOneDriver: builder.query<GetOneDriverResponse, GetOneDriverRequest>({
        query: data => `/account/driver/${data?.id}`,
        providesTags: [{ type: TAG }],
      }),
      activeDriver: builder.mutation<ActiveDriverResponse, ActiveDriverRequest>(
        {
          query: data => ({
            url: `/account/driver/${data.driverId}/active`,
            method: 'PUT',
          }),
          invalidatesTags: [{ type: TAG }],
        },
      ),
      rejectDriver: builder.mutation<ActiveDriverRequest, RejectDriverRequest>({
        query: data => ({
          url: `/account/driver/${data.driverId}/reject`,
          method: 'PUT',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetDriverQuery,
  useGetSubcribeDriverQuery,
  useGetOneDriverQuery,
  useActiveDriverMutation,
  useRejectDriverMutation,
} = partnerApi

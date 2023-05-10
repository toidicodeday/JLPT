import { DetailsOf } from './../commonResposntType.d'
import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import { CreateForbiddenRoadType, ForbiddenRoadType } from './type'

const TAG = 'FORBIDDEN_ROAD'

export const forbiddenRoadApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getForbiddenRoad: builder.query<
        ListWithPageOf<ForbiddenRoadType>,
        { query: string } | null
      >({
        query: data => `/system/v1/admin/forbidden-road/${data?.query}`,
        providesTags: [{ type: TAG }],
      }),
      getOneForbiddenRoad: builder.query({
        query: data => `/system/v1/admin/forbidden-road/${data?.id}`,
        providesTags: [{ type: TAG }],
      }),
      createForbiddenRoad: builder.mutation<
        DetailsOf<ForbiddenRoadType>,
        CreateForbiddenRoadType
      >({
        query: data => ({
          url: `/system/v1/admin/forbidden-road/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateForbiddenRoad: builder.mutation<
        DetailsOf<ForbiddenRoadType>,
        { id: number; body: Partial<CreateForbiddenRoadType> }
      >({
        query: data => ({
          url: `/system/v1/admin/forbidden-road/${data.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteForbiddenRoad: builder.mutation({
        query: data => ({
          url: `/system/v1/admin/forbidden-road/${data.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })

export const {
  useGetForbiddenRoadQuery,
  useGetOneForbiddenRoadQuery,
  useCreateForbiddenRoadMutation,
  useUpdateForbiddenRoadMutation,
  useDeleteForbiddenRoadMutation,
} = forbiddenRoadApi

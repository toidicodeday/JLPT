import { ListWithPageOf } from '@/services/commonResposntType'
import { baseAPI } from '../baseApi'
import { SystemRole } from './types'

const TAG = 'SYSTEM_ROLES'

export const systemRoleApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getSystemRoleList: builder.query<
        ListWithPageOf<SystemRole>,
        { query: string } | void
      >({
        query: data => `/account/system-roles/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
      }),
      getSystemRoleOps: builder.query<
        { value: number; label: string }[],
        { query: string } | void
      >({
        query: data => `/account/system-roles/${data?.query || ''}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: ListWithPageOf<SystemRole>) => {
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

export const { useGetSystemRoleListQuery, useGetSystemRoleOpsQuery } =
  systemRoleApi

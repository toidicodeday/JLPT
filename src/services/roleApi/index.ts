import { ADMIN_ACC_FUNC } from './../../utils/constant/constant'
import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'
import { RoleT } from './type'

const TAG = 'ROLE'

export const roleApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getRoles: builder.query<ListWithPageOf<RoleT>, { query?: string } | void>(
        {
          query: data => `/account/system-roles/${data?.query || ''}`,
          providesTags: [{ type: TAG }],
        },
      ),
      getRolesOps: builder.query<
        { label: string; value: string | number }[],
        { query?: string } | void
      >({
        query: data => `/account/system-roles/${data?.query || ''}`,
        providesTags: [TAG, { type: TAG, id: 'option' }],
        transformResponse: (response: ListWithPageOf<RoleT>) => {
          return (
            response?.data?.map((item: any) => ({
              label: item.name,
              value: item.id,
            })) || []
          )
        },
      }),
      createRole: builder.mutation<
        { status: number },
        {
          name: string
          functionName:
            | ADMIN_ACC_FUNC.SURVEY_STAFF
            | ADMIN_ACC_FUNC.OPERATING_STAFF
            | ADMIN_ACC_FUNC.LEADER
            | null
        }
      >({
        query: data => ({
          url: `/account/system-roles/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateRole: builder.mutation<
        { status: number },
        {
          id: number
          body: {
            data: {
              id: number
              status: string
            }[]
          }
        }
      >({
        query: data => ({
          url: `/account/system-roles/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteRole: builder.mutation<{ status: number }, { id: number }>({
        query: data => ({
          url: `/account/system-roles/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
      updateRoleName: builder.mutation<
        { status: number },
        {
          id: number
          body: {
            name: string
            functionName:
              | ADMIN_ACC_FUNC.SURVEY_STAFF
              | ADMIN_ACC_FUNC.OPERATING_STAFF
              | ADMIN_ACC_FUNC.LEADER
              | null
          }
        }
      >({
        query: data => ({
          url: `/account/system-roles/update-system-role/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
    }),
  })
export const {
  useGetRolesQuery,
  useGetRolesOpsQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleNameMutation,
} = roleApi

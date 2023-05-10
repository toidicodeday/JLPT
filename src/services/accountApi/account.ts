import { ListWithPageOf } from '@/services/commonResposntType'
import { baseAPI } from '../baseApi'
import {
  CaptainAccount,
  ChangeMyPassRequest,
  CreateStaffRequest,
  CreateStaffResponse,
  GetAdminMeResponse,
  GetOneStaffModifiedResponse,
  GetOneStaffRequest,
  GetOneStaffResponse,
  GetStaffListRequest,
  GetStaffListResponse,
  UpdateMeRequest,
  UpdateStaffRequest,
} from './types'

const TAG = 'ACCOUNTS'

export const accountAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getStaff: builder.query<GetStaffListResponse, GetStaffListRequest>({
        query: data => `/account/admin/${data?.query}`,
        providesTags: result =>
          result?.data.map(u => ({ type: TAG, id: u.id })) || [{ type: TAG }],
      }),
      getOneStaff: builder.query<
        GetOneStaffModifiedResponse,
        GetOneStaffRequest
      >({
        query: data => `/account/admin/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
        transformResponse: (apiRes: GetOneStaffResponse) => {
          return {
            data: {
              id: apiRes.data?.id ? apiRes.data.id : null,
              avatar: apiRes.data?.avatar ? apiRes.data.avatar : null,
              name: apiRes.data?.name ? apiRes.data.name : '',
              email: apiRes.data?.email ? apiRes.data?.email : '',
              phone: apiRes.data?.phone
                ? apiRes.data?.phone.replace('+84', '')
                : '',
              dob: apiRes.data?.dob ? apiRes.data?.dob : null,
              gender: apiRes.data?.gender ? apiRes.data?.gender : '',
              systemRoles: apiRes.data?.systemRoles
                ? apiRes.data?.systemRoles
                : null,
              status: apiRes.data?.status ? apiRes.data?.status : null,
              addressId: apiRes?.data?.addressId,
              managingAreaId: apiRes?.data?.managingAreaId,
              created_at: apiRes?.data?.created_at,
              updated_at: apiRes?.data?.updated_at,
              isCaptain: apiRes?.data?.isCaptain,
              isSupporter: apiRes?.data?.isSupporter,
              workingAreas: apiRes?.data?.workingAreas,
            },
            status: apiRes.status,
          }
        },
      }),
      createStaff: builder.mutation<CreateStaffResponse, CreateStaffRequest>({
        query: body => ({
          url: '/account/admin',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      updateStaff: builder.mutation<CreateStaffResponse, UpdateStaffRequest>({
        query: data => ({
          url: `/account/admin/${data.id}`,
          method: 'PATCH',
          body: data.body,
        }),
        invalidatesTags: (result, err, arg) => [{ type: TAG, id: arg.id }],
      }),
      deleteStaff: builder.mutation({
        query: data => ({
          url: `/account/admin/${data.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getMe: builder.query<GetAdminMeResponse, void>({
        query: () => '/account/admin/me',
        providesTags: result => [{ type: TAG, id: result?.data.id }],
      }),
      updateMe: builder.mutation<CreateStaffResponse, UpdateMeRequest>({
        query: data => ({
          url: `/account/admin/me`,
          method: 'PATCH',
          body: data.body,
        }),
        invalidatesTags: result =>
          result?.data?.id
            ? [{ type: TAG, id: result?.data.id }]
            : [{ type: TAG }],
      }),
      changeMyPass: builder.mutation<CreateStaffResponse, ChangeMyPassRequest>({
        query: data => ({
          url: `/account/admin/change-password`,
          method: 'PATCH',
          body: data.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getCaptainList: builder.query<
        ListWithPageOf<CaptainAccount>,
        { query: string } | void
      >({
        query: data => `/account/admin/captain/${data?.query || ''}`,
        providesTags: result =>
          result?.data.map(u => ({ type: TAG, id: u.id })) || [{ type: TAG }],
      }),
      getSaleStaffQuery: builder.query<
        GetStaffListResponse,
        GetStaffListRequest
      >({
        query: data => `/account/admin/salers/${data?.query}`,
      }),
    }),
  })

export const {
  useGetStaffQuery,
  useCreateStaffMutation,
  useGetOneStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeMutation,
  useChangeMyPassMutation,
  useGetCaptainListQuery,
  useGetSaleStaffQueryQuery,
} = accountAPI

import { ContactT, CreateContactRequest, CreateContactResponse } from './types'
import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'

const TAG = 'CONTACT'

export const contactApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getContact: builder.query<ListWithPageOf<ContactT>, { query?: string }>({
        query: data => `/system/v1/admin/hotline/${data?.query || ''} `,
        providesTags: [TAG],
      }),
      getOneContact: builder.query({
        query: data => `/system/v1/admin/hotline/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createContact: builder.mutation<
        CreateContactResponse,
        Partial<Omit<ContactT, 'id'>>
      >({
        query: body => {
          return {
            url: '/system/v1/admin/hotline/',
            method: 'POST',
            body,
          }
        },
      }),
      updateContact: builder.mutation({
        query: payload => ({
          url: `/system/v1/admin/hotline/${payload?.id}`,
          method: 'PUT',
          body: payload?.data,
        }),
      }),
      deleteContact: builder.mutation({
        query: data => ({
          url: `/system/v1/admin/hotline/${data?.id}`,
          method: 'DELETE',
        }),
      }),
    }),
  })

export const {
  useGetContactQuery,
  useLazyGetContactQuery,
  useGetOneContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi

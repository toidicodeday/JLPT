import { ContractT, CreateContractResponse } from './types'
import { baseAPI } from '../baseApi'
import { ListWithPageOf, SelectOptionType } from '../commonResposntType'

const TAG = 'CONTRACT'

export const documentApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getContract: builder.query<ListWithPageOf<ContractT>, { query?: string }>(
        {
          query: data => `/account/contract/admin/${data?.query || ''} `,
          providesTags: [TAG],
        },
      ),
      getContractOps: builder.query<
        SelectOptionType[],
        { query?: string } | void
      >({
        query: data => `/account/contract/admin/${data?.query || ''}`,
        providesTags: [{ type: TAG, id: 'options' }],
        transformResponse: (apiRes: ListWithPageOf<ContractT>) => {
          return apiRes.data.map((item: ContractT) => ({
            label: item.name || '',
            value: item.id,
          }))
        },
      }),
      getOneContract: builder.query({
        query: data => `/account/contract/admin/${data?.id}`,
        providesTags: (result, error, { id }) => [{ type: TAG, id }],
      }),
      createContract: builder.mutation<
        CreateContractResponse,
        Partial<Omit<ContractT, 'id'>>
      >({
        query: body => {
          return {
            url: '/account/contract/admin/',
            method: 'POST',
            body,
          }
        },
        invalidatesTags: [{ type: TAG }],
      }),
      updateContract: builder.mutation({
        query: data => ({
          url: `/account/contract/admin/${data?.id}`,
          method: 'PUT',
          body: data?.body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      deleteContract: builder.mutation({
        query: data => ({
          url: `/account/contract/admin/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })

export const {
  useGetContractOpsQuery,
  useGetContractQuery,
  useGetOneContractQuery,
  useCreateContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
} = documentApi

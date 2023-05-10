import {
  CreateDocumentRequest,
  CreateDocumentResponse,
  DocumentT,
  UploadDocumentRequest,
  UploadDocumentResponse,
  UploadMultiDocumentRequest,
} from './types'
import { baseAPI } from '../baseApi'
import { ListWithPageOf } from '../commonResposntType'

const TAG = 'DOCUMENT'

export const documentApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getDocument: builder.query<
        ListWithPageOf<DocumentT>,
        { ref: string; refId: number; query?: string }
      >({
        query: data =>
          `/document/?ref=${data.ref}&refId=${data.refId}&${data?.query || ''}`,
        providesTags: [TAG],
      }),
      uploadDocument: builder.mutation<
        UploadDocumentResponse,
        UploadDocumentRequest
      >({
        query: data => {
          const body = new FormData()
          body.append('files', data)

          return {
            url: '/document/multiple-upload',
            method: 'POST',
            body,
          }
        },
      }),
      uploadMultiDocument: builder.mutation<
        UploadDocumentResponse,
        UploadMultiDocumentRequest
      >({
        query: data => {
          const body = new FormData()
          for (const file of data) {
            body.append('files', file, file.name)
          }

          return {
            url: '/document/multiple-upload',
            method: 'POST',
            body,
          }
        },
      }),
      createDocument: builder.mutation<
        CreateDocumentResponse,
        CreateDocumentRequest
      >({
        query: data => ({
          url: `/document/`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
  })

export const {
  useGetDocumentQuery,
  useUploadDocumentMutation,
  useCreateDocumentMutation,
  useUploadMultiDocumentMutation,
} = documentApi

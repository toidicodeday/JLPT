import { baseAPI } from '../baseApi'
import {
  CreteNewsRequest,
  GetNewsResponse,
  NewsReposone,
  NewsRequest,
} from './type'

const TAG = 'NEWS'

export const newsApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getNewsList: builder.query<GetNewsResponse, { query: string }>({
        query: data => `/news/news-api/${data?.query}`,
        providesTags: [TAG],
      }),
      createNews: builder.mutation<NewsReposone, CreteNewsRequest>({
        query: data => ({
          url: `/news/news-api/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [TAG],
      }),
      updateNews: builder.mutation<NewsReposone, NewsRequest>({
        query: data => ({
          url: `/news/news-api/${data?.id}`,
          method: 'PATCH',
          body: data?.body,
        }),
        invalidatesTags: [TAG],
      }),
      deleteNews: builder.mutation({
        query: data => ({
          url: `/news/news-api/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [TAG],
      }),
    }),
  })

export const {
  useGetNewsListQuery,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
  useCreateNewsMutation,
} = newsApi

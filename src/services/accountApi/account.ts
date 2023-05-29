import { baseAPI } from '../baseApi'

const TAG = 'ACCOUNTS'

export const accountAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({}),
  })

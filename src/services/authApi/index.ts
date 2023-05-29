import { baseAPI } from '../baseApi'

export const authAPI = baseAPI.enhanceEndpoints({
  addTagTypes: ['AUTH'],
})

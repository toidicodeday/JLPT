import { baseAPI } from '../baseApi'
import {
  ForgotPassRequestType,
  ForgotPassResponseType,
  ResetPassResponseType,
  ResetPassRequestType,
  LoginResponseType,
  LoginRequestType,
} from './types'

export const authAPI = baseAPI
  .enhanceEndpoints({
    addTagTypes: ['AUTH'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      loginAdmin: builder.mutation<LoginResponseType, LoginRequestType>({
        query: body => ({
          url: '/auth/admin/account/login',
          method: 'post',
          body,
        }),
        invalidatesTags: [{ type: 'AUTH', id: 'USER_ME' }],
      }),
      forgotPass: builder.mutation<
        ForgotPassResponseType,
        ForgotPassRequestType
      >({
        query: body => ({
          url: '/auth/admin/account/forgot-password',
          method: 'post',
          body,
        }),
      }),
      resetPass: builder.mutation<ResetPassResponseType, ResetPassRequestType>({
        query: body => ({
          url: '/auth/admin/account/reset-password',
          method: 'post',
          body,
        }),
      }),
    }),
  })

export const {
  useLoginAdminMutation,
  useForgotPassMutation,
  useResetPassMutation,
} = authAPI

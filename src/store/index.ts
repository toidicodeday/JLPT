import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { baseAPI } from '@/services/baseApi'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from '../store/authSlice/index'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseAPI.middleware),
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)

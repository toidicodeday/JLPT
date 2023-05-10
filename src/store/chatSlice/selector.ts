import type { RootState } from '@/store'

export const selectChatSlice = (state: RootState) => state.chatReducer

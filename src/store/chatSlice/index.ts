import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatState } from './types'

const initialState: ChatState = {
  userIds: [],
  channelUrl: '',
  isOpenModalChat: false,
  isReadOnly: false,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openModalChat: (
      state,
      action: PayloadAction<{
        channelUrl?: string
        userIds?: string[]
        isReadOnly?: boolean
      }>,
    ) => {
      if (action.payload.userIds) state.userIds = action.payload.userIds
      if (action.payload.channelUrl)
        state.channelUrl = action.payload.channelUrl
      state.isOpenModalChat = true
      state.isReadOnly = Boolean(action.payload.isReadOnly)
    },
    closeChatModel: state => {
      state.userIds = []
      state.isOpenModalChat = false
      state.isReadOnly = false
      state.channelUrl = 'adasd'
    },
  },
})

export const { openModalChat, closeChatModel } = chatSlice.actions

export default chatSlice.reducer

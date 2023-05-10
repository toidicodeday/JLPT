import React from 'react'
import SendbirdChat from '@sendbird/chat'
import {
  GroupChannelModule,
  MessageModule,
  ModuleNamespaces,
  PollModule,
} from '@sendbird/chat/lib/__definition'

export const SendbirdContext = React.createContext<
  | {
      sendbird: SendbirdChat &
        ModuleNamespaces<
          [...GroupChannelModule[], MessageModule, PollModule],
          MessageModule | PollModule | GroupChannelModule
        >
      connectionState: string
      latestOpenChannelUrl: string
      setLatestOpenChannelUrl: React.Dispatch<React.SetStateAction<string>>
    }
  | undefined
>(undefined)

export type SenbirdType = typeof SendbirdContext

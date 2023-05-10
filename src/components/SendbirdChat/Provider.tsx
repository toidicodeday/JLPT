import { selectUserMe } from '@/store/authSlice/selector'
import { SENDBIRD_APP_ID } from '@/utils/constant/constant'
import { getSbUserId } from '@/utils/helpers/convert.helper'
import SendbirdChat, {
  ConnectionHandler,
  ConnectionState,
} from '@sendbird/chat'
import { GroupChannelModule } from '@sendbird/chat/groupChannel'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { uuidv4 } from './helper/message.helper'
import { SendbirdContext } from './SendbirdContext'

type Props = {
  children?: React.ReactNode
}

const SendbirdProvider: React.FC<Props> = ({ children }) => {
  const sendbird = SendbirdChat.init({
    appId: SENDBIRD_APP_ID,
    modules: [new GroupChannelModule()],
  })
  const [connectionState, setConnectionState] = useState(
    sendbird.connectionState,
  )
  const [latestOpenChannelUrl, setLatestOpenChannelUrl] = useState('')
  const adminInfo = useSelector(selectUserMe)

  useEffect(() => {
    const connectionKey = uuidv4()
    const connectionHandler: ConnectionHandler = new ConnectionHandler({
      onConnected: () => setConnectionState(ConnectionState.OPEN),
      onDisconnected: () => setConnectionState(ConnectionState.CLOSED),
      onReconnectStarted: () => setConnectionState(ConnectionState.CONNECTING),
      onReconnectSucceeded: () => setConnectionState(ConnectionState.OPEN),
      onReconnectFailed: () => setConnectionState(ConnectionState.CLOSED),
    })
    sendbird.addConnectionHandler(connectionKey, connectionHandler)
    return () => sendbird.removeConnectionHandler(connectionKey)
  }, [sendbird])

  useEffect(() => {
    const connectSendbird = async () => {
      if (adminInfo?.id && sendbird.connectionState === 'CLOSED') {
        console.log('%csenbird connecting', 'background: yellow')
        sendbird.connect(getSbUserId(adminInfo.id)).then(value => {
          console.log('%csendbird connected', 'background: green', value.userId)
        })
      }
    }

    connectSendbird()
    return () => {
      sendbird.disconnect().then(() => {
        console.log('%csendbird disconnected', 'background: red')
      })
    }
  }, [adminInfo?.id, sendbird])

  return (
    <SendbirdContext.Provider
      value={{
        sendbird,
        connectionState,
        latestOpenChannelUrl,
        setLatestOpenChannelUrl,
      }}
    >
      {children}
    </SendbirdContext.Provider>
  )
}

const useSendbirdContext = () => React.useContext(SendbirdContext)

export { useSendbirdContext }

export default SendbirdProvider

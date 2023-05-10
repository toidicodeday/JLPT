import { useSendbirdContext } from '@/components/SendbirdChat'
import { useGetStaffQuery } from '@/services/accountApi/account'
import { AdminAccount } from '@/services/accountApi/types'
import { useGetMeQuery } from '@/services/accountApi/account'
import { Modal } from 'antd'
import React, {
  Ref,
  SetStateAction,
  useImperativeHandle,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { getSbUserId } from '@/utils/helpers/convert.helper'

type Props = {
  //
}

export type ModalCreateChatType = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

const ModalCreateChat = React.forwardRef(
  (props: Props, ref: Ref<ModalCreateChatType>) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const ctx = useSendbirdContext()
    const { data: accountList } = useGetStaffQuery({ query: '' })
    const { data: userMe } = useGetMeQuery()

    const startChatWith = (user: AdminAccount) => {
      console.log('start chat with', {
        user,
        connectionState: ctx?.connectionState,
        senbird: ctx?.sendbird.connectionState,
      })
      // if (!user.phone) return message.error('Người dùng không có số điện thoại')
      if (ctx?.connectionState === 'OPEN' && userMe) {
        ctx.sendbird.groupChannel
          .createChannel({
            operatorUserIds: [
              getSbUserId(userMe.data.id),
              getSbUserId(user.id),
            ],
            invitedUserIds: [getSbUserId(userMe.data.id), getSbUserId(user.id)],
            isDistinct: true,
          })
          .then(channel => {
            navigate(`/quan-ly-he-thong/chat/chi-tiet?url=${channel.url}`)
          })
      }
    }

    useImperativeHandle(ref, () => ({
      open,
      setOpen,
    }))
    return (
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Tạo cuộc hội thoại"
        footer={null}
      >
        <div className="flex flex-col gap-4">
          {accountList?.data.map(user => {
            if (user.id === userMe?.data.id) return null
            return (
              <div
                key={user.id}
                className="bg-sky-100 rounded-md p-3 hover:bg-sky-200 cursor-pointer"
                onClick={() => startChatWith(user)}
              >
                {user.name} ({getSbUserId(user.id)})
              </div>
            )
          })}
        </div>
      </Modal>
    )
  },
)

export default ModalCreateChat

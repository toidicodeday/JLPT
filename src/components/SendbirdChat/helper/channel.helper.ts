import { every } from 'lodash'
import { ACCOUNT_META, CHANNEL_ROLES_TYPE } from '../constant/sendbird.constant'

export const getChannelMetaRoles = (
  metaArray: (ACCOUNT_META | undefined)[],
) => {
  if (
    metaArray.includes(ACCOUNT_META.ADMIN) &&
    metaArray.includes(ACCOUNT_META.CUSTOMER)
  )
    return CHANNEL_ROLES_TYPE.ADMIN_CUSTOMER

  if (
    metaArray.includes(ACCOUNT_META.ADMIN) &&
    metaArray.includes(ACCOUNT_META.DRIVER)
  )
    return CHANNEL_ROLES_TYPE.ADMIN_DRIVER
  if (
    metaArray.includes(ACCOUNT_META.CUSTOMER) &&
    metaArray.includes(ACCOUNT_META.DRIVER)
  )
    return CHANNEL_ROLES_TYPE.DRIVER_CUSTOMER
  if (every(metaArray, i => i === ACCOUNT_META.ADMIN))
    return CHANNEL_ROLES_TYPE.ADMIN_ADMIN

  return CHANNEL_ROLES_TYPE.ADMIN_ADMIN
}

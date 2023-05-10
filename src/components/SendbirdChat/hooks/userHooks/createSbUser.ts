import { BodySendbirdRequired } from '@/services/commonResposntType'
import { SENDBIRD_API_TOKEN, SENDBIRD_APP_ID } from '@/utils/constant/constant'
import axios from 'axios'

export const createUserSendBird = (data: BodySendbirdRequired) => {
  var config = {
    method: 'post',
    url: `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/users`,
    headers: {
      'Api-Token': SENDBIRD_API_TOKEN,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  }
  axios(config)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

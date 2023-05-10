import { message } from 'antd'

type ResponseType<T> = {
  data?: T
  statusCode: number
}

export const handleError = function (error: any) {
  if (error.response) {
    message.warning('Existing item!')
  } else if (error.request) {
    message.error('PLC error! Please Contact the server administrator.')
  } else {
    message.error('Internal error! Please Contact the platform administrator.')
  }
}

export const handleSucces = function (data: ResponseType<any> | void, cb?: any) {
  if ((data != null) && data.statusCode.toString().startsWith('2')) {
    if (cb) {
      cb(data)
    } else {
      return data
    }
  } else if ((data != null) && data.statusCode == 204) {
    message.warning(
      'No data! The requested resource does not exist on the server.'
    )
  }
}

import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { KEYS } from '../constant/constant'

export const handleSetSortFields = (
  sortFields: Array<{ key: string; sort: null | string }>,
  currentKey: string,
  currentSort: null | string,
) => {
  return sortFields.map(field => {
    if (field.key === currentKey) {
      const newSort = () => {
        if (!currentSort) {
          return 'DESC'
        } else if (currentSort === 'DESC') {
          return 'ASC'
        } else {
          return null
        }
      }
      return {
        ...field,
        sort: newSort(),
      }
    } else {
      return {
        ...field,
        sort: null,
      }
    }
  })
}

export const handleExportFile = async (apiUrl: string) => {
  const token =
    Cookies.get(KEYS.ACCESS_TOKEN) || localStorage.getItem(KEYS.ACCESS_TOKEN)
  const headers = { 'Content-Type': 'blob', authorization: `Bearer ${token}` }
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: apiUrl,
    responseType: 'arraybuffer',
    headers,
  }
  try {
    const response = await axios(config)
    const outputFilename = `${Date.now()}.xls`
    // If you want to download file automatically using link attribute.
    const url = URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', outputFilename)
    document.body.appendChild(link)
    link.click()
  } catch (error) {}
}

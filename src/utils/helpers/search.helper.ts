import { isArray, isString } from 'lodash'

const qsAnd = (params: (string | undefined | null)[]) => {
  const searchString = params.filter(i => i).join(';')
  if (!searchString) return ''
  return '[' + searchString + ']'
}

const qsOr = (params: string[]) => {
  const searchString = params.filter(i => i).join('|')
  if (!searchString) return ''
  return '[' + searchString + ']'
}

const qsTextSearchLike = (keys: string[], value: string) => {
  const _value = value.replaceAll(/\[|\]|;/g, '')
  if (!_value) return ''

  const list = keys.map(key => {
    if (key.indexOf('phone') > 0 && _value.startsWith('0'))
      return `${key}:ilike:%${_value}%|${key}:ilike:%${_value.replace(
        '0',
        '+84',
      )}%`
    return `${key}:ilike:%${_value}%`
  })
  return qsOr(list)
}

const qsSelectInput = (
  key: string,
  values: (string | number | undefined)[],
) => {
  return qsOr(values.map(v => (v ? `${key}:=:${v}` : '')))
}

/**
 *
 * @param keys [startKey, endKey] | key
 * @param value [startDate, endDate]
 * @returns string
 */
const qsRangePicker = (
  keys: [string, string] | string,
  value: [string, string],
) => {
  if (isString(keys)) {
    return qsAnd([`${keys}:>:${value[0]}`, `${keys}:<:${value[1]}`])
  }
  if (isArray(keys)) {
    return qsOr([
      qsAnd([`${keys[0]}:<=:${value[0]}`, `${keys[1]}:>=:${value[0]}`]),
      qsAnd([`${keys[0]}:<=:${value[1]}`, `${keys[1]}:>=:${value[1]}`]),
      qsAnd([`${keys[0]}:=:null`, `${keys[1]}:=:null`]),
    ])
  }
  return ''
}

export const querySearch = {
  textInput: qsTextSearchLike,
  selectInput: qsSelectInput,
  rangePicker: qsRangePicker,
  and: qsAnd,
  or: qsOr,
}

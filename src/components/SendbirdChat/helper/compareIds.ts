type IdType = null | undefined | number | string

const isEmpty = (val: IdType) => val === null || val === undefined

// Some Ids return string and number inconsistently
// only use to comapre IDs
const compareIds = (a: IdType, b: IdType) => {
  if (isEmpty(a) || isEmpty(b)) {
    return false
  }
  const aString = a?.toString()
  const bString = b?.toString()
  return aString === bString
}

export default compareIds

export default interface User {
  id?: number
  username?: string
  email?: string
  phone?: string
  address?: string
  avatar?: string
  status?: string
  dateOfBirth?: string | null
}

export default interface Login {
  username?: string
  email?: string
  password?: string
}

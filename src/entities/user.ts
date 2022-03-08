export interface User {
  id: string
  email: string
  password: string
}

export interface AddUserProps {
  email: string
  password: string
}

export interface GetUserProps {
  id?: string
  email?: string
}

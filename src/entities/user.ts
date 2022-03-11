export interface User {
  id: string
  email: string
  password: string
}

export interface VisibleUser extends Omit<User, 'password'> {}

export interface AddUserProps {
  email: string
  password: string
}

export interface UpdateUserProps {
  id: string
  email?: string
  password?: string
}
export interface GetUserProps {
  id?: string
  email?: string
}

export interface ListUserProps {
  limit?: number
  skip?: number
}

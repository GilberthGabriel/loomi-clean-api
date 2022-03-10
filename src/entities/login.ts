import { VisibleUser } from './user';

export interface LoginUserProps {
  email: string
  password: string
}

export interface LoginUserResponse {
  jwt: string
  user: VisibleUser
}

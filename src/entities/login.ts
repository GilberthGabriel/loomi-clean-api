import { VisibleCustomer } from './customer';
import { VisibleUser } from './user';

export interface LoginProps {
  email: string
  password: string
}

export interface LoginUserResponse {
  jwt: string
  user: VisibleUser
}

export interface LoginCustomerResponse {
  jwt: string
  customer: VisibleCustomer
}

import { Role } from './role';

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  password: string
  role: Role
}

export interface VisibleCustomer extends Omit<Customer, 'password' | 'role'> { }

export interface AddCustomerProps {
  name: string
  email: string
  phone: string
  address: string
  password: string
}

export interface UpdateCustomerProps {
  id: string
  name?: string
  email?: string
  phone?: string
  address?: string
  password?: string
}

export interface GetCustomerProps {
  id?: string
  email?: string
  phone?: string
}

export interface ListCustomerProps {
  limit?: number
  skip?: number
}

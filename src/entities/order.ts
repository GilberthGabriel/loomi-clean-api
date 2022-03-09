import { Customer } from './customer';
import { Product } from './product';

export interface Order {
  id: string
  date: Date
  customerId: string
  customer?: Customer
  products?: Product[]
  status: OrderStatus,
}

export interface AddOrderProps {
  customerId: string
  productIds: string[]
}

export interface UpdateOrderProps {
  id: string
  customerId?: string
  productIds?: string[]
}

export interface GetOrderProps {
  id?: string
}

export interface ListOrderProps {
  limit?: number
  skip?: number
  customerId?: string
  productIds?: string[]
  date?: {
    gte: Date
    gt: Date
    lte: Date
    lt: Date
    eq: Date
  }
}

export enum OrderStatus {
  CREATED,
  FINISHED,
}

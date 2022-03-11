import { File } from './file';

export interface Product {
  id: string
  name: string
  price: number
  code: string
  description?: string
  image?: string
  date: Date
}

export interface AddProductProps {
  name: string
  price: number
  code: string
  description?: string
  image?: File | string
}

export interface UpdateProductProps {
  id: string
  name?: string
  code?: string
  price?: number
  description?: string
  image?: File | string
}

export interface GetProductProps {
  id?: string
  code?: string
}

export interface ListProductProps {
  limit?: number
  skip?: number
  price?: {
    gte: number
    gt: number
    lte: number
    lt: number
    eq: number
  }
  date?: {
    gte: Date
    gt: Date
    lte: Date
    lt: Date
    eq: Date
  }
}

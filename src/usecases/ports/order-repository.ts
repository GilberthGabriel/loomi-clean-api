import { EntityNotFoundError } from '../../entities/errors';
import {
  GetOrderProps,
  AddOrderProps,
  ListOrderProps,
  Order,
  AddProductsOnOrderProps,
  RemoveProductsOnOrderProps,
} from '../../entities/order';

export interface OrderRepository {
  add(data: AddOrderProps): Promise<void>
  get(data: GetOrderProps): Promise<Order | EntityNotFoundError>
  list(data: ListOrderProps): Promise<Order[]>
  addProduct(data: AddProductsOnOrderProps): Promise<Order | EntityNotFoundError>
  removeProduct(data: RemoveProductsOnOrderProps): Promise<Order | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}

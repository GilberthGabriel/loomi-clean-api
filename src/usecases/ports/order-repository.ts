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
  get(data: GetOrderProps): Promise<Order>
  list(data: ListOrderProps): Promise<Order[]>
  addProduct(data: AddProductsOnOrderProps): Promise<Order>
  removeProduct(data: RemoveProductsOnOrderProps): Promise<Order>
  delete(id: string): Promise<boolean>
}

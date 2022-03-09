import {
  GetOrderProps,
  AddOrderProps,
  ListOrderProps,
  Order,
} from '../../entities/order';

export interface OrderRepository {
  add(data: AddOrderProps): Promise<void>
  get(data: GetOrderProps): Promise<Order>
  list(data: ListOrderProps): Promise<Order[]>
  // update(data: UpdateOrderProps): Promise<Order>
  delete(id: string): Promise<boolean>
}

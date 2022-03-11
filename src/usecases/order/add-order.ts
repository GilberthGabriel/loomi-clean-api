import { Order, AddOrderProps } from '../../entities/order';
import { OrderRepository, UseCase } from '../ports';

export class AddOrder implements UseCase {
  constructor(private readonly OrderRepo: OrderRepository) { }

  async perform(data: AddOrderProps): Promise<Order> {
    return this.OrderRepo.add({
      customerId: data.customerId,
      productIds: data.productIds,
    });
  }
}

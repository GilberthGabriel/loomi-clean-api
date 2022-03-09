import { AddOrderProps } from '../../entities/Order';
import { OrderRepository, UseCase } from '../ports';

export class AddOrder implements UseCase {
  constructor(private readonly OrderRepo: OrderRepository) { }

  async perform(data: AddOrderProps): Promise<void> {
    return this.OrderRepo.add({
      customerId: data.customerId,
      productIds: data.productIds,
    });
  }
}

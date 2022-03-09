import { Order, ListOrderProps } from '../../entities/Order';
import { OrderRepository, UseCase } from '../ports';

export class ListOrder implements UseCase {
  constructor(private readonly repo: OrderRepository) { }

  async perform(data: ListOrderProps): Promise<Order[]> {
    return this.repo.list({
      skip: data.skip,
      limit: data.limit,
      date: data.date,
      customerId: data.customerId,
    });
  }
}

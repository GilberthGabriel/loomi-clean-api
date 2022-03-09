import { Order, RemoveProductsOnOrderProps } from '../../entities/Order';
import { OrderRepository, UseCase } from '../ports';

export class RemoveProductOnOrder implements UseCase {
  constructor(private readonly orderRepo: OrderRepository) { }

  async perform(data: RemoveProductsOnOrderProps): Promise<Order> {
    return this.orderRepo.removeProduct({
      id: data.id,
      products: data.products,
    });
  }
}

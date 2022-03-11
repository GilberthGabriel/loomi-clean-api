import { EntityNotFoundError } from '../../entities/errors';
import { Order, RemoveProductsOnOrderProps } from '../../entities/order';
import { OrderRepository, UseCase } from '../ports';

export class RemoveProductOnOrder implements UseCase {
  constructor(private readonly orderRepo: OrderRepository) { }

  async perform(data: RemoveProductsOnOrderProps): Promise<Order | EntityNotFoundError> {
    return this.orderRepo.removeProduct({
      id: data.id,
      products: data.products,
    });
  }
}

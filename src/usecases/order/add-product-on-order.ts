import { EntityNotFoundError } from '../../entities/errors';
import { Order, AddProductsOnOrderProps } from '../../entities/Order';
import { OrderRepository, UseCase } from '../ports';

export class AddProductOnOrder implements UseCase {
  constructor(private readonly orderRepo: OrderRepository) { }

  async perform(data: AddProductsOnOrderProps): Promise<Order | EntityNotFoundError> {
    return this.orderRepo.addProduct({
      id: data.id,
      products: data.products,
    });
  }
}

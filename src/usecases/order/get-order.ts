import { Order, GetOrderProps } from '../../entities';
import { EntityNotFoundError } from '../../entities/errors';
import { OrderRepository, UseCase } from '../ports';

export class GetOrder implements UseCase {
  constructor(private readonly repo: OrderRepository) { }

  async perform(data: GetOrderProps): Promise<Order | EntityNotFoundError> {
    return this.repo.get({ id: data.id });
  }
}

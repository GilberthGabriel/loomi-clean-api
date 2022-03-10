import { EntityNotFoundError } from '../../entities/errors';
import { OrderRepository, UseCase } from '../ports';

export class DeleteOrder implements UseCase {
  constructor(private readonly productRepo: OrderRepository) { }

  async perform(id: string): Promise<boolean | EntityNotFoundError> {
    return this.productRepo.delete(id);
  }
}

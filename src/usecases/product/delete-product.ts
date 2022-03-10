import { EntityNotFoundError } from '../../entities/errors';
import { ProductRepository, UseCase } from '../ports';

export class DeleteProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(id: string): Promise<boolean | EntityNotFoundError> {
    return this.productRepo.delete(id);
  }
}

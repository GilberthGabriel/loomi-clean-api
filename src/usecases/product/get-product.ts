import { EntityNotFoundError } from '../../entities/errors';
import { Product, GetProductProps } from '../../entities/product';
import { ProductRepository, UseCase } from '../ports';

export class GetProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(data: GetProductProps): Promise<Product | EntityNotFoundError> {
    return this.productRepo.get({
      id: data.id,
      code: data.code,
    });
  }
}

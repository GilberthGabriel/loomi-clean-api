import { Product, GetProductProps } from '../../entities/Product';
import { ProductRepository, UseCase } from '../ports';

export class GetProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(data: GetProductProps): Promise<Product> {
    return this.productRepo.get({ id: data.id });
  }
}

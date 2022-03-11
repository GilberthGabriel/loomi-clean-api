import { Product, ListProductProps } from '../../entities/product';
import { ProductRepository, UseCase } from '../ports';

export class ListProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(data: ListProductProps): Promise<Product[]> {
    return this.productRepo.list({
      skip: data.skip,
      limit: data.limit,
      price: data.price,
      date: data.date,
    });
  }
}

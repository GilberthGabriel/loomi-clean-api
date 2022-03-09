import { Product, UpdateProductProps } from '../../entities/Product';
import { ProductRepository, UseCase } from '../ports';

export class UpdateProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(data: UpdateProductProps): Promise<Product> {
    return this.productRepo.update({
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
      code: data.code,
    });
  }
}

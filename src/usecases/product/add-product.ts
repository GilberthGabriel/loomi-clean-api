import { AddProductProps } from '../../entities/Product';
import { ProductRepository, UseCase } from '../ports';

export class AddProduct implements UseCase {
  constructor(private readonly ProductRepo: ProductRepository) { }

  async perform(data: AddProductProps): Promise<void> {
    return this.ProductRepo.add({
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    });
  }
}

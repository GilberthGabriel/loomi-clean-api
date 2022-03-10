import { EntityDuplicatedError } from '../../entities/errors';
import { AddProductProps } from '../../entities/Product';
import { ProductRepository, UseCase } from '../ports';

export class AddProduct implements UseCase {
  constructor(private readonly ProductRepo: ProductRepository) { }

  async perform(data: AddProductProps): Promise<void | EntityDuplicatedError> {
    return this.ProductRepo.add({
      name: data.name,
      code: data.code,
      description: data.description,
      price: data.price,
      image: data.image,
    });
  }
}

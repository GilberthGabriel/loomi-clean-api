import { File } from '../../entities';
import { EntityDuplicatedError } from '../../entities/errors';
import { AddProductProps, Product } from '../../entities/product';
import { FileAdapter, ProductRepository, UseCase } from '../ports';

export class AddProduct implements UseCase {
  constructor(
    private readonly repo: ProductRepository,
    private readonly fileAdapter: FileAdapter,
  ) { }

  async perform(data: AddProductProps): Promise<Product | EntityDuplicatedError> {
    if (data.image) {
      data.image = await this.fileAdapter.upload(data.image as File);
    }

    return this.repo.add({
      name: data.name,
      code: data.code,
      description: data.description,
      price: data.price,
      image: data.image,
    });
  }
}

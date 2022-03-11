import { File } from '../../entities';
import { EntityNotFoundError } from '../../entities/errors';
import { Product, UpdateProductProps } from '../../entities/product';
import { FileAdapter, ProductRepository, UseCase } from '../ports';

export class UpdateProduct implements UseCase {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly fileAdapter: FileAdapter,
  ) { }

  async perform(data: UpdateProductProps): Promise<Product | EntityNotFoundError> {
    if (data.image) {
      data.image = await this.fileAdapter.upload(data.image as File);
    }

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

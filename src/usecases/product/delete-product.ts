import { ProductRepository, UseCase } from '../ports';

export class DeleteProduct implements UseCase {
  constructor(private readonly productRepo: ProductRepository) { }

  async perform(id: string): Promise<boolean> {
    return this.productRepo.delete(id);
  }
}

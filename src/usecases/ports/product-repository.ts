import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';
import {
  AddProductProps, GetProductProps, Product, ListProductProps, UpdateProductProps,
} from '../../entities/product';

export interface ProductRepository {
  add(data: AddProductProps): Promise<Product | EntityDuplicatedError>
  get(data: GetProductProps): Promise<Product | EntityNotFoundError>
  list(data: ListProductProps): Promise<Product[]>
  update(data: UpdateProductProps): Promise<Product | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}

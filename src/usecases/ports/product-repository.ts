import { EntityDuplicatedError, EntityNotFoundError } from '../../entities/errors';
import {
  AddProductProps, GetProductProps, Product, ListProductProps, UpdateProductProps,
} from '../../entities/Product';

export interface ProductRepository {
  add(data: AddProductProps): Promise<void | EntityDuplicatedError>
  get(data: GetProductProps): Promise<Product | EntityNotFoundError>
  list(data: ListProductProps): Promise<Product[]>
  update(data: UpdateProductProps): Promise<Product | EntityNotFoundError>
  delete(id: string): Promise<boolean | EntityNotFoundError>
}

import {
  AddProductProps, GetProductProps, Product, ListProductProps, UpdateProductProps,
} from '../../entities/Product';

export interface ProductRepository {
  add(data: AddProductProps): Promise<void>
  get(data: GetProductProps): Promise<Product>
  list(data: ListProductProps): Promise<Product[]>
  update(data: UpdateProductProps): Promise<Product>
  delete(id: string): Promise<boolean>
}

import { PrismaClient } from '@prisma/client';
import {
  AddProductProps, GetProductProps, ListProductProps, UpdateProductProps, Product,
} from '../../../entities/product';
import { ProductRepository } from '../../../usecases/ports/product-repository';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) { }

  private parseProduct(product: any): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description!,
      price: Number(product.price),
      date: product.createdAt,
    };
  }

  async add(data: AddProductProps): Promise<void> {
    await this.prisma.product.create({ data });
  }

  async get(data: GetProductProps): Promise<Product> {
    const productModel = await this.prisma.product.findUnique({ where: { id: data.id } });
    if (!productModel) {
      throw new Error();
    }

    return this.parseProduct(productModel);
  }

  async list(data: ListProductProps): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      skip: data.skip,
      take: data.limit,
      where: {
        createdAt: data.date,
        price: data.price,
      },
    });

    return products.map(this.parseProduct);
  }

  async update(data: UpdateProductProps): Promise<Product> {
    const productModel = await this.prisma.product.update({ where: { id: data.id }, data });
    return this.parseProduct(productModel);
  }

  async delete(productId: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({ where: { id: productId } });
      return true;
    } catch (err) {
      return false;
    }
  }
}

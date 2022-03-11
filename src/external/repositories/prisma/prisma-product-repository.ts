import { Prisma, PrismaClient } from '@prisma/client';
import { EntityDuplicatedError, EntityNotFoundError } from '../../../entities/errors';
import {
  AddProductProps, GetProductProps, ListProductProps, UpdateProductProps, Product,
} from '../../../entities/product';
import { ProductRepository } from '../../../usecases/ports/product-repository';
import { PrismaErrors } from './helper';

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) { }

  static parseProduct(product: any): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description!,
      price: Number(product.price),
      date: product.createdAt,
      code: product.code,
    };
  }

  async add(data: AddProductProps): Promise<Product | EntityDuplicatedError> {
    try {
      const product = await this.prisma.product.create({ data });
      return PrismaProductRepository.parseProduct(product);
    } catch (e) {
      let key: string = '';
      if (
        e instanceof Prisma.PrismaClientKnownRequestError
        && e.code === PrismaErrors.UNIQUE_CONSTRAINT_FAIL
      ) {
        key = e.meta as any;
      }

      return new EntityDuplicatedError(key);
    }
  }

  async get(data: GetProductProps): Promise<Product | EntityNotFoundError> {
    const productModel = await this.prisma.product.findUnique({
      where: {
        id: data.id,
        code: data.code,
      },
    });

    if (!productModel) {
      return new EntityNotFoundError();
    }

    return PrismaProductRepository.parseProduct(productModel);
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

    return products.map(PrismaProductRepository.parseProduct);
  }

  async update(data: UpdateProductProps): Promise<Product | EntityNotFoundError> {
    try {
      const productModel = await this.prisma.product.update({ where: { id: data.id }, data });
      return PrismaProductRepository.parseProduct(productModel);
    } catch (e) {
      return new EntityNotFoundError();
    }
  }

  async delete(productId: string): Promise<boolean | EntityNotFoundError> {
    try {
      await this.prisma.product.delete({ where: { id: productId } });
      return true;
    } catch (err) {
      return new EntityNotFoundError();
    }
  }
}

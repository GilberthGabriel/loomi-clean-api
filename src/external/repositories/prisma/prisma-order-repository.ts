import { PrismaClient } from '@prisma/client';
import {
  AddOrderProps,
  AddProductsOnOrderProps,
  GetOrderProps,
  ListOrderProps,
  Order,
  OrderStatus,
  RemoveProductsOnOrderProps,
} from '../../../entities';
import { OrderRepository } from '../../../usecases/ports/order-repository';
import { PrismaProductRepository } from './prisma-product-repository';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(data: AddOrderProps): Promise<void> {
    const products = data.productIds.map((productId) => ({ productId }));
    await this.prisma.order.create({
      data: {
        customerId: data.customerId,
        ProductsOnOrder: { create: products },
      },
    });
  }

  async get(data: GetOrderProps): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: data.id },
      include: { ProductsOnOrder: { include: { product: true } } },
    });

    if (!order) {
      throw new Error();
    }

    return {
      id: order.id,
      status: OrderStatus[order.status],
      date: order.createdAt,
      customerId: order.customerId,
      products: order.ProductsOnOrder.map((orderLine) => {
        const product = PrismaProductRepository.parseProduct(orderLine.product);
        return product;
      }),
    };
  }

  async list(data: ListOrderProps): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      skip: data.skip,
      take: data.limit,
      where: {
        customerId: data.customerId,
        createdAt: data.date,
      },
      include: { ProductsOnOrder: { include: { product: true } } },
    });

    return orders.map((order) => ({
      id: order.id,
      status: OrderStatus[order.status],
      date: order.createdAt,
      customerId: order.customerId,
      products: order.ProductsOnOrder.map((orderLine) => {
        const product = PrismaProductRepository.parseProduct(orderLine.product);
        return product;
      }),
    }));
  }

  async addProduct(data: AddProductsOnOrderProps): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { id: data.id },
      data: {
        ProductsOnOrder: {
          create: data.products.map((item) => ({ product: { connect: { id: item.id } } })),
        },
      },
      include: { ProductsOnOrder: { include: { product: true } } },
    });

    return {
      id: order.id,
      status: OrderStatus[order.status],
      date: order.createdAt,
      customerId: order.customerId,
      products: order.ProductsOnOrder.map((orderLine) => {
        const product = PrismaProductRepository.parseProduct(orderLine.product);
        return product;
      }),
    };
  }

  async removeProduct(data: RemoveProductsOnOrderProps): Promise<Order> {
    const order = await this.prisma.order.update({
      where: { id: data.id },
      data: {
        ProductsOnOrder: { deleteMany: data.products.map((item) => ({ productId: item.id })) },
      },
      include: { ProductsOnOrder: { include: { product: true } } },
    });

    return {
      id: order.id,
      status: OrderStatus[order.status],
      date: order.createdAt,
      customerId: order.customerId,
      products: order.ProductsOnOrder.map((orderLine) => {
        const product = PrismaProductRepository.parseProduct(orderLine.product);
        return product;
      }),
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.order.delete({ where: { id } });
      return true;
    } catch (err) {
      return false;
    }
  }
}

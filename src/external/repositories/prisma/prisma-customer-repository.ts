import { PrismaClient } from '@prisma/client';
import {
  AddCustomerProps, Customer, GetCustomerProps, ListCustomerProps, UpdateCustomerProps,
} from '../../../entities/customer';
import { CustomerRepository } from '../../../usecases/ports';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(data: AddCustomerProps): Promise<void> {
    await this.prisma.customer.create({ data });
  }

  async get(data: GetCustomerProps): Promise<Customer> {
    const userModel = await this.prisma.customer.findUnique({
      where: {
        id: data.id,
        email: data.email,
        phone: data.phone,
      },
    });

    if (!userModel) {
      throw new Error();
    }

    return userModel;
  }

  async list(data: ListCustomerProps): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      skip: data.skip,
      take: data.limit,
    });
  }

  async update(data: UpdateCustomerProps): Promise<Customer> {
    return this.prisma.customer.update({ where: { id: data.id }, data });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.customer.delete({ where: { id } });
      return true;
    } catch (err) {
      return false;
    }
  }
}

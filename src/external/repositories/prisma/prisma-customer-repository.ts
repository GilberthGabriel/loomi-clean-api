import { Prisma, PrismaClient } from '@prisma/client';
import {
  AddCustomerProps, Customer, GetCustomerProps, ListCustomerProps, UpdateCustomerProps,
} from '../../../entities/customer';
import { EntityDuplicatedError, EntityNotFoundError } from '../../../entities/errors';
import { CustomerRepository } from '../../../usecases/ports';
import { PrismaErrors } from './helper';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(data: AddCustomerProps): Promise<void | EntityDuplicatedError> {
    try {
      await this.prisma.customer.create({ data });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError
        && e.code === PrismaErrors.UNIQUE_CONSTRAINT_FAIL
      ) {
        const meta = e.meta as any;
        return new EntityDuplicatedError(meta.target && meta.target[0]);
      }
    }
  }

  async get(data: GetCustomerProps): Promise<Customer | EntityNotFoundError> {
    const userModel = await this.prisma.customer.findUnique({
      where: {
        id: data.id,
        email: data.email,
        phone: data.phone,
      },
    });

    if (!userModel) {
      return new EntityNotFoundError();
    }

    return userModel;
  }

  async list(data: ListCustomerProps): Promise<Customer[]> {
    return this.prisma.customer.findMany({
      skip: data.skip,
      take: data.limit,
    });
  }

  async update(data: UpdateCustomerProps): Promise<Customer | EntityNotFoundError> {
    try {
      return await this.prisma.customer.update({ where: { id: data.id }, data });
    } catch (e) {
      return new EntityNotFoundError();
    }
  }

  async delete(id: string): Promise<boolean | EntityNotFoundError> {
    try {
      await this.prisma.customer.delete({ where: { id } });
      return true;
    } catch (e) {
      return new EntityNotFoundError();
    }
  }
}

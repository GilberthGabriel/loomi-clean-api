import { Prisma, PrismaClient } from '@prisma/client';
import {
  AddCustomerProps,
  Customer,
  GetCustomerProps,
  ListCustomerProps,
  UpdateCustomerProps,
  VisibleCustomer,
} from '../../../entities/customer';

import {
  EntityDuplicatedError,
  EntityNotFoundError,
} from '../../../entities/errors';

import { CustomerRepository } from '../../../usecases/ports';
import { PrismaErrors } from './helper';

const visibleFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  phone: true,
  name: true,
  address: true,
};
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

  async getVisible(data: GetCustomerProps): Promise<VisibleCustomer | EntityNotFoundError> {
    const userModel = await this.prisma.customer.findUnique({
      where: {
        id: data.id,
        email: data.email,
        phone: data.phone,
      },
      select: visibleFields,
    });

    if (!userModel) {
      return new EntityNotFoundError();
    }

    return userModel;
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

  async list(data: ListCustomerProps): Promise<VisibleCustomer[]> {
    return this.prisma.customer.findMany({
      skip: data.skip,
      take: data.limit,
      select: visibleFields,
    });
  }

  async update(data: UpdateCustomerProps): Promise<VisibleCustomer | EntityNotFoundError> {
    try {
      return await this.prisma.customer.update({
        where: { id: data.id },
        data,
        select: visibleFields,
      });
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

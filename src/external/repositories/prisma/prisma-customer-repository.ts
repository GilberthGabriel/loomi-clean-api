import { Prisma, PrismaClient } from '@prisma/client';
import { Role } from '../../../entities';
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

  async add(data: AddCustomerProps): Promise<VisibleCustomer | EntityDuplicatedError> {
    try {
      const customer = await this.prisma.customer.create({ data, select: visibleFields });
      return customer;
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
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: data.id,
        email: data.email,
        phone: data.phone,
      },
    });

    if (!customer) {
      return new EntityNotFoundError();
    }

    return {
      ...customer,
      role: Role[customer.role],
    };
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

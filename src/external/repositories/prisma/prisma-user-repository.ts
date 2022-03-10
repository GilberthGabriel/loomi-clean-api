import { Prisma, PrismaClient } from '@prisma/client';
import { EntityDuplicatedError, EntityNotFoundError } from '../../../entities/errors';
import {
  AddUserProps, GetUserProps, ListUserProps, UpdateUserProps, User,
} from '../../../entities/user';
import { UserRepository } from '../../../usecases/ports/user-repository';
import { PrismaErrors } from './helper';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(userData: AddUserProps): Promise<void | EntityDuplicatedError> {
    try {
      await this.prisma.user.create({ data: userData });
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

  async get(userData: GetUserProps): Promise<User | EntityNotFoundError> {
    const userModel = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
        email: userData.email,
      },
    });

    if (!userModel) {
      return new EntityNotFoundError();
    }

    return userModel;
  }

  async list(data: ListUserProps): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: data.skip,
      take: data.limit,
    });
  }

  async update(userData: UpdateUserProps): Promise<User | EntityNotFoundError> {
    try {
      return await this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          email: userData.email,
          password: userData.password,
        },
      });
    } catch (e) {
      return new EntityNotFoundError();
    }
  }

  async delete(userId: string): Promise<boolean | EntityNotFoundError> {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
      return true;
    } catch (err) {
      return new EntityNotFoundError();
    }
  }
}

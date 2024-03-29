import { Prisma, PrismaClient } from '@prisma/client';
import { Role } from '../../../entities';
import { EntityDuplicatedError, EntityNotFoundError } from '../../../entities/errors';
import {
  AddUserProps, GetUserProps, ListUserProps, UpdateUserProps, User, VisibleUser,
} from '../../../entities/user';
import { UserRepository } from '../../../usecases/ports/user-repository';
import { PrismaErrors } from './helper';

const visibleFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
  email: true,
};
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(userData: AddUserProps): Promise<VisibleUser | EntityDuplicatedError> {
    try {
      return await this.prisma.user.create({ data: userData, select: visibleFields });
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

  async getVisible(userData: GetUserProps): Promise<VisibleUser | EntityNotFoundError> {
    const userModel = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
        email: userData.email,
      },
      select: visibleFields,
    });

    if (!userModel) {
      return new EntityNotFoundError();
    }

    return userModel;
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

    return {
      ...userModel,
      role: Role[userModel.role],
    };
  }

  async list(data: ListUserProps): Promise<VisibleUser[]> {
    return this.prisma.user.findMany({
      skip: data.skip,
      take: data.limit,
      select: visibleFields,
    });
  }

  async update(userData: UpdateUserProps): Promise<VisibleUser | EntityNotFoundError> {
    try {
      return await this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          email: userData.email,
          password: userData.password,
        },
        select: visibleFields,
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

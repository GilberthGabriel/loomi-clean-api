import { PrismaClient } from '@prisma/client';
import {
  AddUserProps, GetUserProps, ListUserProps, UpdateUserProps, User,
} from '../../../entities/user';
import { UserRepository } from '../../../usecases/ports/user-repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async add(userData: AddUserProps): Promise<void> {
    await this.prisma.user.create({
      data: userData,
    });
  }

  async get(userData: GetUserProps): Promise<User> {
    const userModel = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
        email: userData.email,
      },
    });

    if (!userModel) {
      throw new Error();
    }

    return userModel;
  }

  async list(data: ListUserProps): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: data.skip,
      take: data.limit,
    });
  }

  async update(userData: UpdateUserProps): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        email: userData.email,
        password: userData.password,
      },
    });
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
      return true;
    } catch (err) {
      return false;
    }
  }
}

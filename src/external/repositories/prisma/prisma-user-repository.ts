import { PrismaClient } from '@prisma/client';
import { AddUserProps, GetUserProps, User } from '../../../entities/user';
import { UserRepository } from '../../../usecases/ports/user-repository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

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

  async list(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

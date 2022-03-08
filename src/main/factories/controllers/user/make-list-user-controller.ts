import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { ListUserController } from '../../../../presentation/controllers/user';
import { ListUser } from '../../../../usecases/user';

export const makeListUserController = (): ListUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new ListUser(userRepo);
  return new ListUserController(useCase);
};

import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { AddUserController } from '../../../../presentation/controllers/user';
import { AddUser } from '../../../../usecases/user';

export const makeAddUserController = (): AddUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new AddUser(userRepo);
  return new AddUserController(useCase);
};

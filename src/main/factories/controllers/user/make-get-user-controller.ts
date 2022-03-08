import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { GetUserController } from '../../../../presentation/controllers/user';
import { GetUser } from '../../../../usecases/user';

export const makeGetUserController = (): GetUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new GetUser(userRepo);
  return new GetUserController(useCase);
};

import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { UpdateUserController } from '../../../../presentation/controllers/user';
import { UpdateUser } from '../../../../usecases/user';

export const makeUpdateController = (): UpdateUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new UpdateUser(userRepo);
  return new UpdateUserController(useCase);
};

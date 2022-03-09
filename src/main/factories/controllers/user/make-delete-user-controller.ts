import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { DeleteUserController } from '../../../../presentation/controllers/user';
import { DeleteUser } from '../../../../usecases/user';

export const makeDeleteUserController = (): DeleteUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new DeleteUser(userRepo);
  return new DeleteUserController(useCase);
};

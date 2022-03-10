import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { JoiUpdateUserValidator } from '../../../../external/validators/joi';
import { UpdateUserController } from '../../../../presentation/controllers/user';
import { UpdateUser } from '../../../../usecases/user';

export const makeUpdateUserController = (): UpdateUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new UpdateUser(userRepo);
  const validator = new JoiUpdateUserValidator();
  return new UpdateUserController(useCase, validator);
};

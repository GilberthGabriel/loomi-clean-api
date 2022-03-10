import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { JoiGetUserValidator } from '../../../../external/validators/joi';
import { GetUserController } from '../../../../presentation/controllers/user';
import { GetUser } from '../../../../usecases/user';

export const makeGetUserController = (): GetUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new GetUser(userRepo);
  const validator = new JoiGetUserValidator();
  return new GetUserController(useCase, validator);
};

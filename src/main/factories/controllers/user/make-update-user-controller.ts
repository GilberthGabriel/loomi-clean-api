import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { JoiUpdateUserValidator } from '../../../../external/validators/joi';
import { UpdateUserController } from '../../../../presentation/controllers/user';
import { UpdateUser } from '../../../../usecases/user';

export const makeUpdateUserController = (): UpdateUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const useCase = new UpdateUser(userRepo, passwordAdapter);
  const validator = new JoiUpdateUserValidator();
  return new UpdateUserController(useCase, validator);
};

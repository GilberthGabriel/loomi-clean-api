import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { PrismaUserRepository } from '../../../../external/repositories/prisma';
import { JoiLoginUserValidator } from '../../../../external/validators/joi/login';
import { LoginUserController } from '../../../../presentation/controllers/login';
import { LoginUser } from '../../../../usecases/login';

export const makeLoginUserController = (): LoginUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const useCase = new LoginUser(userRepo, passwordAdapter);
  const validator = new JoiLoginUserValidator();
  return new LoginUserController(useCase, validator);
};

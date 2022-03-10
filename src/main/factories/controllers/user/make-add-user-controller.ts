import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../../../external/repositories/prisma/prisma-user-repository';
import { JoiAddUserValidator } from '../../../../external/validators/joi';
import { AddUserController } from '../../../../presentation/controllers/user';
import { AddUser } from '../../../../usecases/user';

export const makeAddUserController = (): AddUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const useCase = new AddUser(userRepo);
  const validator = new JoiAddUserValidator();
  return new AddUserController(useCase, validator);
};

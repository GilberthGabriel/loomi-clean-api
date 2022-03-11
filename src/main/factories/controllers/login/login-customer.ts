import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiLoginValidator } from '../../../../external/validators/joi/login';
import { LoginCustomerController } from '../../../../presentation/controllers/login';
import { LoginCustomer } from '../../../../usecases/login';

export const makeLoginCustomerController = (): LoginCustomerController => {
  const prisma = new PrismaClient();
  const repo = new PrismaCustomerRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const useCase = new LoginCustomer(repo, passwordAdapter);
  const validator = new JoiLoginValidator();
  return new LoginCustomerController(useCase, validator);
};

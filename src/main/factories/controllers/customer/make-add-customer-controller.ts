import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiAddCustomerValidator } from '../../../../external/validators/joi';
import { AddCustomerController } from '../../../../presentation/controllers/customer';
import { AddCustomer } from '../../../../usecases/customer';

export const makeAddCustomerController = (): AddCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const useCase = new AddCustomer(userRepo, passwordAdapter);
  const validator = new JoiAddCustomerValidator();
  return new AddCustomerController(useCase, validator);
};

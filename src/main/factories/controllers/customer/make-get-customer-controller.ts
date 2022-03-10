import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiGetCustomerValidator } from '../../../../external/validators/joi';
import { GetCustomerController } from '../../../../presentation/controllers/customer';
import { GetCustomer } from '../../../../usecases/customer';

export const makeGetCustomerController = (): GetCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new GetCustomer(userRepo);
  const validator = new JoiGetCustomerValidator();
  return new GetCustomerController(useCase, validator);
};

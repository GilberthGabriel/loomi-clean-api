import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiUpdateCustomerValidator } from '../../../../external/validators/joi';
import { UpdateCustomerController } from '../../../../presentation/controllers/customer';
import { UpdateCustomer } from '../../../../usecases/customer';

export const makeUpdateCustomerController = (): UpdateCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new UpdateCustomer(userRepo);
  const validator = new JoiUpdateCustomerValidator();
  return new UpdateCustomerController(useCase, validator);
};

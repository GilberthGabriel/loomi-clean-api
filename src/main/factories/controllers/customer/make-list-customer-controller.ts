import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiListCustomerValidator } from '../../../../external/validators/joi';
import { ListCustomerController } from '../../../../presentation/controllers/customer';
import { ListCustomer } from '../../../../usecases/customer';

export const makeListCustomerController = (): ListCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new ListCustomer(userRepo);
  const validator = new JoiListCustomerValidator();
  return new ListCustomerController(useCase, validator);
};

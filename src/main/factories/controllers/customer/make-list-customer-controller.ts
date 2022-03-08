import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { ListCustomerController } from '../../../../presentation/controllers/customer';
import { ListCustomer } from '../../../../usecases/customer';

export const makeListCustomerController = (): ListCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new ListCustomer(userRepo);
  return new ListCustomerController(useCase);
};

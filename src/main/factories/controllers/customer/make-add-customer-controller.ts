import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { AddCustomerController } from '../../../../presentation/controllers/customer';
import { AddCustomer } from '../../../../usecases/customer';

export const makeAddCustomerController = (): AddCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new AddCustomer(userRepo);
  return new AddCustomerController(useCase);
};

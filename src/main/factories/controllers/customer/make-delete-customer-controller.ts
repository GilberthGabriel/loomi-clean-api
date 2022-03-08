import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { DeleteCustomerController } from '../../../../presentation/controllers/customer';
import { DeleteCustomer } from '../../../../usecases/customer';

export const makeDeleteCustomerController = (): DeleteCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new DeleteCustomer(userRepo);
  return new DeleteCustomerController(useCase);
};

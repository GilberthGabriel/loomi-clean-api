import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { GetCustomerController } from '../../../../presentation/controllers/customer';
import { GetCustomer } from '../../../../usecases/customer';

export const makeGetCustomerController = (): GetCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new GetCustomer(userRepo);
  return new GetCustomerController(useCase);
};

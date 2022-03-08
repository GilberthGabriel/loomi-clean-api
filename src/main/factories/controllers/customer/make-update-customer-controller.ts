import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { UpdateCustomerController } from '../../../../presentation/controllers/customer';
import { UpdateCustomer } from '../../../../usecases/customer';

export const makeUpdateCustomerController = (): UpdateCustomerController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaCustomerRepository(prisma);
  const useCase = new UpdateCustomer(userRepo);
  return new UpdateCustomerController(useCase);
};

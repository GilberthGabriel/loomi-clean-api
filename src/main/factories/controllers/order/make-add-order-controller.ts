import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { AddOrderController } from '../../../../presentation/controllers/Order';
import { AddOrder } from '../../../../usecases/Order';

export const makeAddOrderController = (): AddOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new AddOrder(repo);
  return new AddOrderController(useCase);
};

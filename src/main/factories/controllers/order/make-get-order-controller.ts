import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { GetOrderController } from '../../../../presentation/controllers/order';
import { GetOrder } from '../../../../usecases/order';

export const makeGetOrderController = (): GetOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new GetOrder(repo);
  return new GetOrderController(useCase);
};

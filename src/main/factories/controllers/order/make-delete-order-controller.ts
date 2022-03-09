import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { DeleteOrderController } from '../../../../presentation/controllers/order';
import { DeleteOrder } from '../../../../usecases/order';

export const makeDeleteOrderController = (): DeleteOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new DeleteOrder(repo);
  return new DeleteOrderController(useCase);
};

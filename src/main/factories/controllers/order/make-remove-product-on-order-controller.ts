import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { RemoveProductOnOrderController } from '../../../../presentation/controllers/order';
import { RemoveProductOnOrder } from '../../../../usecases/order';

export const makeRemoveProductOnOrderController = (): RemoveProductOnOrderController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaOrderRepository(prisma);
  const useCase = new RemoveProductOnOrder(userRepo);
  return new RemoveProductOnOrderController(useCase);
};

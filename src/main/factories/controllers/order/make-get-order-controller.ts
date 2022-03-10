import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { JoiGetOrderValidator } from '../../../../external/validators/joi/order';
import { GetOrderController } from '../../../../presentation/controllers/order';
import { GetOrder } from '../../../../usecases/order';

export const makeGetOrderController = (): GetOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new GetOrder(repo);
  const validator = new JoiGetOrderValidator();
  return new GetOrderController(useCase, validator);
};

import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { JoiAddOrderValidator } from '../../../../external/validators/joi/order';
import { AddOrderController } from '../../../../presentation/controllers/Order';
import { AddOrder } from '../../../../usecases/Order';

export const makeAddOrderController = (): AddOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new AddOrder(repo);
  const validator = new JoiAddOrderValidator();
  return new AddOrderController(useCase, validator);
};

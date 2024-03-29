import { PrismaClient } from '@prisma/client';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { JoiAddProductOnOrder } from '../../../../external/validators/joi/order';
import { AddProductOnOrderController } from '../../../../presentation/controllers/order';
import { AddProductOnOrder } from '../../../../usecases/order';

export const makeAddProductOnOrderController = (): AddProductOnOrderController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaOrderRepository(prisma);
  const useCase = new AddProductOnOrder(userRepo);
  const validator = new JoiAddProductOnOrder();
  return new AddProductOnOrderController(useCase, validator);
};

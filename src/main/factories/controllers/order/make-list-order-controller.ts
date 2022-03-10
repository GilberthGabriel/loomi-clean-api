import { PrismaClient } from '@prisma/client';
import { QsQueryConverter } from '../../../../external/libs/node/qs-query-converter';
import { PrismaOrderRepository } from '../../../../external/repositories/prisma';
import { JoiListOrderValidator } from '../../../../external/validators/joi/order';
import { ListOrderController } from '../../../../presentation/controllers/Order';
import { ListOrder } from '../../../../usecases/Order';

export const makeListOrderController = (): ListOrderController => {
  const prisma = new PrismaClient();
  const repo = new PrismaOrderRepository(prisma);
  const useCase = new ListOrder(repo);
  const queryConverter = new QsQueryConverter();
  const validator = new JoiListOrderValidator();
  return new ListOrderController(useCase, queryConverter, validator);
};

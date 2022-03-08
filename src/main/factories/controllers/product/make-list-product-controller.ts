import { PrismaClient } from '@prisma/client';
import { QsQueryConverter } from '../../../../external/libs/node/qs-query-converter';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { ListProductController } from '../../../../presentation/controllers/Product';
import { ListProduct } from '../../../../usecases/Product';

export const makeListProductController = (): ListProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new ListProduct(userRepo);
  const queryConverter = new QsQueryConverter();
  return new ListProductController(useCase, queryConverter);
};

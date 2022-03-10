import { PrismaClient } from '@prisma/client';
import { JoiListProductValidator } from '../../../../external/validators/joi/product';
import { QsQueryConverter } from '../../../../external/libs/node/qs-query-converter';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { ListProductController } from '../../../../presentation/controllers/Product';
import { ListProduct } from '../../../../usecases/Product';

export const makeListProductController = (): ListProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new ListProduct(userRepo);
  const queryConverter = new QsQueryConverter();
  const validator = new JoiListProductValidator();
  return new ListProductController(useCase, queryConverter, validator);
};

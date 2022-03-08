import { PrismaClient } from '@prisma/client';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { GetProductController } from '../../../../presentation/controllers/Product';
import { GetProduct } from '../../../../usecases/Product';

export const makeGetProductController = (): GetProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new GetProduct(userRepo);
  return new GetProductController(useCase);
};

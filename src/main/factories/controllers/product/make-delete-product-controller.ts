import { PrismaClient } from '@prisma/client';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { DeleteProductController } from '../../../../presentation/controllers/Product';
import { DeleteProduct } from '../../../../usecases/Product';

export const makeDeleteProductController = (): DeleteProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new DeleteProduct(userRepo);
  return new DeleteProductController(useCase);
};

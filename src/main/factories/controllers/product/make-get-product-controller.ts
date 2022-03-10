import { PrismaClient } from '@prisma/client';
import { JoiGetProductValidator } from '../../../../external/validators/joi/product';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { GetProductController } from '../../../../presentation/controllers/Product';
import { GetProduct } from '../../../../usecases/Product';

export const makeGetProductController = (): GetProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new GetProduct(userRepo);
  const validator = new JoiGetProductValidator();
  return new GetProductController(useCase, validator);
};

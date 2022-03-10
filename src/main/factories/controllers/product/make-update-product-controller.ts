import { PrismaClient } from '@prisma/client';
import { JoiUpdateProductValidator } from '../../../../external/validators/joi/product';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { UpdateProductController } from '../../../../presentation/controllers/Product';
import { UpdateProduct } from '../../../../usecases/Product';

export const makeUpdateProductController = (): UpdateProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new UpdateProduct(userRepo);
  const validator = new JoiUpdateProductValidator();
  return new UpdateProductController(useCase, validator);
};

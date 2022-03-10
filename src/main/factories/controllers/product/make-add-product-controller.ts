import { PrismaClient } from '@prisma/client';
import { JoiAddProductValidator } from '../../../../external/validators/joi/product';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { AddProductController } from '../../../../presentation/controllers/product';
import { AddProduct } from '../../../../usecases/product';

export const makeAddProductController = (): AddProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const useCase = new AddProduct(userRepo);
  const validator = new JoiAddProductValidator();
  return new AddProductController(useCase, validator);
};

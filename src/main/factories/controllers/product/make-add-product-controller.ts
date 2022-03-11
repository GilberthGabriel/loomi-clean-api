import { PrismaClient } from '@prisma/client';
import { JoiAddProductValidator } from '../../../../external/validators/joi/product';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { AddProductController } from '../../../../presentation/controllers/product';
import { AddProduct } from '../../../../usecases/product';
import { UuidV4Adapter } from '../../../../external/libs/uuid';
import { S3FileAdapter } from '../../../../external/services';
import Envs from '../../../../shared/envs';
import { MimeAdapter } from '../../../../external/libs/mime';

export const makeAddProductController = (): AddProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const uuidAdapter = new UuidV4Adapter();
  const fileAdapter = new S3FileAdapter(Envs.AWS_BUCKET_NAME, uuidAdapter);
  const useCase = new AddProduct(userRepo, fileAdapter);
  const validator = new JoiAddProductValidator();
  const mimeAdapter = new MimeAdapter();
  return new AddProductController(useCase, validator, mimeAdapter);
};

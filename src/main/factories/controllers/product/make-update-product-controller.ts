import { PrismaClient } from '@prisma/client';
import { JoiUpdateProductValidator } from '../../../../external/validators/joi/product';
import { PrismaProductRepository } from '../../../../external/repositories/prisma';
import { UpdateProductController } from '../../../../presentation/controllers/Product';
import { UpdateProduct } from '../../../../usecases/Product';
import { UuidV4Adapter } from '../../../../external/libs/uuid';
import { S3FileAdapter } from '../../../../external/services';
import Envs from '../../../../shared/envs';
import { MimeAdapter } from '../../../../external/libs/mime';

export const makeUpdateProductController = (): UpdateProductController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaProductRepository(prisma);
  const uuidAdapter = new UuidV4Adapter();
  const fileAdapter = new S3FileAdapter(Envs.AWS_BUCKET_NAME, uuidAdapter);
  const useCase = new UpdateProduct(userRepo, fileAdapter);
  const validator = new JoiUpdateProductValidator();
  const mimeAdapter = new MimeAdapter();
  return new UpdateProductController(useCase, validator, mimeAdapter);
};

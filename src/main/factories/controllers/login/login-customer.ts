import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { JsonWebTokenAdapter } from '../../../../external/libs/jwt/json-web-token-adapter';
import { PrismaCustomerRepository } from '../../../../external/repositories/prisma';
import { JoiLoginValidator } from '../../../../external/validators/joi/login';
import { LoginCustomerController } from '../../../../presentation/controllers/login';
import Envs from '../../../../shared/envs';
import { LoginCustomer } from '../../../../usecases/login';

export const makeLoginCustomerController = (): LoginCustomerController => {
  const prisma = new PrismaClient();
  const repo = new PrismaCustomerRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const jwtAdapter = new JsonWebTokenAdapter(Envs.JWT_SECRET);
  const useCase = new LoginCustomer(repo, passwordAdapter, jwtAdapter);
  const validator = new JoiLoginValidator();
  return new LoginCustomerController(useCase, validator);
};

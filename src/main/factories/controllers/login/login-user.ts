import { PrismaClient } from '@prisma/client';
import { BcryptPasswordAdapter } from '../../../../external/libs/bcrypt';
import { JsonWebTokenAdapter } from '../../../../external/libs/jwt/json-web-token-adapter';
import { PrismaUserRepository } from '../../../../external/repositories/prisma';
import { JoiLoginValidator } from '../../../../external/validators/joi/login';
import { LoginUserController } from '../../../../presentation/controllers/login';
import Envs from '../../../../shared/envs';
import { LoginUser } from '../../../../usecases/login';

export const makeLoginUserController = (): LoginUserController => {
  const prisma = new PrismaClient();
  const userRepo = new PrismaUserRepository(prisma);
  const passwordAdapter = new BcryptPasswordAdapter();
  const jwtAdapter = new JsonWebTokenAdapter(Envs.JWT_SECRET);
  const useCase = new LoginUser(userRepo, passwordAdapter, jwtAdapter);
  const validator = new JoiLoginValidator();
  return new LoginUserController(useCase, validator);
};

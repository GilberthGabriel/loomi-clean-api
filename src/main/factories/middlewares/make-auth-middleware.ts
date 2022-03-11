import { JsonWebTokenAdapter } from '../../../external/libs/jwt/json-web-token-adapter';
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware';
import Envs from '../../../shared/envs';

export const makeAuthMiddleware = (): AuthMiddleware => {
  const jwtAdapter = new JsonWebTokenAdapter(Envs.JWT_SECRET);
  return new AuthMiddleware(jwtAdapter);
};

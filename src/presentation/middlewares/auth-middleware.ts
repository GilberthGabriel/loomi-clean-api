import { JWTAdapter } from '../../usecases/ports';
import { HttpRequest, HttpResponse } from '../controllers/ports';
import { forbidden, ok, unauthorized } from '../utils';
import { Middleware } from './ports';

export class AuthMiddleware implements Middleware {
  constructor(private readonly jwtAdapter: JWTAdapter) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const tokenArray = httpRequest.headers?.authorization?.split(' ');
    if (!tokenArray) {
      return unauthorized({ message: 'Jwt token is required' });
    }

    const result = await this.jwtAdapter.verify(tokenArray[1]);
    if (!result.isValid) {
      return forbidden({ message: 'Invalid token' });
    }

    return ok({});
  }
}

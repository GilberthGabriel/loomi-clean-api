import { LoginProps, LoginUserResponse } from '../../entities';
import { EntityNotFoundError, LoginFailureError } from '../../entities/errors';
import {
  JWTAdapter, PasswordAdapter, UseCase, UserRepository,
} from '../ports';

export class LoginUser implements UseCase {
  constructor(
    private readonly repo: UserRepository,
    private readonly passwordAdapter: PasswordAdapter,
    private readonly jwtAdapter: JWTAdapter,
  ) { }

  async perform(data: LoginProps):
    Promise<
      LoginUserResponse
      | EntityNotFoundError
      | LoginFailureError
    > {
    const dbResponse = await this.repo.get({ email: data.email });

    if (dbResponse instanceof EntityNotFoundError) {
      return dbResponse;
    }

    const success = await this.passwordAdapter.compare(data.password, dbResponse.password);
    if (!success) {
      return new LoginFailureError();
    }

    const jwt = this.jwtAdapter.sign({
      expiresIn: '60s',
      data: { userId: dbResponse.id },
    });

    return {
      jwt,
      user: {
        id: dbResponse.id,
        email: dbResponse.email,
      },
    };
  }
}

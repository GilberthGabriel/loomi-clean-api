import { LoginUserProps, LoginUserResponse } from '../../entities';
import { EntityNotFoundError, LoginFailureError } from '../../entities/errors';
import { PasswordAdapter, UseCase, UserRepository } from '../ports';

export class LoginUser implements UseCase {
  constructor(
    private readonly repo: UserRepository,
    private readonly passwordAdapter: PasswordAdapter,
  ) { }

  async perform(data: LoginUserProps):
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

    return {
      jwt: '',
      user: {
        id: dbResponse.id,
        email: dbResponse.email,
      },
    };
  }
}

import { LoginProps, LoginCustomerResponse } from '../../entities';
import { EntityNotFoundError, LoginFailureError } from '../../entities/errors';
import {
  PasswordAdapter, UseCase, CustomerRepository, JWTAdapter,
} from '../ports';

export class LoginCustomer implements UseCase {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly passwordAdapter: PasswordAdapter,
    private readonly jwtAdapter: JWTAdapter,
  ) { }

  async perform(data: LoginProps):
    Promise<
      LoginCustomerResponse
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
      expiresIn: '1d',
      data: {
        userId: dbResponse.id,
        role: dbResponse.role,
      },
    });

    return {
      jwt,
      customer: {
        id: dbResponse.id,
        email: dbResponse.email,
        name: dbResponse.name,
        address: dbResponse.address,
        phone: dbResponse.phone,
      },
    };
  }
}

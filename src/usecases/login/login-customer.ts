import { LoginProps, LoginCustomerResponse } from '../../entities';
import { EntityNotFoundError, LoginFailureError } from '../../entities/errors';
import { PasswordAdapter, UseCase, CustomerRepository } from '../ports';

export class LoginCustomer implements UseCase {
  constructor(
    private readonly repo: CustomerRepository,
    private readonly passwordAdapter: PasswordAdapter,
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

    return {
      jwt: '',
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

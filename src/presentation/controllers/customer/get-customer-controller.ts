import { GetCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class GetCustomerController implements Controller {
  constructor(private readonly useCase: GetCustomer) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const users = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
      phone: request.query.phone,
    });

    return ok(users);
  }
}

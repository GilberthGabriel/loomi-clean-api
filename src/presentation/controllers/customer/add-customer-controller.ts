import { AddCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { created } from '../utils';

export class AddCustomerController implements Controller {
  constructor(private readonly useCase: AddCustomer) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;
    const user = await this.useCase.perform({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
    });

    return created(user);
  }
}

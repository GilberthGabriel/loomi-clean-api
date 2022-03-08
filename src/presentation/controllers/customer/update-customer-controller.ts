import { UpdateCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class UpdateCustomerController implements Controller {
  constructor(private readonly useCase: UpdateCustomer) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { params, body } = request;
    const user = await this.useCase.perform({
      id: params.id,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
    });

    return ok(user);
  }
}

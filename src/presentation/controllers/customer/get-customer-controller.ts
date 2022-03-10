import { GetCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class GetCustomerController implements Controller {
  constructor(
    private readonly useCase: GetCustomer,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const users = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
      phone: request.query.phone,
    });

    return ok(users);
  }
}

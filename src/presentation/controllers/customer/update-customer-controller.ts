import { UpdateCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class UpdateCustomerController implements Controller {
  constructor(
    private readonly useCase: UpdateCustomer,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { params, body } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

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

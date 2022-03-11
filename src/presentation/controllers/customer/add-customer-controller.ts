import { ApplicationError, EntityDuplicatedError } from '../../../entities/errors';
import { AddCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, conflict, created } from '../../utils';

export class AddCustomerController implements Controller {
  constructor(
    private readonly useCase: AddCustomer,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
    });

    if (response instanceof ApplicationError) {
      if (response instanceof EntityDuplicatedError) {
        return conflict({
          code: response.code,
          message: response.message,
          key: response.key,
        });
      }
    }

    return created(response);
  }
}

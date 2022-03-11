import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { GetCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

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

    const response = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
      phone: request.query.phone,
    });

    if (response instanceof ApplicationError) {
      if (response instanceof EntityNotFoundError) {
        return notFound({
          code: response.code,
          message: response.message,
        });
      }
    }

    return ok(response);
  }
}

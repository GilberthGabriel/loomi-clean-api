import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { UpdateCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

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

    const response = await this.useCase.perform({
      id: params.id,
      email: body.email,
      password: body.password,
      phone: body.phone,
      address: body.address,
    });

    if (response instanceof ApplicationError && response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok(response);
  }
}

import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { GetOrder } from '../../../usecases/order';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

export class GetOrderController implements Controller {
  constructor(
    private readonly useCase: GetOrder,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      id: request.query.id,
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

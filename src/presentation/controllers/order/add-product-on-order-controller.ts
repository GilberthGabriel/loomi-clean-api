import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { AddProductOnOrder } from '../../../usecases/order';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../utils';

export class AddProductOnOrderController implements Controller {
  constructor(
    private readonly useCase: AddProductOnOrder,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      id: params.id,
      products: body.products,
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

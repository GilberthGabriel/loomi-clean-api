import { GetOrder } from '../../../usecases/order';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

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

    const product = await this.useCase.perform({
      id: request.query.id,
    });

    return ok(product);
  }
}

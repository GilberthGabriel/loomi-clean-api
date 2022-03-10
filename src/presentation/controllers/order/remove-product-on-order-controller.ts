import { RemoveProductOnOrder } from '../../../usecases/order';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class RemoveProductOnOrderController implements Controller {
  constructor(
    private readonly useCase: RemoveProductOnOrder,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const product = await this.useCase.perform({
      id: params.id,
      products: body.products,
    });

    return ok(product);
  }
}

import { GetProduct } from '../../../usecases/Product';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class GetProductController implements Controller {
  constructor(
    private readonly useCase: GetProduct,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const product = await this.useCase.perform({
      id: request.query.id,
      code: request.query.code,
    });

    return ok(product);
  }
}

import { GetProduct } from '../../../usecases/Product';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class GetProductController implements Controller {
  constructor(private readonly useCase: GetProduct) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const product = await this.useCase.perform({
      id: request.query.id,
      code: request.query.code,
    });

    return ok(product);
  }
}

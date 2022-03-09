import { GetOrder } from '../../../usecases/order';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class GetOrderController implements Controller {
  constructor(private readonly useCase: GetOrder) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const product = await this.useCase.perform({
      id: request.query.id,
    });

    return ok(product);
  }
}

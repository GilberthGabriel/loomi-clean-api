import { RemoveProductOnOrder } from '../../../usecases/order';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class RemoveProductOnOrderController implements Controller {
  constructor(private readonly useCase: RemoveProductOnOrder) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params } = request;
    const product = await this.useCase.perform({
      id: params.id,
      products: body.products,
    });

    return ok(product);
  }
}

import { DeleteOrder } from '../../../usecases/order';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class DeleteOrderController implements Controller {
  constructor(private readonly useCase: DeleteOrder) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const okRes = await this.useCase.perform(request.params.id);
    return ok({ ok: okRes });
  }
}

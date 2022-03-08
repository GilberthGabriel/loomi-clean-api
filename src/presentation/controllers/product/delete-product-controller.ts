import { DeleteProduct } from '../../../usecases/Product';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class DeleteProductController implements Controller {
  constructor(private readonly useCase: DeleteProduct) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const okRes = await this.useCase.perform(request.params.id);
    return ok({ ok: okRes });
  }
}

import { DeleteCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class DeleteCustomerController implements Controller {
  constructor(private readonly useCase: DeleteCustomer) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const okRes = await this.useCase.perform(request.params.id);
    return ok({ ok: okRes });
  }
}

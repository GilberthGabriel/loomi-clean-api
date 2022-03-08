import { ListCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class ListCustomerController implements Controller {
  constructor(private readonly useCase: ListCustomer) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;
    const users = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
    });

    return ok(users);
  }
}

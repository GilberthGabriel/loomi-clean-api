import { ListUser } from '../../../usecases/user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class ListUserController implements Controller {
  constructor(private readonly useCase: ListUser) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;
    const users = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
    });

    return ok(users);
  }
}

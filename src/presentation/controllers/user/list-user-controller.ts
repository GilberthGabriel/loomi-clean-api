import { ListUser } from '../../../usecases/user';
import { Controller, HttpResponse } from '../ports';
import { ok } from '../utils';

export class ListUserController implements Controller {
  constructor(private readonly useCase: ListUser) {}

  async handle(): Promise<HttpResponse> {
    const users = await this.useCase.perform();
    return ok(users);
  }
}

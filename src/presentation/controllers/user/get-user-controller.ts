import { GetUser } from '../../../usecases/user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class GetUserController implements Controller {
  constructor(private readonly useCase: GetUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const users = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
    });
    return ok(users);
  }
}

import { UpdateUser } from '../../../usecases/user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class UpdateUserController implements Controller {
  constructor(private readonly useCase: UpdateUser) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const user = await this.useCase.perform({
      id: request.params.id,
      email: request.body.email,
      password: request.body.password,
    });

    return ok(user);
  }
}

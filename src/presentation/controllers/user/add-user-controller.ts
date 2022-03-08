import { AddUser } from '../../../usecases/user/add-user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { created } from '../utils';

export class AddUserController implements Controller {
  constructor(private readonly useCase: AddUser) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const user = await this.useCase.perform({
      email: request.body.email,
      password: request.body.password,
    });

    return created(user);
  }
}

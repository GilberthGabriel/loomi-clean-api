import { AddUser } from '../../../usecases/user/add-user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, created } from '../utils';

export class AddUserController implements Controller {
  constructor(
    private readonly useCase: AddUser,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const user = await this.useCase.perform({
      email: request.body.email,
      password: request.body.password,
    });

    return created(user);
  }
}

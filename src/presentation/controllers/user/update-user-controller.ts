import { UpdateUser } from '../../../usecases/user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class UpdateUserController implements Controller {
  constructor(
    private readonly useCase: UpdateUser,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const user = await this.useCase.perform({
      id: request.params.id,
      email: request.body.email,
      password: request.body.password,
    });

    return ok(user);
  }
}

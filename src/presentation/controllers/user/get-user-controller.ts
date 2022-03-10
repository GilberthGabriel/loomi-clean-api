import { GetUser } from '../../../usecases/user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../utils';

export class GetUserController implements Controller {
  constructor(
    private readonly useCase: GetUser,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const users = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
    });
    return ok(users);
  }
}

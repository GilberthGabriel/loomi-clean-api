import { EntityNotFoundError, LoginFailureError } from '../../../entities';
import { LoginUser } from '../../../usecases/login';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import {
  badRequest, notFound, forbidden, ok,
} from '../utils';

export class LoginUserController implements Controller {
  constructor(
    private readonly useCase: LoginUser,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      email: body.email,
      password: body.password,
    });

    if (response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    if (response instanceof LoginFailureError) {
      return forbidden({
        code: response.code,
        message: response.message,
      });
    }

    return ok(response);
  }
}

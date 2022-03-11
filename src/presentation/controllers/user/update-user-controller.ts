import { EntityNotFoundError } from '../../../entities/errors';
import { UpdateUser } from '../../../usecases/user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

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

    const response = await this.useCase.perform({
      id: request.params.id,
      email: request.body.email,
      password: request.body.password,
    });

    if (response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok(response);
  }
}

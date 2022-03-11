import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { GetUser } from '../../../usecases/user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

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

    const response = await this.useCase.perform({
      id: request.query.id,
      email: request.query.email,
    });

    if (response instanceof ApplicationError) {
      if (response instanceof EntityNotFoundError) {
        return notFound({
          code: response.code,
          message: response.message,
        });
      }
    }

    return ok(response);
  }
}

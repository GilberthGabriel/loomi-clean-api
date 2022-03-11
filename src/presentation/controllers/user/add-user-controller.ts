import { ApplicationError, EntityDuplicatedError } from '../../../entities/errors';
import { AddUser } from '../../../usecases/user/add-user';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, conflict, created } from '../../utils';

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

    const response = await this.useCase.perform({
      email: request.body.email,
      password: request.body.password,
    });

    if (response instanceof ApplicationError) {
      if (response instanceof EntityDuplicatedError) {
        return conflict({
          code: response.code,
          message: response.message,
          key: response.key,
        });
      }
    }

    return created(response);
  }
}

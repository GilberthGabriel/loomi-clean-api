import { EntityNotFoundError } from '../../../entities/errors';
import { DeleteUser } from '../../../usecases/user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { notFound, ok } from '../../utils';

export class DeleteUserController implements Controller {
  constructor(private readonly useCase: DeleteUser) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.perform(request.params.id);
    if (response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok({ ok: response });
  }
}

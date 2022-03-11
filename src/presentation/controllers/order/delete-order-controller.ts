import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { DeleteOrder } from '../../../usecases/order';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { notFound, ok } from '../../utils';

export class DeleteOrderController implements Controller {
  constructor(private readonly useCase: DeleteOrder) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.perform(request.params.id);

    if (response instanceof ApplicationError && response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok({ ok: response });
  }
}

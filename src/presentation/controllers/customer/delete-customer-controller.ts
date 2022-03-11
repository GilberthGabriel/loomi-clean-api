import { ApplicationError, EntityNotFoundError } from '../../../entities/errors';
import { DeleteCustomer } from '../../../usecases/customer';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { notFound, ok } from '../../utils';

export class DeleteCustomerController implements Controller {
  constructor(private readonly useCase: DeleteCustomer) { }

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

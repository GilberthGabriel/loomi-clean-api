import { EntityNotFoundError } from '../../../entities/errors';
import { DeleteProduct } from '../../../usecases/Product';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { notFound, ok } from '../utils';

export class DeleteProductController implements Controller {
  constructor(private readonly useCase: DeleteProduct) { }

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

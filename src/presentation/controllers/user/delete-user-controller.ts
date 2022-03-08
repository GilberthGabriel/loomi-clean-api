import { DeleteUser } from '../../../usecases/user';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class DelteUserController implements Controller {
  constructor(private readonly useCase: DeleteUser) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const okRes = await this.useCase.perform(request.params.id);
    return ok({ ok: okRes });
  }
}

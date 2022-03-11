import { ListCustomer } from '../../../usecases/customer';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, ok } from '../../utils';

export class ListCustomerController implements Controller {
  constructor(
    private readonly useCase: ListCustomer,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const users = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
    });

    return ok(users);
  }
}

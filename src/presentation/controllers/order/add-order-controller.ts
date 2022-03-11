import { AddOrder } from '../../../usecases/Order/add-Order';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, created } from '../../utils';

export class AddOrderController implements Controller {
  constructor(
    private readonly useCase: AddOrder,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const Order = await this.useCase.perform({
      customerId: body.customerId,
      productIds: body.productIds,
    });

    return created(Order);
  }
}

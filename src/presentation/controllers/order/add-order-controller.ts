import { AddOrder } from '../../../usecases/Order/add-Order';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { created } from '../utils';

export class AddOrderController implements Controller {
  constructor(private readonly useCase: AddOrder) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;
    const Order = await this.useCase.perform({
      customerId: body.customerId,
      productIds: body.productIds,
    });

    return created(Order);
  }
}

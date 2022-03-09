import { ListOrder } from '../../../usecases/order';
import {
  Controller, HttpRequest, HttpResponse, QueryConverter,
} from '../ports';
import { ok } from '../utils';

export class ListOrderController implements Controller {
  constructor(
    private readonly useCase: ListOrder,
    private readonly queryConverter: QueryConverter,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;
    const dateFilter = this.queryConverter.parse(query.date);
    const products = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
      customerId: query.customerId,
      date: {
        eq: dateFilter.eq && new Date(dateFilter.eq),
        gt: dateFilter.gt && new Date(dateFilter.gt),
        gte: dateFilter.gte && new Date(dateFilter.gte),
        lt: dateFilter.lt && new Date(dateFilter.lt),
        lte: dateFilter.lte && new Date(dateFilter.lte),
      },
    });

    return ok(products);
  }
}

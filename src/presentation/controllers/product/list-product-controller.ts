import { ListProduct } from '../../../usecases/Product';
import {
  Controller, HttpRequest, HttpResponse, QueryConverter,
} from '../ports';
import { ok } from '../utils';

export class ListProductController implements Controller {
  constructor(
    private readonly useCase: ListProduct,
    private readonly queryConverter: QueryConverter,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;
    const priceFilter = this.queryConverter.parse(query.price);
    const dateFilter = this.queryConverter.parse(query.date);
    const products = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
      price: {
        eq: priceFilter.eq,
        gt: priceFilter.gt,
        gte: priceFilter.gte,
        lt: priceFilter.lt,
        lte: priceFilter.lte,
      },
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

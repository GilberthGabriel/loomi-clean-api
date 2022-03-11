import { ListProduct } from '../../../usecases/Product';
import {
  Controller, HttpRequest, HttpResponse, QueryConverter, Validator,
} from '../ports';
import { badRequest, ok } from '../../utils';

export class ListProductController implements Controller {
  constructor(
    private readonly useCase: ListProduct,
    private readonly queryConverter: QueryConverter,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { query } = request;

    const priceFilter = this.queryConverter.parse(query.price);
    const dateFilter = this.queryConverter.parse(query.date);
    const formatedQuery = {
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
    };

    const validatorResult = this.validator.validate({
      ...request,
      query: {
        ...query,
        price: formatedQuery.price,
        date: formatedQuery.date,
      },
    });

    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const products = await this.useCase.perform({
      skip: query.skip && Number(query.skip),
      limit: query.limit && Number(query.limit),
      date: formatedQuery.date,
      price: formatedQuery.price,
    });

    return ok(products);
  }
}

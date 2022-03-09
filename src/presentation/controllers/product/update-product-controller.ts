import { UpdateProduct } from '../../../usecases/Product';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { ok } from '../utils';

export class UpdateProductController implements Controller {
  constructor(private readonly useCase: UpdateProduct) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params } = request;
    const product = await this.useCase.perform({
      id: params.id,
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
    });

    return ok(product);
  }
}

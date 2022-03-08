import { AddProduct } from '../../../usecases/Product/add-Product';
import { Controller, HttpRequest, HttpResponse } from '../ports';
import { created } from '../utils';

export class AddProductController implements Controller {
  constructor(private readonly useCase: AddProduct) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;
    const product = await this.useCase.perform({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
    });

    return created(product);
  }
}

import { AddProduct } from '../../../usecases/Product/add-Product';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, created } from '../utils';

export class AddProductController implements Controller {
  constructor(
    private readonly useCase: AddProduct,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const product = await this.useCase.perform({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      code: body.code,
    });

    return created(product);
  }
}

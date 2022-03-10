import { ApplicationError, EntityDuplicatedError } from '../../../entities/errors';
import { AddProduct } from '../../../usecases/Product/add-Product';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, conflict, created } from '../utils';

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

    const response = await this.useCase.perform({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      code: body.code,
    });

    if (response instanceof ApplicationError) {
      if (response instanceof EntityDuplicatedError) {
        return conflict({
          code: response.code,
          message: response.message,
          key: response.key,
        });
      }
    }

    return created(response);
  }
}

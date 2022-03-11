import { EntityNotFoundError } from '../../../entities/errors';
import { UpdateProduct } from '../../../usecases/Product';
import {
  Controller, HttpRequest, HttpResponse, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';

export class UpdateProductController implements Controller {
  constructor(
    private readonly useCase: UpdateProduct,
    private readonly validator: Validator,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      id: params.id,
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      code: body.code,
    });

    if (response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok(response);
  }
}

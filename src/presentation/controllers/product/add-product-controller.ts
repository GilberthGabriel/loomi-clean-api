import { ApplicationError, EntityDuplicatedError } from '../../../entities/errors';
import { AddProduct } from '../../../usecases/Product/add-Product';
import {
  Controller, HttpRequest, HttpResponse, MimeHelper, Validator,
} from '../ports';
import { badRequest, conflict, created } from '../../utils';

export class AddProductController implements Controller {
  constructor(
    private readonly useCase: AddProduct,
    private readonly validator: Validator,
    private readonly mimeAdapter: MimeHelper
    ,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, files } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const response = await this.useCase.perform({
      name: body.name,
      price: body.price,
      description: body.description,
      code: body.code,
      image: files && files.image && {
        ext: this.mimeAdapter.getExtension(files.image.mimetype),
        data: Buffer.from(files.image.data, 'base64'),
      },
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

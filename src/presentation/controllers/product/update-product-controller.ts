import { EntityNotFoundError } from '../../../entities/errors';
import { UpdateProduct } from '../../../usecases/Product';
import {
  Controller, HttpRequest, HttpResponse, MimeHelper, Validator,
} from '../ports';
import { badRequest, notFound, ok } from '../../utils';
import { UpdateProductProps } from '../../../entities';

export class UpdateProductController implements Controller {
  constructor(
    private readonly useCase: UpdateProduct,
    private readonly validator: Validator,
    private readonly mimeAdapter: MimeHelper,
  ) { }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { body, params, files } = request;

    const validatorResult = this.validator.validate(request);
    if (!validatorResult.isValid) {
      return badRequest({ errors: validatorResult.errors });
    }

    const updateProductParams: UpdateProductProps = {
      id: params.id,
      name: body.name,
      price: body.price,
      description: body.description,
      code: body.code,
    };

    if (files && files.image) {
      updateProductParams.image = {
        ext: this.mimeAdapter.getExtension(files.image.mimetype),
        data: Buffer.from(files.image.data, 'base64'),
      };
    }

    const response = await this.useCase.perform(updateProductParams);

    if (response instanceof EntityNotFoundError) {
      return notFound({
        code: response.code,
        message: response.message,
      });
    }

    return ok(response);
  }
}

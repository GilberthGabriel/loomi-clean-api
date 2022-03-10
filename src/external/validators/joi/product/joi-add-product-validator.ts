import Joi from 'joi';
import { HttpRequest, Validator, ValidatorResult } from '../../../../presentation/controllers/ports';

export class JoiAddProductValidator implements Validator {
  private readonly scheme;

  constructor() {
    this.scheme = Joi.object({
      body: Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().greater(0).required(),
        code: Joi.string().min(1).required(),
        description: Joi.string(),
      }),
    });
  }

  validate(request: HttpRequest): ValidatorResult {
    const response: ValidatorResult = {
      isValid: true,
      errors: [],
    };

    const result = this.scheme.validate(request, { allowUnknown: true });
    if (result.error) {
      response.isValid = false;
      response.errors = result.error?.details.map((detail) => detail.message);
    }

    return response;
  }
}

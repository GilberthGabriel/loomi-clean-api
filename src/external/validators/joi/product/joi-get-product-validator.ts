import Joi from 'joi';
import { HttpRequest, Validator, ValidatorResult } from '../../../../presentation/controllers/ports';

export class JoiGetProductValidator implements Validator {
  private readonly scheme;

  constructor() {
    this.scheme = Joi.object({
      query: Joi.object({
        id: Joi.string(),
        code: Joi.string(),
      }).min(1),
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
